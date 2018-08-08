"use strict";

tdl.require('tdl.buffers');
tdl.require('tdl.clock');
tdl.require('tdl.fast');
tdl.require('tdl.fps');
tdl.require('tdl.io');
tdl.require('tdl.log');
tdl.require('tdl.math');
tdl.require('tdl.models');
tdl.require('tdl.particles');
tdl.require('tdl.primitives');
tdl.require('tdl.programs');
tdl.require('tdl.sync');
tdl.require('tdl.textures');
tdl.require('tdl.webgl');

// globals
var gl;                   // the gl context.
var canvas;               // the canvas
var math;                 // the math lib.
var fast;                 // the fast math lib.
var g_fpsTimer;           // object to measure frames per second;
var g_logGLCalls = true;  // whether or not to log webgl calls
var g_debug = false;      // whether or not to debug.
var g_drawOnce = false;
var g_setSettingElements = [];
var g_numSettingElements = {};
var g_sharkWorldMats = [];
var g_beamWorldMats = [];
var g_scenes = {};  // each of the models
var g_sceneGroups = {};  // the placement of the models
var g_fog = true;
var g_requestId;
var g_numFish = [100, 200, 500, 1000, 2000, 5000, 10000, 15000, 20000, 25000, 30000];

//g_debug = true;
//g_drawOnce = true;

var g_tailOffsetMult   = 1;
var g_endOfDome        = Math.PI / 8;
var g_tankRadius       = 74;
var g_tankHeight       = 36;
var g_standHeight      = 25;
var g_sharkSpeed       = 0.3;
var g_sharkClockOffset = 17;
var g_sharkXClock      = 1;
var g_sharkYClock      = 0.17;
var g_sharkZClock      = 1;
var g_numBubbleSets    = 10;
var g_laserEta = 1.2;
var g_laserLenFudge = 1;
var g_bubbleSets = [];
var g_fishData = [];
var g_numLightRays = 5;
var g_lightRayY = 50;
var g_lightRayDurationMin = 1;
var g_lightRayDurationRange = 1;
var g_lightRaySpeed = 4;
var g_lightRaySpread = 7;
var g_lightRayPosRange = 20;
var g_lightRayRotRange = 1.0;
var g_lightRayRotLerp = 0.2;
var g_lightRayOffset = Math.PI * 2 / g_numLightRays;
var g_lightRayInfo = [];

var g_ui = [
  { obj: 'globals',    name: 'speed',           value: 1,     max:  4 },
  { obj: 'globals',    name: 'targetHeight',    value: 0,     max:  150 },
  { obj: 'globals',    name: 'targetRadius',    value: 88,    max:  200 },
  { obj: 'globals',    name: 'eyeHeight',       value: 19,    max:  150 },
  { obj: 'globals',    name: 'eyeRadius',       value: 60,    max:  200 },
  { obj: 'globals',    name: 'eyeSpeed',        value: 0.06,  max:  1 },
  { obj: 'globals',    name: 'fieldOfView',     value: 85,  max:  179, min: 1},
  { obj: 'globals',    name: 'ambientRed',      value: 0.22,  max:  1},
  { obj: 'globals',    name: 'ambientGreen',    value: 0.25,  max:  1},
  { obj: 'globals',    name: 'ambientBlue',     value: 0.39,  max:  1},
  { obj: 'globals',    name: 'fogPower',        value: 14.5,  max:  50},
  { obj: 'globals',    name: 'fogMult',         value: 1.66,  max:  10},
  { obj: 'globals',    name: 'fogOffset',       value: 0.53,  max:  3},
  { obj: 'globals',    name: 'fogRed',          value: 0.54,  max:  1},
  { obj: 'globals',    name: 'fogGreen',        value: 0.86,  max:  1},
  { obj: 'globals',    name: 'fogBlue',         value: 1.0,   max:  1},
  { obj: 'fish',       name: 'fishHeightRange', value: 1,     max:  3},
  { obj: 'fish',       name: 'fishHeight',      value: 25,    max:  50},
  { obj: 'fish',       name: 'fishSpeed',       value: 0.124, max:  2},
  { obj: 'fish',       name: 'fishOffset',      value: 0.52,  max:  2},
  { obj: 'fish',       name: 'fishXClock',      value: 1,     max:  2},
  { obj: 'fish',       name: 'fishYClock',      value: 0.556, max:  2},
  { obj: 'fish',       name: 'fishZClock',      value: 1,     max:  2},
  { obj: 'fish',       name: 'fishTailSpeed',   value: 1,     max:  30},
  { obj: 'innerConst', name: 'refractionFudge', value: 3,     max:  50},
  { obj: 'innerConst', name: 'eta',             value: 1,     max:  1.2},
  { obj: 'innerConst', name: 'tankColorFudge',  value: 0.8,   max:  2}
];

var g_netUI = [
  { obj: 'net',    name: 'timeout',     value: 3000,  max:  3000},
  { obj: 'net',    name: 'fovMult',     value: 1.21,  max:  2},
  { obj: 'net',    name: 'fovFudge',    value: 1,     max:  2},
  { obj: 'net',    name: 'offsetMult',  value: 1,     max:  2}
];

var g_fishTable = [
  {
    name: 'SmallFishA',
    speed: 1,
    speedRange: 1.5,
    radius: 30,
    radiusRange: 25,
    tailSpeed: 10,
    heightOffset: 0,
    heightRange: 16,
    constUniforms: {
      fishLength: 10,
      fishWaveLength: 1,
      fishBendAmount: 2
    }
  },
  {
    name: 'MediumFishA',
    speed: 1,
    speedRange: 2,
    radius: 10,
    radiusRange: 20,
    tailSpeed: 1,
    heightOffset: 0,
    heightRange: 16,
    constUniforms: {
      fishLength: 10,
      fishWaveLength: -2,
      fishBendAmount: 2
    }
  },
  {
    name: 'MediumFishB',
    speed: 0.5,
    speedRange: 4,
    radius: 10,
    radiusRange: 20,
    tailSpeed: 3,
    heightOffset: -8,
    heightRange: 5,
    constUniforms: {
      fishLength: 10,
      fishWaveLength: -2,
      fishBendAmount: 2
    }
  },
  {
    name: 'BigFishA',
    speed: 0.5,
    speedRange: 0.5,
    radius: 50,
    radiusRange: 3,
    tailSpeed: 1.5,
    heightOffset: 0,
    heightRange: 16,
    lasers: true,
    laserRot: 0.04,
    laserOff: [0, 0.1, 9],
    laserScale: [0.3, 0.3, 1000],
    constUniforms: {
      fishLength: 10,
      fishWaveLength: -1,
      fishBendAmount: 0.5
    }
  },
  {
    name: 'BigFishB',
    speed: 0.5,
    speedRange: 0.5,
    radius: 45,
    radiusRange: 3,
    tailSpeed: 1,
    heightOffset: 0,
    heightRange: 16,
    lasers: true,
    laserRot: 0.04,
    laserOff: [0, -0.3, 9],
    laserScale: [0.3, 0.3, 1000],
    constUniforms: {
      fishLength: 10,
      fishWaveLength: -0.7,
      fishBendAmount: 0.3
    }
  },
];

