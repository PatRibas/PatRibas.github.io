//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {
    
    // fill in your code here.
    // delete the code below first.
    var step = 1 / subdivisions;
    
    // z faces
    var z = 0.5;
    var x0 = -0.5;
    var y0 = -0.5;
    for ( var s = 0; s < subdivisions; s++ ) {
        x0 = -0.5;
        for ( var S = 0; S < subdivisions; S++ )
        {
            var x1 = x0 + step;
            var y1 = y0 + step; 
            addTriangle( x1, y0, z, x0, y0, z, x1, y1, z  );
            addTriangle( x0, y0, z, x0, y1, z, x1, y1, z  );
            x0 += step;
        }
        y0 += step;
    }
    z = -0.5;
    x0 = -0.5;
    y0 = -0.5;
    for ( var s = 0; s < subdivisions; s++ ) {
        x0 = -0.5;
        for ( var S = 0; S < subdivisions; S++ )
        {
            var x1 = x0 + step;
            var y1 = y0 + step; 
            addTriangle( x1, y1, z, x0, y0, z, x1, y0, z );
            addTriangle(  x1, y1, z, x0, y1, z, x0, y0, z  );
            x0 += step;
        }
        y0 += step;
    }

    // x faces
    var x = -0.5;
    var z0 = -0.5;
    y0 = -0.5;
    for ( var s = 0; s < subdivisions; s++ ) {
        y0 = -0.5;
        for ( var S = 0; S < subdivisions; S++ )
        {
            var z1 = z0 + step;
            var y1 = y0 + step; 
            addTriangle( x, y0, z1, x, y0, z0,x, y1, z1  );
            addTriangle( x, y0, z0, x, y1, z0,x, y1, z1  );
            
            y0 += step;
        }
        z0 += step;
    }

    var x = 0.5;
    var z0 = -0.5;
    y0 = -0.5;
    for ( var s = 0; s < subdivisions; s++ ) {
        y0 = -0.5;
        for ( var S = 0; S < subdivisions; S++ )
        {
            var z1 = z0 + step;
            var y1 = y0 + step; 
            addTriangle( x, y1, z1, x, y0, z0, x, y0, z1 );
            addTriangle( x, y1, z1, x, y1, z0, x, y0, z0 );
            y0 += step;
        }
        z0 += step;
    }
    // y faces
    var y = -0.5;
    z0 = -0.5;
    x0 = -0.5;
    for ( var s = 0; s < subdivisions; s++ ) {
        x0 = -0.5;
        for ( var S = 0; S < subdivisions; S++ )
        {
            var x1 = x0 + step;
            var z1 = z0 + step; 
            addTriangle( x1, y, z1, x0, y, z0, x0, y, z1  );
            addTriangle( x1, y, z1, x1, y, z0, x0, y, z0  );
            x0 += step;
        }
        z0 += step;
    }

    var y = 0.5;
    z0 = -0.5;
    x0 = -0.5;
    for ( var s = 0; s < subdivisions; s++ ) {
        x0 = -0.5;
        for ( var S = 0; S < subdivisions; S++ )
        {
            var x1 = x0 + step;
            var z1 = z0 + step; 
            addTriangle( x0, y, z1, x0, y, z0, x1, y, z1  );
            addTriangle( x0, y, z0, x1, y, z0, x1, y, z1  );
            x0 += step;
        }
        z0 += step;
    }

}




