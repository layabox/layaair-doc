// JavaScript Document
function getCurrentTime() {
  localParam.millis = new Date().getTime();
  localParam.timeNow = new Date().getTime();
  if (localParam.lastTime != 0) {
    localParam.elapsed = localParam.timeNow - localParam.lastTime;
    localParam.currentTime =localParam.millis%100000000 / 1000;
  }
  localParam.lastTime = localParam.timeNow;

  localParam.cycle32 = parseInt(localParam.currentTime*30 % 32 + 1);
  localParam.fps = 1000.0/localParam.elapsed;
  localParam.fpsAverage = (localParam.fpsAverage*9+localParam.fps)/10;
  if(frameRateDiv){
    //frameRateDiv.tex =   pad2(localParam.fpsAverage);  
    $("#frameRate").text(pad2(localParam.fpsAverage));
  }
}

function tick(){
  getCurrentTime();
  setTimeUniform(localParam.currentTime);
}

function animate(){
        requestAnimFrame( animate );
        tick();
        drawScene();
}

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame   || 
	window.mozRequestAnimationFrame      || 
	window.oRequestAnimationFrame        || 
	window.msRequestAnimationFrame
})();