var g_sceneInfoByName = {
};

var g_sceneInfo = [
  {
    name: "SmallFishA",
    program: [
      "fishVertexShader",
      "fishReflectionFragmentShader"
    ]
  },
  {
    name: "MediumFishA",
    program: [
      "fishVertexShader",
      "fishNormalMapFragmentShader"
    ]
  },
  {
    name: "MediumFishB",
    program: [
      "fishVertexShader",
      "fishReflectionFragmentShader"
    ]
  },
  {
    name: "BigFishA",
    program: [
      "fishVertexShader",
      "fishNormalMapFragmentShader"
    ]
  },
  {
    name: "BigFishB",
    program: [
      "fishVertexShader",
      "fishNormalMapFragmentShader"
    ]
  },
  {
    name: "Arch"
  },
  {
    name: "Coral"
  },
  {
    name: "CoralStoneA"
  },
  {
    name: "CoralStoneB"
  },
  {
    name: "EnvironmentBox",
    fog: false,
    group: "outside",
    program: [
      "diffuseVertexShader",
      "diffuseFragmentShader"
    ]
  },
  {
    name: "FloorBase_Baked"
  },
  {
    name: "FloorCenter"
  },
  {
    name: "GlobeBase",
    fog: false,
    program: [
      "diffuseVertexShader",
      "diffuseFragmentShader"
    ]
  },
  {
    name: "GlobeInner",
    group: "inner",
    program: [
      "innerRefractionMapVertexShader",
      "innerRefractionMapFragmentShader"
    ]
  },
  {
    name: "GlobeOuter",
    group: "outer",
    blend: true,
    program: [
      "outerRefractionMapVertexShader",
      "outerRefractionMapFragmentShader"
    ]
  },
  {
    name: "RockA"
  },
  {
    name: "RockB"
  },
  {
    name: "RockC"
  },
  {
    name: "RuinColumn"
  },
  {
    name: "Skybox",
    fog: false,
    group: "outside",
    program: [
      "diffuseVertexShader",
      "diffuseFragmentShader"
    ]
  },
  {
    name: "Stone"
  },
  {
    name: "Stones"
  },
  {
    name: "SunknShip"
  },
  {
    name: "SunknSub"
  },
  {
    name: "SupportBeams",
    group: "outside",
    fog: false
  },
  {
    name: "SeaweedA",
    blend: true,
    group: "seaweed",
    program: [
      "seaweedVertexShader",
      "seaweedFragmentShader",
    ]
  },
  {
    name: "SeaweedB",
    blend: true,
    group: "seaweed",
    program: [
      "seaweedVertexShader",
      "seaweedFragmentShader",
    ]
  },
  {
    name: "TreasureChest"
  }
];

var g_sceneInfoInstance = [
  {
    name: "SmallFishA",
    program: [
      "fishInstanceVertexShader",
      "fishReflectionFragmentShader"
    ]
  },
  {
    name: "MediumFishA",
    program: [
      "fishInstanceVertexShader",
      "fishNormalMapFragmentShader"
    ]
  },
  {
    name: "MediumFishB",
    program: [
      "fishInstanceVertexShader",
      "fishReflectionFragmentShader"
    ]
  },
  {
    name: "BigFishA",
    program: [
      "fishInstanceVertexShader",
      "fishNormalMapFragmentShader"
    ]
  },
  {
    name: "BigFishB",
    program: [
      "fishInstanceVertexShader",
      "fishNormalMapFragmentShader"
    ]
  },
  {
    name: "Arch"
  },
  {
    name: "Coral"
  },
  {
    name: "CoralStoneA"
  },
  {
    name: "CoralStoneB"
  },
  {
    name: "EnvironmentBox",
    fog: false,
    group: "outside",
    program: [
      "diffuseVertexShader",
      "diffuseFragmentShader"
    ]
  },
  {
    name: "FloorBase_Baked"
  },
  {
    name: "FloorCenter"
  },
  {
    name: "GlobeBase",
    fog: false,
    program: [
      "diffuseVertexShader",
      "diffuseFragmentShader"
    ]
  },
  {
    name: "GlobeInner",
    group: "inner",
    program: [
      "innerRefractionMapVertexShader",
      "innerRefractionMapFragmentShader"
    ]
  },
  {
    name: "GlobeOuter",
    group: "outer",
    blend: true,
    program: [
      "outerRefractionMapVertexShader",
      "outerRefractionMapFragmentShader"
    ]
  },
  {
    name: "RockA"
  },
  {
    name: "RockB"
  },
  {
    name: "RockC"
  },
  {
    name: "RuinColumn"
  },
  {
    name: "Skybox",
    fog: false,
    group: "outside",
    program: [
      "diffuseVertexShader",
      "diffuseFragmentShader"
    ]
  },
  {
    name: "Stone"
  },
  {
    name: "Stones"
  },
  {
    name: "SunknShip"
  },
  {
    name: "SunknSub"
  },
  {
    name: "SupportBeams",
    group: "outside",
    fog: false
  },
  {
    name: "SeaweedA",
    blend: true,
    group: "seaweed",
    program: [
      "seaweedVertexShader",
      "seaweedFragmentShader",
    ]
  },
  {
    name: "SeaweedB",
    blend: true,
    group: "seaweed",
    program: [
      "seaweedVertexShader",
      "seaweedFragmentShader",
    ]
  },
  {
    name: "TreasureChest"
  }
];

var g_skyBoxUrls = [
  'assets/GlobeOuter_EM_positive_x.jpg',
  'assets/GlobeOuter_EM_negative_x.jpg',
  'assets/GlobeOuter_EM_positive_y.jpg',
  'assets/GlobeOuter_EM_negative_y.jpg',
  'assets/GlobeOuter_EM_positive_z.jpg',
  'assets/GlobeOuter_EM_negative_z.jpg'
//  'static_assets/skybox/InteriorCubeEnv_EM.png'
]

function ValidateNoneOfTheArgsAreUndefined(functionName, args) {
  for (var ii = 0; ii < args.length; ++ii) {
    if (args[ii] === undefined) {
      tdl.error("undefined passed to gl." + functionName + "(" +
                tdl.webgl.glFunctionArgsToString(functionName, args) + ")");
    }
  }
}

function LogGLCall(functionName, args) {
  if (g_logGLCalls) {
    ValidateNoneOfTheArgsAreUndefined(functionName, args)
    tdl.log("gl." + functionName + "(" +
            tdl.webgl.glFunctionArgsToString(functionName, args) + ")");
  }
}

/**
 * Calculate the intersection of a ray and a sphere
 *
 * point1 + mu1 (point2 - point1)
 * point1 + mu2 (point2 - point1)
 *
 * Return undefined.
 */
