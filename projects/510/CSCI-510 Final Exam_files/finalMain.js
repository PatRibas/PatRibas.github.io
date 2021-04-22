  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;

  // GLSL programs
  let glass, bump, proc, wire;

  // VAOs for the objects
  var bmp_sphere = null;
  var glass_sphere = null;
  var floor = null;
  
  // textures

  // rotation
 
//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {
	bmp_sphere = new Sphere(30, 30);
	bmp_sphere.VAO = bindVAO(bmp_sphere, bump);
	glass_sphere = new Sphere(30,30);
	glass_sphere.VAO = bindVAO(glass_sphere, glass);
	floor = new Cube(30);
	floor.VAO = bindVAO(floor, proc);
}



//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera(program) {
	    
	gl.useProgram (program);
	   
	// projection 
	let projMatrix = glMatrix.mat4.create();
	glMatrix.mat4.perspective(projMatrix, Math.PI / 4, 1, 1.0, 100.0)
	gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    
	// view
	let viewMatrix = glMatrix.mat4.create();
	glMatrix.mat4.lookAt(viewMatrix, [0, 0.25, 2], [0, 0, 0], [0, 1, 0]);
	gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
}



function setUpPhong(prog, color){
	var aLight = gl.getUniformLocation(prog, 'ambientLight');
        gl.uniform3fv(aLight, [0.5, 0.55, 0.45]);
        var lPos = gl.getUniformLocation(prog, 'lightPosition');
	gl.uniform3fv(lPos, [-1.0, 2.0, 1.0]);
        var lColor = gl.getUniformLocation(prog, 'lightColor');
        gl.uniform3fv(lColor, [1.0, 1.0, 1.0]);
        var oColor = gl.getUniformLocation(prog, 'baseColor');
        gl.uniform3fv(oColor, color);
        var specColor = gl.getUniformLocation(prog, 'specHighlightColor');
        gl.uniform3fv(specColor, [1.0, 1.0, 1.0]);
        var ka = gl.getUniformLocation(prog, 'ka');
        gl.uniform1fv(ka, [0.5]);
        var kd = gl.getUniformLocation(prog, 'kd');
        gl.uniform1fv(kd, [1.0]);
        var ks = gl.getUniformLocation(prog, 'ks');
        gl.uniform1fv(ks, [0.25]);
        var ke = gl.getUniformLocation(prog, 'ke');
        gl.uniform1fv(ke, [0.75]);

}

function drawBumpSphere() {
        // bump map sphere
        setUpCamera(bump);
        setUpPhong(bump, [1.0, 1.0, 0.0]);
        let modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate( modelMatrix, modelMatrix, [0.7, -0.2, -1.0, 0]);
        glMatrix.mat4.rotateY(modelMatrix, modelMatrix, 3.14159);
        gl.uniformMatrix4fv (bump.uModelT, false, modelMatrix);
        gl.bindVertexArray(bmp_sphere.VAO, wire);
        var lPos = gl.getUniformLocation(bump, 'lightPosition2');
        gl.uniform3fv(lPos, [-1.5, -0.5, 0.3]);
        var lColor = gl.getUniformLocation(bump, 'lightColor2');
        gl.uniform3fv(lColor, [1.0, 1.0, 1.0]);
        var specColor = gl.getUniformLocation(bump, 'specHighlightColor2');
        gl.uniform3fv(specColor, [1.0, 1.0, 1.1]);
        gl.drawElements(gl.TRIANGLES, bmp_sphere.indices.length, gl.UNSIGNED_SHORT, 0);
}

function drawProcFloor() {
        // floor
        setUpCamera(proc);
        setUpPhong(proc, [0.0, 0.0, 0.0]);
        var lPos = gl.getUniformLocation(proc, 'lightPosition');
        gl.uniform3fv(lPos, [1.7, -0.4, -1.0]);
        var ks = gl.getUniformLocation(proc, 'ks');
        gl.uniform1fv(ks, [0.45]);
        let modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate( modelMatrix, modelMatrix, [4.0, -1.0, -5.15, 0]);
        glMatrix.mat4.scale( modelMatrix, modelMatrix, [10.0, 0.05, 10.0 ,1]);
        gl.uniformMatrix4fv (proc.uModelT, false, modelMatrix);
        gl.bindVertexArray(floor.VAO, wire);
        gl.drawElements(gl.TRIANGLES, floor.indices.length, gl.UNSIGNED_SHORT, 0);

}


function drawGlassSphere(){
	// glass sphere
       
	//texture
	var tex = gl.getUniformLocation(glass, 'tex');
	var x = 3;
/////// Here begins code from WebGL fundamentals
	const targetTextureWidth = 256 * x;
	const targetTextureHeight = 256 * x;
	const targetTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, targetTexture);


	// define size and format of level 0
	const level = 0;
	const internalFormat = gl.RGBA;
	const border = 0;
	const format = gl.RGBA;
	const type = gl.UNSIGNED_BYTE;
	const data = null;
	gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                targetTextureWidth, targetTextureHeight, border,
                format, type, data);

	// set the filtering so we don't need mips
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	// Create and bind the framebuffer
	const fb = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
     
	// attach the texture as the first color attachment
	const attachmentPoint = gl.COLOR_ATTACHMENT0;
	gl.framebufferTexture2D(
        gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level);