//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
    // fill in your code here.

    var step = (2 * Math.PI) / radialdivision;
    var a = 1;
    var x0 = 0;
    var z0 = 0;
    var y0 = 0.5;
    var x1 = 0.5 * Math.cos(0);
    var z1 = 0.5 * Math.sin(0);
    var y1 = 0.5;
    var x2, y2, z2;
    // for point on circle
    for ( var s = 0; s < radialdivision; s++ ) {
        // make triangle of top cap
        y1 = 0.5;
        y0 = 0.5;
        x2 = 0.5 * Math.cos(a * step);
        z2 = 0.5 * Math.sin(a * step);
        y2 = 0.5;
        addTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2 );
        
        // tesselate face
        var hstep = 1 / heightdivision;
        var p1x = x1;
        var p1y = y1;
        var p1z = z1;
        var p2x = x2;
        var p2y = y2;
        var p2z = z2;
        var p3x, p3y, p3z, p4x, p4y, p4z;
        p3x = p1x;
        p3z = p1z;
        p4x = p2x;
        p4z = p2z;
        p3y = p1y - hstep;
        p4y = p2y - hstep;
        for ( var S = 0; S < heightdivision; S++ ){
            addTriangle(p2x, p2y, p2z, p1x, p1y, p1z, p3x, p3y, p3z);
            addTriangle(p2x, p2y, p2z, p3x, p3y, p3z, p4x, p4y, p4z);
            p1y -= hstep;
            p2y -= hstep;
            p3y -= hstep;
            p4y -= hstep;
        }

        // make triangle of bottom cap
        y2 = -0.5;
        y1 = -0.5;
        y0 = -0.5;
        addTriangle(x2, y2, z2, x1, y1, z1, x0, y0, z0);
        // reset vars
        x1 = x2;
        z1 = z2;
        a += 1;
    }
    

        
}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    // fill in your code here.

    var step = (2 * Math.PI) / radialdivision;
    var a = 1;
    var x0 = 0;
    var z0 = 0;
    var y0 = 0.5;
    var x1 = 0.5 * Math.cos(0);
    var z1 = 0.5 * Math.sin(0);
    var y1 = 0.5;
    var x2, y2, z2;
    // for point on circle
    for ( var s = 0; s < radialdivision; s++ ) {
        // make triangle of bottom
        y1 = 0.5;
        y0 = 0.5;
        x2 = 0.5 * Math.cos(a * step);
        z2 = 0.5 * Math.sin(a * step);
        y2 = 0.5;
        addTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2 );
        
        // tesselate face
        var hstep = 1 / heightdivision;
        var p1x = x1;
        var p1y = y1;
        var p1z = z1;
        var p2x = x2;
        var p2y = y2;
        var p2z = z2;
        var p3x, p3y, p3z, p4x, p4y, p4z;
        p3x = p1x;
        p3z = p1z;
        p4x = p2x;
        p4z = p2z;
        p3y = p1y - hstep;
        p4y = p2y - hstep;
        // move inwards!
        p3z -= z1 / heightdivision;
        p3x -= x1 / heightdivision;
        p4z -= z2 / heightdivision;
        p4x -= x2 / heightdivision;
        for ( var S = 0; S < heightdivision; S++ ){
            addTriangle(p2x, p2y, p2z, p1x, p1y, p1z, p3x, p3y, p3z);
            addTriangle(p2x, p2y, p2z, p3x, p3y, p3z, p4x, p4y, p4z);
            p1y -= hstep;
            p2y -= hstep;
            p3y -= hstep;
            p4y -= hstep;

            p1z -= z1 / heightdivision;
            p1x -= x1 / heightdivision;
            p2z -= z2 / heightdivision;
            p2x -= x2 / heightdivision;
            p3z -= z1 / heightdivision;
            p3x -= x1 / heightdivision;
            p4z -= z2 / heightdivision;
            p4x -= x2 / heightdivision;
        }        
        // reset vars
        x1 = x2;
        z1 = z2;
        a += 1;
    }

}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
    var slice_step =  ( 2 * Math.PI ) / slices;
    var stack_step =  Math.PI / stacks ;
    var llong = 0;
    var p1x, p1y, p1z;
    var p2x, p2y, p2z;
    var p3x, p3y, p3z;
    var p4x, p4y, p4z;
    var r = 0.5;
    for ( var slice = 0; slice < slices; slice++ ){
        var rlong = llong + slice_step;
        var ulat = 0;
        for ( var stack = 0; stack < stacks; stack++ ){
            var llat = ulat - stack_step;

            p1x = r * Math.cos(llong) * Math.sin(ulat);
            p1y = r * Math.sin(llong) * Math.sin(ulat);
            p1z = r * Math.cos(ulat);

            p2x = r * Math.cos(rlong) * Math.sin(ulat);
            p2y = r * Math.sin(rlong) * Math.sin(ulat);
            p2z = r * Math.cos(ulat);

            p3x = r * Math.cos(llong) * Math.sin(llat);
            p3y = r * Math.sin(llong) * Math.sin(llat);
            p3z = r * Math.cos(llat);

            p4x = r * Math.cos(rlong) * Math.sin(llat);
            p4y = r * Math.sin(rlong) * Math.sin(llat);
            p4z = r * Math.cos(llat);
            
            addTriangle(p2x, p2y, p2z, p1x, p1y, p1z, p3x, p3y, p3z);
            addTriangle(p2x, p2y, p2z, p3x, p3y, p3z, p4x, p4y, p4z);
            ulat = llat;
        }
        llong = rlong;
    }
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}