function raySphereIntersection(point1, point2, center, radius) {
  var kEpsilon = 0.0001;
  var dp = [
      point2[0] - point1[0],
      point2[1] - point1[1],
      point2[2] - point1[2]];
  var a = dp[0] * dp[0] +
          dp[1] * dp[1] +
          dp[2] * dp[2];
  var b = 2 * (dp[0] * (point1[0] - center[0]) +
               dp[1] * (point1[1] - center[1]) +
               dp[2] * (point1[2] - center[2]));
  var c = center[0] * center[0] +
          center[1] * center[1] +
          center[2] * center[2];
  c += point1[0] * point1[0] +
       point1[1] * point1[1] +
       point1[2] * point1[2];
  c -= 2 * (center[0] * point1[0] +
            center[1] * point1[1] +
            center[2] * point1[2]);
  c -= radius * radius;
  var bb4ac = b * b - 4 * a * c;
  if (Math.abs(a) < kEpsilon || bb4ac < 0) {
    return;
  }

  var sq = Math.sqrt(bb4ac);
  var mu1 = (-b + sq) / (2 * a);
  var mu2 = (-b - sq) / (2 * a);

  var m = Math.max(mu1, mu2);
  return math.addVector(point1, math.mulScalarVector(m, dp));
}

function refract(i, n, eta) {
  var dotNI = math.dot(n, i);
  var k = 1.0 - eta * eta * (1.0 - dotNI * dotNI);
  if (k < 0.0) {
    return;
  }
  return math.subVector(
      math.mulScalarVector(eta, i),
      math.mulScalarVector(eta * dotNI + Math.sqrt(k), n));
}