/////// Here ends code from WebGL fundamentals

	gl.clearColor( 0.2 , 0.6 , 0.8 , 1 );
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);	
	drawProcFloor();
	drawBumpSphere();
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);

	// camera + shading
	setUpCamera(glass);
        setUpPhong(glass, [0.2 , 0.6 , 0.8]);
        var ks = gl.getUniformLocation(proc, 'ks');
        gl.uniform1fv(ks, [0.0]);
 
	// model transforms
        let modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate( modelMatrix, modelMatrix, [0.0, 0.2, 0.0, 0.0] );
        glMatrix.mat4.rotateY(modelMatrix, modelMatrix, 3.14159 + 0.5);
	glMatrix.mat4.rotateZ(modelMatrix, modelMatrix, 0);
	glMatrix.mat4.rotateX(modelMatrix, modelMatrix, 0.1);
	gl.uniformMatrix4fv(glass.uModelT, false, modelMatrix);
        gl.bindVertexArray(glass_sphere.VAO, wire);
        gl.drawElements(gl.TRIANGLES, glass_sphere.indices.length, gl.UNSIGNED_SHORT, 0);
}

//
//  This function draws all of the shapes required for your scene
//
function drawShapes() {
	drawBumpSphere();
	drawProcFloor();
	drawGlassSphere();		
}


//
// Use this function to create all the programs that you need
// You can make use of the auxillary function initProgram
// which takes the name of a vertex shader and fragment shader
//
// Note that after successfully obtaining a program using the initProgram
// function, you will beed to assign locations of attribute and unifirm variable
// based on the in variables to the shaders.   This will vary from program
// to program.
//
function initPrograms() {
	//wire = initProgram("wireframe-V", "wireframe-F");
  	glass = initProgram("glass-V", "glass-F");
	bump = initProgram("bump-V", "bump-F");
	proc = initProgram("proc-V", "proc-F");
}


// creates a VAO and returns its ID
function bindVAO (shape, program) {
	//create and bind VAO
	let theVAO = gl.createVertexArray();
        gl.bindVertexArray(theVAO);
      
        // create and bind vertex buffer
        let myVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(program.aVertexPosition);
        gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      
        // add code for any additional vertex attribute

        // create and bind bary buffer
        let myBaryBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.bary), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(program.aBary);
        gl.vertexAttribPointer(program.aBary, 3, gl.FLOAT, false, 0, 0);
	// create, bind, and fill buffer for vertex locations
	// vertex locations can be obtained from the points member of the
	// shape object.  3 floating point values (x,y,z) per vertex are
	// stored in this array.
	var x,y,z;
	var pbuf = new Float32Array(shape.points.length);
	for ( var i = 0; i < shape.points.length; i += 3 ) {
		x = shape.points[i];
		y = shape.points[i + 1];
		z = shape.points[i + 2];
		pbuf[i] = x;
		pbuf[i + 1] = y;
		pbuf[i + 2] = z;
  	}
	var buf_id = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buf_id);
	gl.bufferData(gl.ARRAY_BUFFER, pbuf, gl.STATIC_DRAW);
	var aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
	gl.enableVertexAttribArray(aVertexPosition);
	gl.vertexAttribPointer( aVertexPosition, 3, gl.FLOAT, false, 0, 0 );
	
	
	// create, bind, and fill buffer for normal values
	// normals can be obtained from the normals member of the
	// shape object.  3 floating point values (x,y,z) per vertex are
	// stored in this array.
	var nbuf = new Float32Array(shape.normals.length);
	for ( var i = 0; i < shape.normals.length; i += 3 ) {
		x = shape.normals[i];
		y = shape.normals[i + 1];
		z = shape.normals[i + 2];
		nbuf[i] = x;
		nbuf[i + 1] = y;
		nbuf[i + 2] = z;
	}
	var buf_id = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buf_id);
	gl.bufferData(gl.ARRAY_BUFFER, nbuf, gl.STATIC_DRAW);
	var aNormal = gl.getAttribLocation(program, 'aNormal');
	gl.enableVertexAttribArray(aNormal);
	gl.vertexAttribPointer( aNormal, 3, gl.FLOAT, false, 0, 0 );
	
	let uvBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(program.aUV);
	gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);
	
	// Setting up element array
	// element indicies can be obtained from the indicies member of the
	// shape object.  3 values per triangle are stored in this
	// array.
	var ebuf = new Uint16Array(shape.indices.length);
	for ( var i = 0; i < shape.indices.length; i += 3 ) {
		x = shape.indices[i];
		y = shape.indices[i + 1];
		z = shape.indices[i + 2];
		ebuf[i] = x;
		ebuf[i + 1] = y;
		ebuf[i + 2] = z;
	}
	var buf_id = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buf_id);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ebuf, gl.STATIC_DRAW);
	// Setting up the IBO
	let myIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

	// Clean
	gl.bindVertexArray(null);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
	return theVAO;
}


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
  const script = document.getElementById(id);
  const shaderString = script.text.trim();

  // Assign shader depending on the type of shader
  let shader;
  if (script.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else if (script.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else {
    return null;
  }

  // Compile the shader using the supplied shader code
  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  // Ensure the shader is valid
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	  console.log("bad shader!");
	  console.log(id);
	  console.log(shader);
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);
    // Create a program
    let program = gl.createProgram();
      
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aBary = gl.getAttribLocation(program, 'bary');
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
    program.aUV = gl.getAttribLocation(program, 'aUV');
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      return null;
    }
      
    return program;
  }


  //
  // We call draw to render to our canvas
  //
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);
      
    // Set the clear color to be black
    gl.clearColor( 0.2 , 0.6 , 0.8 , 1 );
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor( 0.2 , 0.6 , 0.8 , 1 );
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    // Read, compile, and link your shaders
    initPrograms();
    
    // create and bind your current object
    createShapes();
    
    // do a draw
    draw();
  }

