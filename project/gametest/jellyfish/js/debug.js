var localParam = new LocalParam();
var Param = new Param();

function LocalParam(){
  this.camera = new Object;
  this.camera.near = 5;
  this.camera.far = 530;
  this.camera.fov = 27;

  this.camera.rotate = [-0.3,0,0];
  this.camera.translate = [0,0,-280];
  this.camera.eye = [0,0,-64];

  this.LODBias = 8.0;
  this.millis = 0.0;
  this.elapsed = 1.0;
  this.timeNow = 0.0;
  this.currentTime = 0.0;
  this.lastTime = 0.0;
  this.fps = 60.0;
  this.fpsAverage = 60.0;
  this.cycle32 = 0.0;
}

function Param(){

  //jellyfish
  this.jCount = 5;
  this.jScale = 4;
  this.jScaleRandom = 0;
  this.jTurb = 0.05;
  this.jSpeed = 0.01;
  this.pBbox = [80,80,80];

}

function setDebugParam(){
    if(!window.conch){
        document.getElementById('jCount').value = Param.jCount;
    }
    /*
  $("#jCount").val(Param.jCount);
  $("#jScale").val(Param.jScale);
  $("#jScaleRandom").val(Param.jScaleRandom);
  $("#jTurb").val(Param.jTurb);
  $("#jSpeed").val(Param.jSpeed);
  */
}

function readDebugParam(){
    /*
  Param.jCount = parseFloat($("#jCount").val());
  Param.jScale = parseFloat($("#jScale").val());
  Param.jScaleRandom = parseFloat($("#jScaleRandom").val());
  Param.jTurb = parseFloat($("#jTurb").val());
  Param.jSpeed = parseFloat($("#jSpeed").val());
  */
}