function createProgramFromTags(
    vertexTagId,
    fragmentTagId,
    fog,
    opt_reflection,
    opt_normalMaps) {
  opt_reflection = (opt_reflection === undefined) ? true : opt_reflection;
  opt_normalMaps = (opt_normalMaps === undefined) ? true : opt_normalMaps;

  var fogUniforms = '' +
    'uniform float fogPower;\n' +
    'uniform float fogMult;\n' +
    'uniform float fogOffset;\n' +
    'uniform vec4 fogColor;\n';
  var fogCode = '' +
    'outColor = mix(outColor, vec4(fogColor.rgb, diffuseColor.a),\n' +
    '   clamp(pow((v_position.z / v_position.w), fogPower) * fogMult - fogOffset,0.0,1.0));\n';
  var fs = getScriptText(fragmentTagId)

  if (g_fog && fog) {
    fs = fs.replace('// #fogUniforms', fogUniforms);
    fs = fs.replace('// #fogCode', fogCode);
  }

  if (opt_reflection) {
    fs = fs.replace(/^.*?\/\/ #noReflection\n/gm, "");
  } else {
    fs = fs.replace(/^.*?\/\/ #reflection\n/gm, "");
  }

  if (opt_normalMaps) {
    fs = fs.replace(/^.*?\/\/ #noNormalMap\n/gm, "");
  } else {
    fs = fs.replace(/^.*?\/\/ #normalMap\n/gm, "");
  }

  return tdl.programs.loadProgram(getScriptText(vertexTagId), fs);
}

var Scene = function(opt_programIds, fog) {
  this.programIds = opt_programIds;
  this.bad = false;
  this.loaded = false;
  this.fog = fog;
  this.models = [];
  this.ignore = false;
};

Scene.prototype.load = function(url) {
  var that = this;
  this.url = url;
  tdl.io.loadJSON(url, function(data, exception) {
      that.onload_(data, exception);
    });
};

// Stop the scene from loading.
Scene.prototype.stop = function() {
  this.ignore = false;
};

Scene.prototype.onload_ = function(data, exception) {
  if (this.ignore) {
    return;
  }
  this.loaded = true;
  if (exception) {
    this.bad = true;
  } else {
    for (var mm = 0; mm < data.models.length; ++mm) {
      var model = data.models[mm];
      // setup textures
      var textures = {};
      for (var name in model.textures) {
        textures[name] = tdl.textures.loadTexture(
            'assets/' + model.textures[name], true);
      }
      // setup vertices
      var arrays = {};
      for (var name in model.fields) {
        var field = model.fields[name];
        arrays[name] = new tdl.primitives.AttribBuffer(
          field.numComponents,
          field.data,
          field.type);
      }
      // setup program
      // There are 3 programs
      // DM
      // DM+NM
      // DM+NM+RM
      var type;
      var vsId;
      var fsId;
      if (!textures.diffuse) {
        throw "missing diffuse texture for: " + this.url;
      }
      if (this.programIds) {
        type = "custom";
        vsId = this.programIds[0];
        fsId = this.programIds[1];
        // Fix this hack
        textures.skybox = tdl.textures.loadTexture(g_skyBoxUrls);
      } else if (textures.reflectionMap) {
        if (!textures.normalMap) {
          throw "missing normalMap for: " + this.url;
        }
        type = "reflection";
        vsId = 'reflectionMapVertexShader';
        fsId = 'reflectionMapFragmentShader';
        textures.skybox = tdl.textures.loadTexture(g_skyBoxUrls);

      } else if (textures.normalMap) {
        type = "normalMap";
        vsId = 'normalMapVertexShader';
        fsId = 'normalMapFragmentShader';
      } else {
        type = "diffuse";
        vsId = 'diffuseVertexShader';
        fsId = 'diffuseFragmentShader';
      }
      var program = createProgramFromTags(vsId, fsId, this.fog);
      var noFog = createProgramFromTags(vsId, fsId, false);
      var noReflection = createProgramFromTags(vsId, fsId, this.fog, false);
      var noFognoReflection = createProgramFromTags(vsId, fsId, false, false);
      var noNormalMaps = createProgramFromTags(vsId, fsId, this.fog, false);
      var noFognoNormalMaps =
          createProgramFromTags(vsId, fsId, false, false);
      var noReflectionnoNormalMaps =
          createProgramFromTags(vsId, fsId, this.fog, false, false);
      var noFognoReflectionnoNormalMaps =
          createProgramFromTags(vsId, fsId, false, false, false);

      // tdl.log(this.url, ": ", type);
      var model = new tdl.models.Model(program, arrays, textures);
      model.programs = {
        base: program,
        noFog: noFog,
        noReflection: noReflection,
        noFognoReflection: noFognoReflection,
        noNormalMaps: noNormalMaps,
        noFognoNormalMaps: noFognoNormalMaps,
        noReflectionnoNormalMaps: noReflectionnoNormalMaps,
        noFognoReflectionnoNormalMaps: noFognoReflectionnoNormalMaps
      };
      model.extents = arrays.position.computeExtents();
      this.models.push(model);
    }
    setShaders();
  }
};

function setShaders() {
  var name = '';
  if (!g.options.fog.enabled) {
    name += 'noFog';
  }
  if (!g.options.reflection.enabled) {
    name += 'noReflection';
  }
  if (!g.options.normalMaps.enabled) {
    name += 'noNormalMaps';
  }
  if (name == '') {
    name = 'base';
  }
  for (var sceneName in g_scenes) {
    var scene = g_scenes[sceneName];
    var models = scene.models;
    var numModels = models.length;
    for (var jj = 0; jj < numModels; ++jj) {
      var model = models[jj];
      model.setProgram(model.programs[name]);
    }
  }
}


function loadScene(name, opt_programIds, fog) {
  var scene = new Scene(opt_programIds, fog);
  scene.load("assets/" + name + ".json");
  return scene;
}

function loadScenes() {
  for (var ii = 0; ii < g_sceneInfo.length; ++ii) {
    var info = g_sceneInfo[ii];
    var fog = (info.fog !== undefined) ? info.fog : true;
    g_scenes[info.name] = loadScene(info.name, info.program, fog);
  }
}

function loadPlacement() {
  tdl.io.loadJSON('assets/PropPlacement.json', function(json, exception) {
    if (exception) {
      throw exception
    } else {
      for (var ii = 0; ii < g_sceneInfo.length; ++ii) {
        var info = g_sceneInfo[ii];
        g_sceneInfoByName[info.name] = info;
      }

      var objects = json.objects;
      for (var ii = 0; ii < objects.length; ++ii) {
        var object = objects[ii];
        var scene = g_scenes[object.name];
        var info = g_sceneInfoByName[object.name];
//tdl.log(object.name);
        var groupName = info.group || 'base';
        if (!g_sceneGroups[groupName]) {
          g_sceneGroups[groupName] = [];
        }
        var group = g_sceneGroups[groupName];
        group.push(object);
      }
    }
  });
}

function initLightRay(info) {
  info.duration =
      g_lightRayDurationMin + Math.random() * g_lightRayDurationRange;
  info.timer = info.duration;
  var r = Math.random();
  info.rot = r * g_lightRayRotRange;
  info.x = (r - 0.5) * g_lightRayPosRange;
}

/**
 * Setup Laser
 */
function setupLaser() {
  var textures = {
      colorMap: tdl.textures.loadTexture('static_assets/beam.png')};
  var program = createProgramFromTags(
      'laserVertexShader',
      'laserFragmentShader');
  var beam1Arrays = tdl.primitives.createPlane(1, 1, 1, 1);
  delete beam1Arrays.normal;
  tdl.primitives.reorient(beam1Arrays,
        math.matrix4.translation([0, 0, 0.5]));
  var beam2Arrays = tdl.primitives.clone(beam1Arrays);
  var beam3Arrays = tdl.primitives.clone(beam1Arrays);
  tdl.primitives.reorient(beam2Arrays,
        math.matrix4.rotationZ(math.degToRad(120)));
  tdl.primitives.reorient(beam3Arrays,
        math.matrix4.rotationZ(math.degToRad(-120)));
  var arrays = tdl.primitives.concat([
      beam1Arrays,
      beam2Arrays,
      beam3Arrays]);
  return new tdl.models.Model(program, arrays, textures);
}

function setupLightRay() {
  for (var ii = 0; ii < g_numLightRays; ++ii) {
    var info = { };
    var l = ii / g_numLightRays;
    initLightRay(info);
    g_lightRayInfo[ii] = info;
  }

  var textures = {
      colorMap: tdl.textures.loadTexture('assets/LightRay.png') };
  var program = createProgramFromTags(
      'texVertexShader',
      'texFragmentShader');
  var arrays = tdl.primitives.createPlane(1, 1, 1, 1);
  tdl.primitives.reorient(arrays,
      [1, 0, 0, 0,
       0, 0, -1, 0,
       0, 1, 0, 0,
       0, 0.5, 0, 1]);
  delete arrays.normal;
  return new tdl.models.Model(program, arrays, textures);
}

function setupBubbles(particleSystem) {
    var texture = tdl.textures.loadTexture('static_assets/bubble.png');
    var emitter = particleSystem.createParticleEmitter(texture.texture);
    emitter.setTranslation(0, 0, 0);
    emitter.setState(tdl.particles.ParticleStateIds.ADD);
    emitter.setColorRamp(
        [1, 1, 1, 1,
         1, 1, 1, 1,
         1, 1, 1, 1,
         1, 1, 1, 1,
         1, 1, 1, 1,
         1, 1, 1, 0]);
    emitter.setParameters({
        numParticles: 100,
        numFrames: 1,
        frameDuration: 1000.0,
        frameStartRange: 0,
        lifeTime: 40,
        startTime: 0,
        startSize: 0.01,
        startSizeRange: 0.01,
        endSize: 0.4,
        endSizeRange: 0.2,
        position: [0,-2,0],
        positionRange: [0.1,2,0.1],
        acceleration: [0,0.05,0],
        accelerationRange: [0,0.02,0],
        velocityRange: [0.05,0,0.05],
        colorMult: [0.7,0.8,1,1]});
        //function(index, parameters) {
        //    var speed = Math.random() * 0.6 + 0.2;
        //    var speed2 = Math.random() * 0.2 + 0.1;
        //    var angle = Math.random() * 2 * Math.PI;
        //    parameters.velocity = math.matrix4.transformPoint(
        //        math.matrix4.rotationZ(angle), [speed, speed2, 0]);
        //}
        //);
    for (var ii = 0; ii < g_numBubbleSets; ++ii) {
        g_bubbleSets[ii] = emitter.createOneShot();
    }
}

/**
 * Sets up the Skybox
 */
function setupSkybox() {
  var textures = {
    skybox: tdl.textures.loadTexture(g_skyBoxUrls)};
  var program;
  program = createProgramFromTags(
      'skyboxVertexShader',
      'skyboxFragmentShader');
  var arrays = tdl.primitives.createPlane(2, 2, 1, 1);
  delete arrays['normal'];
  delete arrays['texCoord'];
  tdl.primitives.reorient(arrays,
      [1, 0, 0, 0,
       0, 0, 1, 0,
       0,-1, 0, 0,
       0, 0, 0.99, 1]);
  return new tdl.models.Model(program, arrays, textures);
}

function setViewSettings(index) {
  function setGlobal(name, value) {
    $(g_uiWidgets.globals[name]).slider("value", value * 1000);
    g.globals[name] = value;
  }

  var viewSettings = g_viewSettings[index];
  setSettings({globals: viewSettings})
}

function advanceViewSettings() {
  setViewSettings(g_viewSettingsIndex);
  g_viewSettingsIndex = (g_viewSettingsIndex + 1) % g_viewSettings.length;
}

/**
 * Sets the count
 */
function setSetting(elem, id) {
  setSettings({globals:{fishSetting:id}});
}

/**
 * Initializes stuff.
 */
function main() {
  math = tdl.math;
  fast = tdl.fast;

  canvas = document.createElement('canvas');// wxhelper.GetMainCanvas("canvas");
  document.body.appendChild(canvas);

  //canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
  // tell the simulator when to lose context.
  //canvas.loseContextInNCalls(1500);
  tdl.webgl.registerContextLostHandler(canvas, handleContextLost);
  tdl.webgl.registerContextRestoredHandler(canvas, handleContextRestored);

  g_fpsTimer = new wxhelper.FPSMeter();
  gl = tdl.webgl.setupWebGL(canvas, g.globals.canvasAttributes);
  if (!gl) {
    return false;
  }
  if (g_debug) {
    gl = tdl.webgl.makeDebugContext(gl, undefined, LogGLCall);
  }

  if (wxhelper.CanUseWebGL2())
    g_sceneInfo = g_sceneInfoInstance;

  console.log("Use instance rendering:" + wxhelper.CanUseWebGL2()
    + ", antialias:" + gl.getContextAttributes()['antialias']
    + ", game mode:" + wxhelper.CanUseGameMode());
  initialize();
}

function handleContextLost() {
  tdl.log("context lost");
  wxhelper.GameLoopUtil.cancalNextFrame(g_requestId);
  // remove loading scenes
  for (var name in g_scenes) {
    var scene = g_scenes[name];
    scene.stop();
  }
  g_scenes = { };
}

function handleContextRestored() {
  tdl.log("context restored");
  initialize();
}

function initialize() {
  //const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);

  gl.enable(gl.DEPTH_TEST);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  loadPlacement();
  Log("--Setup Skybox---------------------------------------");
  var skybox = setupSkybox();
  loadScenes();
  Log("--Setup Laser----------------------------------------");
  var laser = setupLaser();

  g_fishTable.forEach(info => {
    info.fishData = [];
    info.num = [];
  });

  var types = ["Big", "Medium", "Small"];
  g_numFish.forEach((totalFish) => {
    var numLeft = totalFish;
    types.forEach((type) => {
      g_fishTable.forEach((fishInfo) => {
        var fishName = fishInfo.name;
        if (!fishName.startsWith(type)) {
          return;
        }
        var numType = numLeft;
        if (type == "Big") {
          numType = Math.min(numLeft, totalFish < 100 ? 1 : 2);
        } else if (type == "Medium") {
          if (totalFish < 1000) {
            numType = Math.min(numLeft, totalFish / 10 | 0);
          } else if (totalFish < 10000) {
            numType = Math.min(numLeft, 80);
          } else {
            numType = Math.min(numLeft, 160);
          }
        }
        numLeft = numLeft - numType;
        fishInfo.num.push(numType);
      });
    })
  });

  var particleSystem = new tdl.particles.ParticleSystem(
      gl, null, math.pseudoRandom);
  setupBubbles(particleSystem);
  var bubbleTimer = 0;
  var bubbleIndex = 0;

  var lightRay = setupLightRay();

  var then = 0.0;
  var clock = 0.0;

  var projection = new Float32Array(16);
  var view = new Float32Array(16);
  var world = new Float32Array(16);
  var worldInverse = new Float32Array(16);
  var worldInverseTranspose = new Float32Array(16);
  var viewProjection = new Float32Array(16);
  var worldViewProjection = new Float32Array(16);
  var viewInverse = new Float32Array(16);
  var viewProjectionInverse = new Float32Array(16);
  var skyView = new Float32Array(16);
  var skyViewProjection = new Float32Array(16);
  var skyViewProjectionInverse = new Float32Array(16);
  var eyePosition = new Float32Array(3);
  var target = new Float32Array(3);
  var up = new Float32Array([0,1,0]);
  var lightWorldPos = new Float32Array(3);
  var v3t0 = new Float32Array(3);
  var v3t1 = new Float32Array(3);
  var m4t0 = new Float32Array(16);
  var m4t1 = new Float32Array(16);
  var m4t2 = new Float32Array(16);
  var m4t3 = new Float32Array(16);
  var zero4 = new Float32Array(4);
  var one4 = new Float32Array([1,1,1,1]);
  var colorMult = new Float32Array([1,1,1,1]);
  var ambient = new Float32Array(4);
  var fogColor = new Float32Array([1,1,1,1]);

  // Sky uniforms.
  var skyConst = {viewProjectionInverse: skyViewProjectionInverse};
  var skyPer = {};

  // Sand uniforms.
  var sandConst = {
    viewInverse: viewInverse,
    lightWorldPos: lightWorldPos,
    lightColor: one4,
    specular: one4,
    shininess: 5,
    specularFactor: 0.3};
  var sandPer = {
    world: world,
    worldViewProjection: worldViewProjection,
    worldInverse: worldInverse,
    worldInverseTranspose: worldInverseTranspose};

  // Generic uniforms.
  var genericConst = {
    viewInverse: viewInverse,
    lightWorldPos: lightWorldPos,
    lightColor: one4,
    specular: one4,
    shininess: 50,
    specularFactor: 1,
    ambient: ambient};
  var genericPer = {
    world: world,
    worldViewProjection: worldViewProjection,
    worldInverse: worldInverse,
    worldInverseTranspose: worldInverseTranspose};

  // outside uniforms.
  var outsideConst = {
    viewInverse: viewInverse,
    lightWorldPos: lightWorldPos,
    lightColor: one4,
    specular: one4,
    shininess: 50,
    specularFactor: 0,
    ambient: ambient};
  var outsidePer = {
    world: world,
    worldViewProjection: worldViewProjection,
    worldInverse: worldInverse,
    worldInverseTranspose: worldInverseTranspose};

  // Seaweed uniforms.
  var seaweedConst = {
    viewInverse: viewInverse,
    lightWorldPos: lightWorldPos,
    lightColor: one4,
    specular: one4,
    shininess: 50,
    specularFactor: 1,
    ambient: ambient};
  var seaweedPer = {
    world: world,
    viewProjection: viewProjection,
    worldInverse: worldInverse,
    worldInverseTranspose: worldInverseTranspose};

  // Laser uniforms
  var laserConst = {};
  var laserPer = {
    worldViewProjection: worldViewProjection};

  // Inner uniforms.
  g.innerConst.viewInverse = viewInverse;
  g.innerConst.lightWorldPos = lightWorldPos;
  g.innerConst.lightColor = one4;
  g.innerConst.specular = one4;
  g.innerConst.shininess = 50;
  g.innerConst.specularFactor = 1;
  var innerPer = {
    world: world,
    worldViewProjection: worldViewProjection,
    worldInverse: worldInverse,
    worldInverseTranspose: worldInverseTranspose};

  // Fish uniforms.
  var fishConst = {
    viewProjection: viewProjection,
    viewInverse: viewInverse,
    lightWorldPos: lightWorldPos,
    lightColor: one4,
    specular: one4,
    shininess: 5,
    specularFactor: 0.3,
    ambient: ambient};
  var fishPer = {
    worldPosition: new Float32Array(3), //[0,0,0],
    nextPosition: new Float32Array(3), //[0,0,0],
    scale: 1};

  // lightRay uniforms.
  var lightRayConst = {};
  var lightRayPer = {
    worldViewProjection: worldViewProjection,
    colorMult: new Float32Array([1,1,1,1])};

  function DrawGroup(group, constUniforms, perUniforms) {
    var numObjects = group.length;
    var currentModel = undefined;
    for (var ii = 0; ii < numObjects; ++ii) {
      var object = group[ii];
      var scene = g_scenes[object.name];
      var info = g_sceneInfoByName[object.name];
      if (!scene) {
        g_scenes[object.name] = { missing: true };
        tdl.log("missing scene:", object.name);
        continue;
      }
      if (scene.missing || !scene.loaded) {
        continue;
      }

      if (info.blend) {
        gl.enable(gl.BLEND);
      } else {
        gl.disable(gl.BLEND);
      }

      var models = scene.models;
      var numModels = models.length;
      for (var jj = 0; jj < numModels; ++jj) {
        var model = models[jj];
        if (model != currentModel) {
          currentModel = model;
          model.drawPrep(constUniforms);
        }
        fast.matrix4.copy(world, object.worldMatrix);
        fast.matrix4.mul(worldViewProjection, world, viewProjection);
        fast.matrix4.inverse(worldInverse, world);
        fast.matrix4.transpose(worldInverseTranspose, worldInverse);
        perUniforms.time = clock + ii;
        model.draw(perUniforms);
      }
    }
  }

  initUIStuff();
  initializeCommon();

  var frameCount = 0;
  var eyeClock = 0;
  var setPretty = true;

  var theClock = tdl.clock.createClock(g.net.sync ? 10 : undefined);
  var now = theClock.getTime();
  if (g.net.sync) {
    clock = now;
    eyeClock = now;
  }

  function setCanvasSize(canvas, newWidth, newHeight) {
    var changed = false;
    if (newWidth != canvas.width) {
      canvas.width = newWidth;
      changed = true;
      tdl.log("new canvas width:", newWidth);
    }
    if (newHeight != canvas.height) {
      canvas.height = newHeight;
      changed = true;
      tdl.log("new canvas height:", newHeight);
    }
    if (changed) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    ("drawingBufferDimensions:" + gl.drawingBufferWidth + ", " + gl.drawingBufferHeight);
    return changed;
  }

  // GetCanvasSizeUseWindowRatio can be used to try different rendering resolution
  // let windowSize = wxhelper.GetCanvasSizeUseWindowRatio(720);
  let windowSize = wxhelper.GetWindowSizeInPx();
  setCanvasSize(canvas, windowSize.width, windowSize.height);

  function render() {
    var now = theClock.getTime();
    var elapsedTime;
    if(then == 0.0) {
      elapsedTime = 0.0;
    } else {
      elapsedTime = now - then;
    }
    then = now;

    frameCount++;

    if (g.net.sync) {
      clock = now * g.globals.speed;
      eyeClock = now * g.globals.eyeSpeed;
    } else {
      // we have our own clock.
      clock += elapsedTime * g.globals.speed;
      eyeClock += elapsedTime * g.globals.eyeSpeed;
    }
    eyePosition[0] = Math.sin(eyeClock) * g.globals.eyeRadius;
    eyePosition[1] = g.globals.eyeHeight;
    eyePosition[2] = Math.cos(eyeClock) * g.globals.eyeRadius;
    target[0] = Math.sin(eyeClock + Math.PI) * g.globals.targetRadius;
    target[1] = g.globals.targetHeight;
    target[2] = Math.cos(eyeClock + Math.PI) * g.globals.targetRadius;

    ambient[0] = g.globals.ambientRed;
    ambient[1] = g.globals.ambientGreen;
    ambient[2] = g.globals.ambientBlue;

    gl.colorMask(true, true, true, true);
    gl.clearColor(0,0.8,1,0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

    var near = 1;
    var far = 25000;
    var aspect = canvas.width / canvas.height;
    var top = Math.tan(math.degToRad(g.globals.fieldOfView * g.net.fovFudge) * 0.5) * near;
    var bottom = -top;
    var left = aspect * bottom;
    var right = aspect * top;
    var width = Math.abs(right - left);
    var height = Math.abs(top - bottom);
    var xOff = width * g.net.offset[0] * g.net.offsetMult;
    var yOff = height * g.net.offset[1] * g.net.offsetMult;
    fast.matrix4.frustum(
      projection,
      left + xOff,
      right + xOff,
      bottom + yOff,
      top + yOff,
      near,
      far);

    fast.matrix4.cameraLookAt(
        viewInverse,
        eyePosition,
        target,
        up);
    if (g.net.slave) {
      // compute X fov from y fov
      var fovy = math.degToRad(g.globals.fieldOfView * g.net.fovFudge);
      var fovx = Math.atan(
          Math.tan(fovy * 0.5) * canvas.width / canvas.height) * 2;
      fast.matrix4.rotationY(
          m4t0, g.net.rotYMult * fovx * -g.net.fovMult);
      fast.matrix4.mul(viewInverse, m4t0, viewInverse);
    }
    fast.matrix4.inverse(view, viewInverse);
    fast.matrix4.mul(viewProjection, view, projection);
    fast.matrix4.inverse(viewProjectionInverse, viewProjection);

    fast.matrix4.copy(skyView, view);
    skyView[12] = 0;
    skyView[13] = 0;
    skyView[14] = 0;
    fast.matrix4.mul(skyViewProjection, skyView, projection);
    fast.matrix4.inverse(skyViewProjectionInverse, skyViewProjection);

    fast.matrix4.getAxis(v3t0, viewInverse, 0); // x
    fast.matrix4.getAxis(v3t1, viewInverse, 1); // y;
    fast.mulScalarVector(v3t0, 20, v3t0);
    fast.mulScalarVector(v3t1, 30, v3t1);
    fast.addVector(lightWorldPos, eyePosition, v3t0);
    fast.addVector(lightWorldPos, lightWorldPos, v3t1);

//      view: view,
//      projection: projection,
//      viewProjection: viewProjection,

    gl.disable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendEquation(gl.FUNC_ADD);
    gl.enable(gl.CULL_FACE);

    math.resetPseudoRandom();
    var pseudoRandom = math.pseudoRandom;
    //var pseudoRandom = function() {
    //  return 0.5;
    //};

    // Draw Skybox
    //Log("--Draw Sky---------------------------------------");
    //if (g.options.skybox.enabled) {
    //  gl.depthMask(false);
    //  skybox.drawPrep(skyConst);
    //  skybox.draw(skyPer);
    //}
    gl.depthMask(true);

    if (g_fog) {
      genericConst.fogPower  = g.globals.fogPower;
      genericConst.fogMult   = g.globals.fogMult;
      genericConst.fogOffset = g.globals.fogOffset;
      genericConst.fogOffset = g.globals.fogOffset;
      genericConst.fogColor  = fogColor;
      fishConst.fogPower     = g.globals.fogPower;
      fishConst.fogMult      = g.globals.fogMult;
      fishConst.fogOffset    = g.globals.fogOffset;
      fishConst.fogColor     = fogColor;
      g.innerConst.fogPower  = g.globals.fogPower;
      g.innerConst.fogMult   = g.globals.fogMult;
      g.innerConst.fogOffset = g.globals.fogOffset;
      g.innerConst.fogColor  = fogColor;
      seaweedConst.fogPower  = g.globals.fogPower;
      seaweedConst.fogMult   = g.globals.fogMult;
      seaweedConst.fogOffset = g.globals.fogOffset;
      seaweedConst.fogColor  = fogColor;
      fogColor[0] = g.globals.fogRed;
      fogColor[1] = g.globals.fogGreen;
      fogColor[2] = g.globals.fogBlue;
    }

    // Draw Scene
    if (g_sceneGroups.base) {
      DrawGroup(g_sceneGroups.base, genericConst, genericPer);
    }

    // Draw Fishes.
    Log("--Draw Fish---------------------------------------");
    let drawFishNum = 0;

    gl.enable(gl.BLEND);
    for (var ff = 0; ff < g_fishTable.length; ++ff) {
      var fishInfo = g_fishTable[ff];
      var fishName = fishInfo.name;
      var numFish = fishInfo.num[g.globals.fishSetting];
      drawFishNum += numFish;
      var matMul = fast.matrix4.mul;
      var matInverse = fast.matrix4.inverse;
      var matScaling = fast.matrix4.scaling;
      var matCameraLookAt = fast.matrix4.cameraLookAt;
      var matTranspose = fast.matrix4.transpose;
      var scene = g_scenes[fishName];
      if (scene && scene.loaded && !scene.bad) {
        var fish = scene.models[0];
        var f = g.fish;
        for (var p in fishInfo.constUniforms) {
          fishConst[p] = fishInfo.constUniforms[p];
        }
        fish.drawPrep(fishConst);
        var fishBaseClock = clock * f.fishSpeed;
        var fishRadius = fishInfo.radius;
        var fishRadiusRange = fishInfo.radiusRange;
        var fishSpeed = fishInfo.speed;
        var fishSpeedRange = fishInfo.speedRange;
        var fishTailSpeed = fishInfo.tailSpeed * f.fishTailSpeed;
        var fishOffset = f.fishOffset;
        var fishClockSpeed = f.fishSpeed;
        var fishHeight = f.fishHeight + fishInfo.heightOffset;
        var fishHeightRange = f.fishHeightRange * fishInfo.heightRange;
        var fishXClock = f.fishXClock;
        var fishYClock = f.fishYClock;
        var fishZClock = f.fishZClock;
        var fishPosition = fishPer.worldPosition;
        var fishNextPosition = fishPer.nextPosition;

        var useInstanceRendering = wxhelper.CanUseWebGL2();
        if (useInstanceRendering) {
          fish.drawInstancePrep(numFish);
        }

        for (var ii = 0; ii < numFish; ++ii) {
          var fishClock = fishBaseClock + ii * fishOffset;
          var speed = fishSpeed + math.pseudoRandom() * fishSpeedRange;
          var scale = 1.0 + math.pseudoRandom() * 1;
          var xRadius = fishRadius + pseudoRandom() * fishRadiusRange;
          var yRadius = 2.0 + pseudoRandom() * fishHeightRange;
          var zRadius = fishRadius + pseudoRandom() * fishRadiusRange;
          var fishSpeedClock = fishClock * speed;
          var xClock = fishSpeedClock * fishXClock;
          var yClock = fishSpeedClock * fishYClock;
          var zClock = fishSpeedClock * fishZClock;

          fishPosition[0] = Math.sin(xClock) * xRadius;
          fishPosition[1] = Math.sin(yClock) * yRadius + fishHeight;
          fishPosition[2] = Math.cos(zClock) * zRadius;
          fishNextPosition[0] = Math.sin(xClock - 0.04) * xRadius;
          fishNextPosition[1] = Math.sin(yClock - 0.01) * yRadius + fishHeight;
          fishNextPosition[2] = Math.cos(zClock - 0.04) * zRadius;
          fishPer.scale = scale;

//          matMul(world,
//              matScaling(m4t0, [scale, scale, scale]),
//              matCameraLookAt(
//                  m4t1, [x, y, z], [nextX, nextY, nextZ], [0, 1, 0]));
//          matMul(worldViewProjection, world, viewProjection);
//          matInverse(worldInverse, world);
//          matTranspose(worldInverseTranspose, worldInverse);
          fishPer.time =
              ((clock + ii * g_tailOffsetMult) * fishTailSpeed * speed) %
              (Math.PI * 2);

          if (useInstanceRendering) {
            fish.worldPositionInstanceBuffer[3 * ii + 0] = fishPosition[0];
            fish.worldPositionInstanceBuffer[3 * ii + 1] = fishPosition[1];
            fish.worldPositionInstanceBuffer[3 * ii + 2] = fishPosition[2];
            fish.nextPositionInstanceBuffer[3 * ii + 0] = fishNextPosition[0];
            fish.nextPositionInstanceBuffer[3 * ii + 1] = fishNextPosition[1];
            fish.nextPositionInstanceBuffer[3 * ii + 2] = fishNextPosition[2];
            fish.scaleInstanceBuffer[ii] = fishPer.scale;
            fish.timeInstanceBuffer[ii] = fishPer.time;
          } else {
            fish.draw(fishPer);
          }

          if (g.globals.drawLasers && fishInfo.lasers) {
            fishInfo.fishData[ii] = {
              position: [
                  fishPosition[0],
                  fishPosition[1],
                  fishPosition[2]],
              target: [
                  fishNextPosition[0],
                  fishNextPosition[1],
                  fishNextPosition[2]],
              scale: scale,
              time: fishPer.time
            };
          }
        } // draw fish for loop

        if (useInstanceRendering) {
          fish.drawInstance(numFish);
        }
      }
    }

    Log("--Fish Number: " + drawFishNum + "----------------------------------");

    if (g.options.tank.enabled) {
      if (g_sceneGroups.inner) {
        Log("--Draw GlobeInner----------------");
        DrawGroup(g_sceneGroups.inner, g.innerConst, innerPer);
      }
    }

    if (g_sceneGroups.seaweed) {
      Log("--Draw Seaweed----------------");
      DrawGroup(g_sceneGroups.seaweed, seaweedConst, seaweedPer);
    }

    // Draw Lasers
    if (g.globals.drawLasers) {
      Log("--Draw Lasers---------------------------------------");
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.disable(gl.CULL_FACE);
      gl.depthMask(false);

      laser.drawPrep(laserConst);
      var c = 0.5 + (frameCount % 2) + 0.5;
      laserConst.colorMult = [c * 1, c * 0.1, c * 0.1, c];
      for (var ff = 0; ff < g_fishTable.length; ++ff) {
        var fishInfo = g_fishTable[ff];
        var numFish = fishInfo.num[g.globals.fishSetting];
        var fishName = fishInfo.name;
        var scene = g_scenes[fishName];
        var center = [0, g_tankHeight, 0];
        if (scene && scene.loaded && !scene.bad) {
          var fish = scene.models[0];
          var mult = fish.extents.max[2] / fishInfo.constUniforms.fishLength;
          var waveLength = fishInfo.constUniforms.fishWaveLength;
          var bendAmount = fishInfo.constUniforms.fishBendAmount;
          for (var ii = 0; ii < numFish; ++ii) {
            if (fishInfo.lasers) {
              var data = fishInfo.fishData[ii];
              var time = data.time;
              var s = Math.sin(time + mult * waveLength);
              var scale = data.scale;
              var offset = mult * mult * s * bendAmount;
              var off = [offset, fishInfo.laserOff[1], fishInfo.laserOff[2]];

              scale = 1;
              fast.matrix4.mul(world,
                fast.matrix4.scaling(m4t1, [scale, scale, scale]),
                fast.matrix4.cameraLookAt(
                    m4t2, data.position, data.target, up));
              fast.matrix4.mul(
                  m4t2,
                  fast.matrix4.rotationY(
                    m4t3, s * fishInfo.laserRot),
                  fast.matrix4.translation(m4t1, off));
              fast.matrix4.mul(
                  world,
                  m4t2,
                  world);

              var laserDir = math.normalize([world[8], world[9], world[10]])
              var point1 = [
                  world[12],
                  world[13],
                  world[14]];
              var point2 = math.addVector(
                  point1, math.mulVectorScalar(laserDir, 1000));
              var intersection = raySphereIntersection(
                  point1, point2, center, g_tankRadius);
              if (intersection) {
                var len = math.length(math.subVector(intersection, point1)) *
                   g_laserLenFudge;
                fast.matrix4.mul(
                    world,
                    fast.matrix4.scaling(
                        m4t0,
                        [fishInfo.laserScale[0],
                         fishInfo.laserScale[1],
                         len]),
                    world);
                fast.matrix4.mul(worldViewProjection, world, viewProjection);
                laser.draw(laserPer);
                var surfaceNorm = math.normalize(intersection);
                var newDir = refract(
                    math.negativeVector(laserDir), surfaceNorm, g_laserEta);
                data.laser = {
                  position: intersection,
                  target: newDir ? math.addVector(intersection, newDir) :
                                   undefined
                };
              }
            }
          }
        }
      }

      gl.disable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.CULL_FACE);
      gl.depthMask(true);
    }

    if (g.options.museum.enabled) {
      if (g_sceneGroups.outside) {
        Log("--Draw outside----------------");
        DrawGroup(g_sceneGroups.outside, outsideConst, outsidePer);
      }
    }

    bubbleTimer -= elapsedTime * g.globals.speed;
    if (bubbleTimer < 0) {
      bubbleTimer = 2 + Math.random() * 8;
      var radius = Math.random() * 50;
      var angle = Math.random() * Math.PI * 2;
      fast.matrix4.translation(
          world,
          [Math.sin(angle) * radius,
           0,
           Math.cos(angle) * radius]);
      g_bubbleSets[bubbleIndex].trigger(world);
      ++bubbleIndex;
      bubbleIndex = bubbleIndex % g_numBubbleSets;
    }
    fast.matrix4.translation(world, [0, 0, 0]);
    if (g.options.bubbles.enabled) {
      particleSystem.draw(viewProjection, world, viewInverse);
    }

    gl.enable(gl.BLEND);
    gl.disable(gl.CULL_FACE);
    if (g.options.lightRays.enabled) {
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.depthMask(false);
      lightRay.drawPrep(lightRayConst);
      for (var ii = 0; ii < g_lightRayInfo.length; ++ii) {
        var info = g_lightRayInfo[ii];
        var lerp = info.timer / info.duration;
        var y = Math.max(70, Math.min(120, g_lightRayY + g.globals.eyeHeight));
        info.timer -= elapsedTime * g.globals.speed;
        if (info.timer < 0) {
          initLightRay(info);
        }
        fast.matrix4.mul(
            m4t1,
            fast.matrix4.rotationZ(m4t0, info.rot + lerp * g_lightRayRotLerp),
            fast.matrix4.translation(m4t2, [info.x, y, 0])
        );
        fast.matrix4.mul(world,
            fast.matrix4.scaling(m4t0, [10, -100, 10]),
            m4t1
        );
        // compute a view with no rotation
        fast.matrix4.translation(m4t1, [view[12], view[13], view[14]]);
        fast.matrix4.mul(m4t0, m4t1, projection);
        fast.matrix4.mul(worldViewProjection, world, m4t0);
        lightRayPer.colorMult[3] = Math.sin(lerp * Math.PI);
        lightRay.draw(lightRayPer);
      }
    }

    gl.depthMask(true);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendEquation(gl.FUNC_ADD);

    if (g.options.tank.enabled) {
      if (g_sceneGroups.outer) {
        Log("--Draw GlobeOuter----------------");
        DrawGroup(g_sceneGroups.outer, g.innerConst, innerPer);
      }
    }

    // Draw Lasers Outside
    if (g.drawLasers) {
      Log("--Draw Lasers Outside---------------------------------------");
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.disable(gl.CULL_FACE);
      gl.depthMask(false);

      laser.drawPrep(laserConst);
      for (var ff = 0; ff < g_fishTable.length; ++ff) {
        var fishInfo = g_fishTable[ff];
        var numFish = fishInfo.num[g.globals.fishSetting];
        var fishName = fishInfo.name;
        var scene = g_scenes[fishName];
        if (scene && scene.loaded && !scene.bad) {
          var fish = scene.models[0];
          for (var ii = 0; ii < numFish; ++ii) {
            if (fishInfo.lasers) {
              var data = fishInfo.fishData[ii];
              var laserInfo = data.laser;
              if (laserInfo.target) {
                fast.matrix4.mul(
                  world,
                  fast.matrix4.scaling(m4t1, [0.5, 0.5, 200]),
                  fast.matrix4.cameraLookAt(
                      m4t0,
                      laserInfo.position,
                      laserInfo.target,
                      up));
                fast.matrix4.mul(worldViewProjection, world, viewProjection);
                laser.draw(laserPer);
                //for (var jj = 0; jj < 3; ++jj) {
                //  fast.matrix4.mul(
                //    world,
                //    fast.matrix4.axisRotation(
                //        m4t0,
                //        math.normalize([
                //            Math.random() - 0.5,
                //            Math.random() - 0.5,
                //            Math.random() - 0.5]),
                //        Math.random() * Math.PI * 2),
                //    fast.matrix4.translation(m4t1, laserInfo.position));
                //  fast.matrix4.mul(
                //      worldViewProjection, world, viewProjection);
                //  laser.draw(laserPer);
                //}
              }
            }
          }
        }
      }

      gl.disable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.CULL_FACE);
      gl.depthMask(true);
    }

    // Set the alpha to 255.
    gl.colorMask(false, false, false, true);
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // turn off logging after 1 frame.
    g_logGLCalls = false;

    let result = g_fpsTimer.update();
    if (result.framerate > 0) {
      console.log("WebGL Aqua framerate:" + result.framerate + "fps" +
        ", program:"   + getUsedProgramCount() / result.frames +
        ", draw call:" + getDrawCallCount() / result.frames);
      resetDrawStatics();
    }

    // In game mode, we need to submit frame manually
    wxhelper.SubmitGLFrame(gl);

    if (!g_drawOnce) {
      g_requestId = wxhelper.GameLoopUtil.requestNextFrame(render);
    }
  }
  render();
  return true;
}

function Log(msg) {
  if (g_logGLCalls) {
    tdl.log(msg);
  }
};

function initUIStuff() {

  // Use View Settings Inside 1 (index 0)
  advanceViewSettings();

  function toggleOption(name, option) {
    var options = { };
    options[name] = {enabled:!option.enabled};
    setSettings({options:options});
    switch (option.name) {
    case 'normalMaps':
      setShaders();
      break;
    case 'reflection':
      setShaders();
      break;
    case 'tank':
      break;
    case 'fog':
      setShaders();
      break;
    }
  }

  for (var name in g.options) {
    var option = g.options[name];
    option.name = name;

    function toggle(name, option) {
      return function() {
        toggleOption(name, option);
        return false;
      };
    }

    option.toggle = toggle(name, option);
  }
}

function start() {
  window.SetupEnv(g_ui);
  window.g_syncManager = new tdl.sync.SyncManager(g, updateUI);

  if (!g.net.fovFudge) {
    g.net.fovFudge = 1;
  }

  main();
}

if (wxhelper.IsWxGameEnv()) {
  start();
}
start();