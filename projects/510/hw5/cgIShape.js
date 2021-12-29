class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
    
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
                super.addTriangle( x1, y1, z,  x0, y0, z, x1, y0, z   );
                super.addTriangle( x1, y1, z, x0, y1, z, x0, y0, z  );
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
                super.addTriangle( x1, y0, z, x0, y0, z,x1, y1, z  );
                super.addTriangle(  x0, y0, z, x0, y1, z, x1, y1, z  );
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
                super.addTriangle( x, y1, z1, x, y0, z0,x, y0, z1  );
                super.addTriangle( x, y1, z1, x, y1, z0,x, y0, z0  );
                
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
                super.addTriangle( x, y0, z1, x, y0, z0, x, y1, z1 );
                super.addTriangle(  x, y0, z0, x, y1, z0, x, y1, z1 );
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
                super.addTriangle( x1, y, z1, x0, y, z0,x0, y, z1   );
                super.addTriangle( x1, y, z1, x1, y, z0,x0, y, z0   );
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
                super.addTriangle( x1, y, z1, x0, y, z0,x0, y, z1   );
                super.addTriangle( x1, y, z1, x1, y, z0,x0, y, z0   );
                x0 += step;
            }
            z0 += step;
        }
    
    }
    
    
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
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
            super.addTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2 );
            
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
                super.addTriangle(p2x, p2y, p2z, p1x, p1y, p1z, p3x, p3y, p3z);
                super.addTriangle(p2x, p2y, p2z, p3x, p3y, p3z, p4x, p4y, p4z);
                p1y -= hstep;
                p2y -= hstep;
                p3y -= hstep;
                p4y -= hstep;
            }
    
            // make triangle of bottom cap
            y2 = -0.5;
            y1 = -0.5;
            y0 = -0.5;
            super.addTriangle(x2, y2, z2, x1, y1, z1, x0, y0, z0);
            // reset vars
            x1 = x2;
            z1 = z2;
            a += 1;
        }
        
    
            
    }
    
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
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
            super.addTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2 );
            
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
                super.addTriangle(p2x, p2y, p2z, p1x, p1y, p1z, p3x, p3y, p3z);
                super.addTriangle(p2x, p2y, p2z, p3x, p3y, p3z, p4x, p4y, p4z);
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
        
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
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
                
                super.addTriangle(p2x, p2y, p2z, p1x, p1y, p1z, p3x, p3y, p3z);
                super.addTriangle(p2x, p2y, p2z, p3x, p3y, p3z, p4x, p4y, p4z);
                ulat = llat;
            }
            llong = rlong;
        }
    }

}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


