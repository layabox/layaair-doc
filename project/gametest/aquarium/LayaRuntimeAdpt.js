'use strict';

class Performance{
    now(){
        return tmGetCurms();
    }
}

window.performance = new Performance();
window.outerWidth = window.innerWidth;
window.outerHeight = window.innerHeight;
window.devicePixelRatio=1.0;

window.glpatch = function(gl,canvas){
    gl.getContextAttributes=function(){
        return {
            alpha:false,
            antialias:false,
            depth:true,
            failIfMajorPerformanceCaveat:false,
            premultipliedAlpha:true,
            preserveDrawingBuffer:false,
            stencil:false
        };
    };
    gl.canvas = canvas;
    var old_uniform4fv= gl.uniform4fv;
    gl.uniform4fv=function(location, v){
        if(v instanceof Array){
            old_uniform4fv.call(this,location,new Float32Array(v));
        }
        else old_uniform4fv.call(this,location,v);
    };

    //gl.getParameter(gl.MAX_VIEWPORT_DIMS) 
};
window.document.write=function(html){};