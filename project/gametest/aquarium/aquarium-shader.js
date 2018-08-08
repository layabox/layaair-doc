window.__texVertexShader =
"attribute vec4 position;\n" +
"attribute vec2 texCoord;\n" +
"varying vec2 v_texCoord;\n" +
"uniform mat4 worldViewProjection;\n" +
"void main() {\n" +
"  v_texCoord = texCoord;\n"+
"  gl_Position = (worldViewProjection * position);\n" +
"}";

window.__texFragmentShader =
"precision mediump float;\n" +
"\n" +
"varying vec2 v_texCoord;\n" +
"uniform vec4 colorMult;\n" +
"uniform sampler2D colorMap;\n" +
"void main() {\n" +
"  gl_FragColor = texture2D(colorMap, v_texCoord) * colorMult;\n" +
"}";

window.__laserVertexShader =
"attribute vec4 position;\n" +
"attribute vec2 texCoord;\n" +
"varying vec2 v_texCoord;\n" +
"uniform mat4 worldViewProjection;\n" +
"void main() {\n" +
"  v_texCoord = texCoord;\n" +
"  gl_Position = (worldViewProjection * position);\n" +
"}";

window.__laserFragmentShader =
"precision mediump float;\n" +
"\n" +
"varying vec2 v_texCoord;\n" +
"uniform vec4 colorMult;\n" +
"uniform sampler2D colorMap;\n" +
"void main() {\n" +
"  gl_FragColor = texture2D(colorMap, v_texCoord) * colorMult;\n" +
"}";

window.__fishVertexShader =
"uniform vec3 lightWorldPos;\n" +
"uniform mat4 viewInverse;\n" +
"uniform mat4 viewProjection;\n" +
"uniform vec3 worldPosition;\n" +
"uniform vec3 nextPosition;\n" +
"uniform float scale;\n" +
"uniform float time;\n" +
"uniform float fishLength;\n" +
"uniform float fishWaveLength;\n" +
"uniform float fishBendAmount;\n" +
"attribute vec4 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 texCoord;\n" +
"attribute vec3 tangent;  // #normalMap\n" +
"attribute vec3 binormal;  // #normalMap\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"void main() {\n" +
"  vec3 vz = normalize(worldPosition - nextPosition);\n" +
"  vec3 vx = normalize(cross(vec3(0,1,0), vz));\n" +
"  vec3 vy = cross(vz, vx);\n" +
"  mat4 orientMat = mat4(\n" +
"    vec4(vx, 0),\n" +
"    vec4(vy, 0),\n" +
"    vec4(vz, 0),\n" +
"    vec4(worldPosition, 1));\n" +
"  mat4 scaleMat = mat4(\n" +
"    vec4(scale, 0, 0, 0),\n" +
"    vec4(0, scale, 0, 0),\n" +
"    vec4(0, 0, scale, 0),\n" +
"    vec4(0, 0, 0, 1));\n" +
"  mat4 world = orientMat * scaleMat;\n" +
"  mat4 worldViewProjection = viewProjection * world;\n" +
"  mat4 worldInverseTranspose = world;\n" +
"\n" +
"  v_texCoord = texCoord;\n" +
"  // NOTE:If you change this you need to change the laser code to match!\n" +
"  float mult = position.z > 0.0 ?\n" +
"      (position.z / fishLength) :\n" +
"      (-position.z / fishLength * 2.0);\n" +
"  float s = sin(time + mult * fishWaveLength);\n" +
"  float a = sign(s);\n" +
"  float offset = pow(mult, 2.0) * s * fishBendAmount;\n" +
"  v_position = (\n" +
"      worldViewProjection *\n" +
"      (position +\n" +
"       vec4(offset, 0, 0, 0)));\n" +
"  v_normal = (worldInverseTranspose * vec4(normal, 0)).xyz;\n" +
"  v_surfaceToLight = lightWorldPos - (world * position).xyz;\n" +
"  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;\n" +
"  v_binormal = (worldInverseTranspose * vec4(binormal, 0)).xyz;  // #normalMap\n" +
"  v_tangent = (worldInverseTranspose * vec4(tangent, 0)).xyz;  // #normalMap\n" +
"  gl_Position = v_position;\n" +
"}";

window.__fishInstanceVertexShader =
"uniform vec3 lightWorldPos;\n" +
"uniform mat4 viewInverse;\n" +
"uniform mat4 viewProjection;\n" +
"uniform float fishLength;\n" +
"uniform float fishWaveLength;\n" +
"uniform float fishBendAmount;\n" +
"attribute vec3 aWorldPosition;\n" +
"attribute vec3 aNextPosition;\n" +
"attribute float aScale;\n" +
"attribute float aTime;\n" +
"attribute vec4 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 texCoord;\n" +
"attribute vec3 tangent;  // #normalMap\n" +
"attribute vec3 binormal;  // #normalMap\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"void main() {\n" +
"  vec3 vz = normalize(aWorldPosition - aNextPosition);\n" +
"  vec3 vx = normalize(cross(vec3(0,1,0), vz));\n" +
"  vec3 vy = cross(vz, vx);\n" +
"  mat4 orientMat = mat4(\n" +
"    vec4(vx, 0),\n" +
"    vec4(vy, 0),\n" +
"    vec4(vz, 0),\n" +
"    vec4(aWorldPosition, 1));\n" +
"  mat4 scaleMat = mat4(\n" +
"    vec4(aScale, 0, 0, 0),\n" +
"    vec4(0, aScale, 0, 0),\n" +
"    vec4(0, 0, aScale, 0),\n" +
"    vec4(0, 0, 0, 1));\n" +
"  mat4 world = orientMat * scaleMat;\n" +
"  mat4 worldViewProjection = viewProjection * world;\n" +
"  mat4 worldInverseTranspose = world;\n" +
"\n" +
"  v_texCoord = texCoord;\n" +
"  // NOTE:If you change this you need to change the laser code to match!\n" +
"  float mult = position.z > 0.0 ?\n" +
"      (position.z / fishLength) :\n" +
"      (-position.z / fishLength * 2.0);\n" +
"  float s = sin(aTime + mult * fishWaveLength);\n" +
"  float a = sign(s);\n" +
"  float offset = pow(mult, 2.0) * s * fishBendAmount;\n" +
"  v_position = (\n" +
"      worldViewProjection *\n" +
"      (position +\n" +
"       vec4(offset, 0, 0, 0)));\n" +
"  v_normal = (worldInverseTranspose * vec4(normal, 0)).xyz;\n" +
"  v_surfaceToLight = lightWorldPos - (world * position).xyz;\n" +
"  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;\n" +
"  v_binormal = (worldInverseTranspose * vec4(binormal, 0)).xyz;  // #normalMap\n" +
"  v_tangent = (worldInverseTranspose * vec4(tangent, 0)).xyz;  // #normalMap\n" +
"  gl_Position = v_position;\n" +
"}";

window.__fishNormalMapFragmentShader =
"precision mediump float;\n" +
"uniform vec4 lightColor;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"\n" +
"uniform vec4 ambient;\n" +
"uniform sampler2D diffuse;\n" +
"uniform vec4 specular;\n" +
"uniform sampler2D normalMap;  // #normalMap\n" +
"uniform float shininess;\n" +
"uniform float specularFactor;\n" +
"// #fogUniforms\n" +
"\n" +
"vec4 lit(float l ,float h, float m) {\n" +
"  return vec4(1.0,\n" +
"              max(l, 0.0),\n" +
"              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n" +
"              1.0);\n" +
"}\n" +
"void main() {\n" +
"  vec4 diffuseColor = texture2D(diffuse, v_texCoord);\n" +
"  mat3 tangentToWorld = mat3(v_tangent,  // #normalMap\n" +
"                             v_binormal,  // #normalMap\n" +
"                             v_normal);  // #normalMap\n" +
"  vec4 normalSpec = texture2D(normalMap, v_texCoord.xy);  // #normalMap\n" +
"  vec4 normalSpec = vec4(0,0,0,0);  // #noNormalMap\n" +
"  vec3 tangentNormal = normalSpec.xyz - vec3(0.5, 0.5, 0.5);  // #normalMap\n" +
"  tangentNormal = normalize(tangentNormal + vec3(0, 0, 2));  // #normalMap\n" +
"  vec3 normal = (tangentToWorld * tangentNormal);  // #normalMap\n" +
"  normal = normalize(normal);  // #normalMap\n" +
"  vec3 normal = normalize(v_normal);   // #noNormalMap\n" +
"  vec3 surfaceToLight = normalize(v_surfaceToLight);\n" +
"  vec3 surfaceToView = normalize(v_surfaceToView);\n" +
"  vec3 halfVector = normalize(surfaceToLight + surfaceToView);\n" +
"  vec4 litR = lit(dot(normal, surfaceToLight),\n" +
"                    dot(normal, halfVector), shininess);\n" +
"  vec4 outColor = vec4(\n" +
"    (lightColor * (diffuseColor * litR.y + diffuseColor * ambient +\n" +
"                  specular * litR.z * specularFactor * normalSpec.a)).rgb,\n" +
"      diffuseColor.a);\n" +
"  // #fogCode\n" +
"  gl_FragColor = outColor;\n" +
"}";

window.__fishReflectionFragmentShader =
"precision mediump float;\n" +
"uniform vec4 lightColor;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"\n" +
"uniform vec4 ambient;\n" +
"uniform sampler2D diffuse;\n" +
"uniform vec4 specular;\n" +
"uniform sampler2D normalMap;\n" +
"uniform sampler2D reflectionMap; // #reflection\n" +
"uniform samplerCube skybox; // #reflecton\n" +
"uniform float shininess;\n" +
"uniform float specularFactor;\n" +
"// #fogUniforms\n" +
"\n" +
"vec4 lit(float l ,float h, float m) {\n" +
"  return vec4(1.0,\n" +
"              max(l, 0.0),\n" +
"              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n" +
"              1.0);\n" +
"}\n" +
"void main() {\n" +
"  vec4 diffuseColor = texture2D(diffuse, v_texCoord);\n" +
"  mat3 tangentToWorld = mat3(v_tangent,  // #normalMap\n" +
"                             v_binormal,  // #normalMap\n" +
"                             v_normal);  // #normalMap\n" +
"  vec4 normalSpec = texture2D(normalMap, v_texCoord.xy);  // #normalMap\n" +
"  vec4 normalSpec = vec4(0,0,0,0);  // #noNormalMap\n" +
"  vec4 reflection = texture2D(reflectionMap, v_texCoord.xy); // #reflection\n" +
"  vec4 reflection = vec4(0,0,0,0);  // #noReflection\n" +
"  vec3 tangentNormal = normalSpec.xyz - vec3(0.5, 0.5, 0.5);  // #normalMap\n" +
"  vec3 normal = (tangentToWorld * tangentNormal);  // #normalMap\n" +
"  normal = normalize(normal);  // #normalMap\n" +
"  vec3 normal = normalize(v_normal); // #noNormalMap\n" +
"  vec3 surfaceToLight = normalize(v_surfaceToLight);\n" +
"  vec3 surfaceToView = normalize(v_surfaceToView);\n" +
"  vec4 skyColor = textureCube(skybox, -reflect(surfaceToView, normal));  // #reflection\n\n" +
"  vec4 skyColor = vec4(0.5,0.5,1,1);  // #noReflection\n" +
"\n" +
"  vec3 halfVector = normalize(surfaceToLight + surfaceToView);\n" +
"  vec4 litR = lit(dot(normal, surfaceToLight),\n" +
"                    dot(normal, halfVector), shininess);\n" +
"  vec4 outColor = vec4(mix(\n" +
"      skyColor,\n" +
"      lightColor * (diffuseColor * litR.y + diffuseColor * ambient +\n" +
"                    specular * litR.z * specularFactor * normalSpec.a),\n" +
"      1.0 - reflection.r).rgb,\n" +
"      diffuseColor.a);\n" +
"  // #fogCode\n" +
"  gl_FragColor = outColor;\n" +
"}";

window.__seaweedVertexShader =
"uniform mat4 world;\n" +
"uniform mat4 viewProjection;\n" +
"uniform vec3 lightWorldPos;\n" +
"uniform mat4 viewInverse;\n" +
"uniform mat4 worldInverseTranspose;\n" +
"uniform float time;\n" +
"attribute vec4 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 texCoord;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"void main() {\n" +
"  vec3 toCamera = normalize(viewInverse[3].xyz - world[3].xyz);\n" +
"  vec3 yAxis = vec3(0, 1, 0);\n" +
"  vec3 xAxis = cross(yAxis, toCamera);\n" +
"  vec3 zAxis = cross(xAxis, yAxis);\n" +
"\n" +
"  mat4 newWorld = mat4(\n" +
"      vec4(xAxis, 0),\n" +
"      vec4(yAxis, 0),\n" +
"      vec4(xAxis, 0),\n" +
"      world[3]);\n" +
"\n" +
"  v_texCoord = texCoord;\n" +
"  v_position = position + vec4(\n" +
"      sin(time * 0.5) * pow(position.y * 0.07, 2.0) * 1.0,\n" +
"      -4,  // TODO(gman): remove this hack\n" +
"      0,\n" +
"      0);\n" +
"  v_position = (viewProjection * newWorld) * v_position;\n" +
"  v_normal = (newWorld * vec4(normal, 0)).xyz;\n" +
"  v_surfaceToLight = lightWorldPos - (world * position).xyz;\n" +
"  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;\n" +
"  gl_Position = v_position;\n" +
"}";

window.__seaweedFragmentShader =
"precision mediump float;\n" +
"uniform vec4 lightColor;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"\n" +
"uniform vec4 ambient;\n" +
"uniform sampler2D diffuse;\n" +
"uniform vec4 specular;\n" +
"uniform float shininess;\n" +
"uniform float specularFactor;\n" +
"// #fogUniforms\n" +
"\n" +
"vec4 lit(float l ,float h, float m) {\n" +
"  return vec4(1.0,\n" +
"              max(l, 0.0),\n" +
"              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n" +
"              1.0);\n" +
"}\n" +
"void main() {\n" +
"  vec4 diffuseColor = texture2D(diffuse, v_texCoord);\n" +
"  if (diffuseColor.a < 0.3) {\n" +
"    discard;\n" +
"  }\n" +
"  vec3 normal = normalize(v_normal);\n" +
"  vec3 surfaceToLight = normalize(v_surfaceToLight);\n" +
"  vec3 surfaceToView = normalize(v_surfaceToView);\n" +
"  vec3 halfVector = normalize(surfaceToLight + surfaceToView);\n" +
"  vec4 litR = lit(dot(normal, surfaceToLight),\n" +
"                    dot(normal, halfVector), shininess);\n" +
"  vec4 outColor = vec4((\n" +
"  lightColor * (diffuseColor * litR.y + diffuseColor * ambient +\n" +
"                specular * litR.z * specularFactor)).rgb,\n" +
"      diffuseColor.a);\n" +
"  // #fogCode\n" +
"  gl_FragColor = outColor;\n" +
"}";


window.__diffuseVertexShader =
"uniform mat4 worldViewProjection;\n" +
"uniform vec3 lightWorldPos;\n" +
"uniform mat4 world;\n" +
"uniform mat4 viewInverse;\n" +
"uniform mat4 worldInverseTranspose;\n" +
"attribute vec4 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 texCoord;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"void main() {\n" +
"  v_texCoord = texCoord;\n" +
"  v_position = (worldViewProjection * position);\n" +
"  v_normal = (worldInverseTranspose * vec4(normal, 0)).xyz;\n" +
"  v_surfaceToLight = lightWorldPos - (world * position).xyz;\n" +
"  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;\n" +
"  gl_Position = v_position;\n" +
"}";

window.__diffuseFragmentShader =
"precision mediump float;\n" +
"uniform vec4 lightColor;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"\n" +
"uniform vec4 ambient;\n" +
"uniform sampler2D diffuse;\n" +
"uniform vec4 specular;\n" +
"uniform float shininess;\n" +
"uniform float specularFactor;\n" +
"// #fogUniforms\n" +
"\n" +
"vec4 lit(float l ,float h, float m) {\n" +
"  return vec4(1.0,\n" +
"              max(l, 0.0),\n" +
"              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n" +
"              1.0);\n" +
"}\n" +
"void main() {\n" +
"  vec4 diffuseColor = texture2D(diffuse, v_texCoord);\n" +
"  vec3 normal = normalize(v_normal);\n" +
"  vec3 surfaceToLight = normalize(v_surfaceToLight);\n" +
"  vec3 surfaceToView = normalize(v_surfaceToView);\n" +
"  vec3 halfVector = normalize(surfaceToLight + surfaceToView);\n" +
"  vec4 litR = lit(dot(normal, surfaceToLight),\n" +
"                    dot(normal, halfVector), shininess);\n" +
"  vec4 outColor = vec4((\n" +
"  lightColor * (diffuseColor * litR.y + diffuseColor * ambient +\n" +
"                specular * litR.z * specularFactor)).rgb,\n" +
"      diffuseColor.a);\n" +
"  // #fogCode\n" +
"  gl_FragColor = outColor;\n" +
"}";

window.__normalMapVertexShader =
"uniform mat4 worldViewProjection;\n" +
"uniform vec3 lightWorldPos;\n" +
"uniform mat4 world;\n" +
"uniform mat4 viewInverse;\n" +
"uniform mat4 worldInverseTranspose;\n" +
"attribute vec4 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 texCoord;\n" +
"attribute vec3 tangent;  // #normalMap\n" +
"attribute vec3 binormal;  // #normalMap\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"void main() {\n" +
"  v_texCoord = texCoord;\n" +
"  v_position = (worldViewProjection * position);\n" +
"  v_normal = (worldInverseTranspose * vec4(normal, 0)).xyz;\n" +
"  v_surfaceToLight = lightWorldPos - (world * position).xyz;\n" +
"  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;\n" +
"  v_binormal = (worldInverseTranspose * vec4(binormal, 0)).xyz;  // #normalMap\n" +
"  v_tangent = (worldInverseTranspose * vec4(tangent, 0)).xyz;  // #normalMap\n" +
"  gl_Position = v_position;\n" +
"}";

window.__normalMapFragmentShader =
"precision mediump float;\n" +
"uniform vec4 lightColor;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"\n" +
"uniform vec4 ambient;\n" +
"uniform sampler2D diffuse;\n" +
"uniform vec4 specular;\n" +
"uniform sampler2D normalMap;  // #normalMap\n" +
"uniform float shininess;\n" +
"uniform float specularFactor;\n" +
"// #fogUniforms\n" +
"\n" +
"vec4 lit(float l ,float h, float m) {\n" +
"  return vec4(1.0,\n" +
"              max(l, 0.0),\n" +
"              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n" +
"              1.0);\n" +
"}\n" +
"void main() {\n" +
"  vec4 diffuseColor = texture2D(diffuse, v_texCoord);\n" +
"  mat3 tangentToWorld = mat3(v_tangent,  // #normalMap\n" +
"                             v_binormal,  // #normalMap\n" +
"                             v_normal);  // #normalMap\n" +
"  vec4 normalSpec = texture2D(normalMap, v_texCoord.xy);  // #normalMap\n" +
"  vec4 normalSpec = vec4(0,0,0,0);  // #noNormalMap\n" +
"  vec3 tangentNormal = normalSpec.xyz -  // #normalMap\n" +
"                                 vec3(0.5, 0.5, 0.5);  // #normalMap\n" +
"  vec3 normal = (tangentToWorld * tangentNormal);  // #normalMap\n" +
"  normal = normalize(normal);  // #normalMap\n" +
"  vec3 normal = normalize(v_normal);   // #noNormalMap\n" +
"  vec3 surfaceToLight = normalize(v_surfaceToLight);\n" +
"  vec3 surfaceToView = normalize(v_surfaceToView);\n" +
"  vec3 halfVector = normalize(surfaceToLight + surfaceToView);\n" +
"  vec4 litR = lit(dot(normal, surfaceToLight),\n" +
"                    dot(normal, halfVector), shininess);\n" +
"  vec4 outColor = vec4(\n" +
"     (lightColor * (diffuseColor * litR.y + diffuseColor * ambient +\n" +
"                    specular * litR.z * specularFactor * normalSpec.a)).rgb,\n" +
"      diffuseColor.a);\n" +
"  // #fogCode\n" +
"  gl_FragColor = outColor;\n" +
"}";

window.__reflectionMapVertexShader =
"uniform mat4 worldViewProjection;\n" +
"uniform vec3 lightWorldPos;\n" +
"uniform mat4 world;\n" +
"uniform mat4 viewInverse;\n" +
"uniform mat4 worldInverseTranspose;\n" +
"attribute vec4 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 texCoord;\n" +
"attribute vec3 tangent;\n" +
"attribute vec3 binormal;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;\n" +
"varying vec3 v_binormal;\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"void main() {\n" +
"  v_texCoord = texCoord;\n" +
"  v_position = (worldViewProjection * position);\n" +
"  v_normal = (worldInverseTranspose * vec4(normal, 0)).xyz;\n" +
"  v_surfaceToLight = lightWorldPos - (world * position).xyz;\n" +
"  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;\n" +
"  v_binormal = (worldInverseTranspose * vec4(binormal, 0)).xyz;\n" +
"  v_tangent = (worldInverseTranspose * vec4(tangent, 0)).xyz;\n" +
"  gl_Position = v_position;\n" +
"}";

window.__reflectionMapFragmentShader =
"precision mediump float;\n" +
"uniform vec4 lightColor;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;\n" +
"varying vec3 v_binormal;\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"\n" +
"uniform vec4 ambient;\n" +
"uniform sampler2D diffuse;\n" +
"uniform vec4 specular;\n" +
"uniform sampler2D normalMap;\n" +
"uniform sampler2D reflectionMap;\n" +
"uniform samplerCube skybox;\n" +
"uniform float shininess;\n" +
"uniform float specularFactor;\n" +
"// #fogUniforms\n" +
"\n" +
"vec4 lit(float l ,float h, float m) {\n" +
"  return vec4(1.0,\n" +
"              max(l, 0.0),\n" +
"              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n" +
"              1.0);\n" +
"}\n" +
"void main() {\n" +
"  vec4 diffuseColor = texture2D(diffuse, v_texCoord);\n" +
"  mat3 tangentToWorld = mat3(v_tangent,\n" +
"                             v_binormal,\n" +
"                             v_normal);\n" +
"  vec4 normalSpec = texture2D(normalMap, v_texCoord.xy);\n" +
"  vec4 reflection = texture2D(reflectionMap, v_texCoord.xy);\n" +
"  vec3 tangentNormal = normalSpec.xyz - vec3(0.5, 0.5, 0.5);\n" +
"  vec3 normal = (tangentToWorld * tangentNormal);\n" +
"  normal = normalize(normal);\n" +
"  vec3 surfaceToLight = normalize(v_surfaceToLight);\n" +
"  vec3 surfaceToView = normalize(v_surfaceToView);\n" +
"  vec4 skyColor = textureCube(skybox, -reflect(surfaceToView, normal));\n" +
"  vec3 halfVector = normalize(surfaceToLight + surfaceToView);\n" +
"  vec4 litR = lit(dot(normal, surfaceToLight),\n" +
"                    dot(normal, halfVector), shininess);\n" +
"  vec4 outColor = vec4(mix(\n" +
"      skyColor,\n" +
"      lightColor * (diffuseColor * litR.y + diffuseColor * ambient +\n" +
"                    specular * litR.z * specularFactor * normalSpec.a),\n" +
"      1.0 - reflection.r).rgb,\n" +
"      diffuseColor.a);\n" +
"  // #fogCode\n" +
"  gl_FragColor = outColor;\n" +
"}";

window.__innerRefractionMapVertexShader =
"uniform mat4 worldViewProjection;\n" +
"uniform vec3 lightWorldPos;\n" +
"uniform mat4 world;\n" +
"uniform mat4 viewInverse;\n" +
"uniform mat4 worldInverseTranspose;\n" +
"attribute vec4 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 texCoord;\n" +
"attribute vec3 tangent;\n" +
"attribute vec3 binormal;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"void main() {\n" +
"  v_texCoord = texCoord;\n" +
"  v_position = (worldViewProjection * position);\n" +
"  v_normal = (worldInverseTranspose * vec4(normal, 0)).xyz;\n" +
"  v_surfaceToLight = lightWorldPos - (world * position).xyz;\n" +
"  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;\n" +
"  v_binormal = (worldInverseTranspose * vec4(binormal, 0)).xyz;  // #normalMap\n" +
"  v_tangent = (worldInverseTranspose * vec4(tangent, 0)).xyz;  // #normalMap\n" +
"  gl_Position = v_position;\n" +
"}";

window.__innerRefractionMapFragmentShader =
"precision mediump float;\n" +
"uniform vec4 lightColor;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"\n" +
"uniform sampler2D diffuse;\n" +
"uniform vec4 specular;\n" +
"uniform sampler2D normalMap;  // #normalMap\n" +
"uniform sampler2D reflectionMap;\n" +
"uniform samplerCube skybox;\n" +
"uniform float shininess;\n" +
"uniform float specularFactor;\n" +
"uniform float refractionFudge;\n" +
"uniform float eta;\n" +
"uniform float tankColorFudge;\n" +
"// #fogUniforms\n" +
"\n" +
"vec4 lit(float l ,float h, float m) {\n" +
"  return vec4(1.0,\n" +
"              max(l, 0.0),\n" +
"              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n" +
"              1.0);\n" +
"}\n" +
"void main() {\n" +
"  vec4 diffuseColor = texture2D(diffuse, v_texCoord) +\n" +
"      vec4(tankColorFudge, tankColorFudge, tankColorFudge, 1);\n" +
"  mat3 tangentToWorld = mat3(v_tangent,  // #normalMap\n" +
"                             v_binormal,  // #normalMap\n" +
"                             v_normal);  // #normalMap\n" +
"  vec4 normalSpec = texture2D(normalMap, v_texCoord.xy);  // #normalMap\n" +
"  vec4 normalSpec = vec4(0,0,0,0);  // #noNormalMap\n" +
"  vec4 refraction = texture2D(reflectionMap, v_texCoord.xy);\n" +
"  vec3 tangentNormal = normalSpec.xyz - vec3(0.5, 0.5, 0.5);  // #normalMap\n" +
"  tangentNormal = normalize(tangentNormal + vec3(0,0,refractionFudge));  // #normalMap\n" +
"  vec3 normal = (tangentToWorld * tangentNormal);  // #normalMap\n" +
"  normal = normalize(normal);  // #normalMap\n" +
"  vec3 normal = normalize(v_normal);   // #noNormalMap\n" +
"\n" +
"  vec3 surfaceToLight = normalize(v_surfaceToLight);\n" +
"  vec3 surfaceToView = normalize(v_surfaceToView);\n" +
"\n" +
"  vec3 refractionVec = refract(surfaceToView, normal, eta);\n" +
"\n" +
"  vec4 skyColor = textureCube(skybox, refractionVec);\n" +
"\n" +
"//  vec4 bumpSkyColor = textureCube(skybox, refractionVec);\n" +
"//  vec4 nonBumpSkyColor = textureCube(\n" +
"//      skybox,\n" +
"//      refract(surfaceToView, normalize(v_normal), eta));\n" +
"//  vec4 skyColor = mix(nonBumpSkyColor, bumpSkyColor, normalSpec.a);\n" +
"  vec4 outColor = vec4(\n" +
"      mix(skyColor * diffuseColor, diffuseColor, refraction.r).rgb,\n" +
"      diffuseColor.a);\n" +
"  // #fogCode\n" +
"  gl_FragColor = outColor;\n" +
"}";

window.__outerRefractionMapVertexShader =
"uniform mat4 worldViewProjection;\n" +
"uniform vec3 lightWorldPos;\n" +
"uniform mat4 world;\n" +
"uniform mat4 viewInverse;\n" +
"uniform mat4 worldInverseTranspose;\n" +
"attribute vec4 position;\n" +
"attribute vec3 normal;\n" +
"attribute vec2 texCoord;\n" +
"attribute vec3 tangent;\n" +
"attribute vec3 binormal;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"void main() {\n" +
"  v_texCoord = texCoord;\n" +
"  v_position = (worldViewProjection * position);\n" +
"  v_normal = (worldInverseTranspose * vec4(normal, 0)).xyz;\n" +
"  v_surfaceToLight = lightWorldPos - (world * position).xyz;\n" +
"  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;\n" +
"  v_binormal = (worldInverseTranspose * vec4(binormal, 0)).xyz;  // #normalMap\n" +
"  v_tangent = (worldInverseTranspose * vec4(tangent, 0)).xyz;  // #normalMap\n" +
"  gl_Position = v_position;\n" +
"}";

window.__outerRefractionMapFragmentShader =
"precision mediump float;\n" +
"uniform vec4 lightColor;\n" +
"varying vec4 v_position;\n" +
"varying vec2 v_texCoord;\n" +
"varying vec3 v_tangent;  // #normalMap\n" +
"varying vec3 v_binormal;  // #normalMap\n" +
"varying vec3 v_normal;\n" +
"varying vec3 v_surfaceToLight;\n" +
"varying vec3 v_surfaceToView;\n" +
"\n" +
"uniform sampler2D diffuse;\n" +
"uniform vec4 specular;\n" +
"uniform sampler2D normalMap;  // #normalMap\n" +
"uniform sampler2D reflectionMap;\n" +
"uniform samplerCube skybox;\n" +
"uniform float shininess;\n" +
"uniform float specularFactor;\n" +
"\n" +
"vec4 lit(float l ,float h, float m) {\n" +
"  return vec4(1.0,\n" +
"              max(l, 0.0),\n" +
"              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n" +
"              1.0);\n" +
"}\n" +
"void main() {\n" +
"  vec4 diffuseColor = texture2D(diffuse, v_texCoord);\n" +
"  mat3 tangentToWorld = mat3(v_tangent,  // #normalMap\n" +
"                             v_binormal,  // #normalMap\n" +
"                             v_normal);  // #normalMap\n" +
"  vec4 normalSpec = texture2D(normalMap, v_texCoord.xy);  // #normalMap\n" +
"  vec4 normalSpec = vec4(0,0,0,0);  // #noNormalMap\n" +
"  vec4 reflection = texture2D(reflectionMap, v_texCoord.xy);\n" +
"  vec3 tangentNormal = normalSpec.xyz - vec3(0.5, 0.5, 0.5);  // #normalMap\n" +
"//  tangentNormal = normalize(tangentNormal + vec3(0,0,refractionFudge));\n" +
"  vec3 normal = (tangentToWorld * tangentNormal);  // #normalMap\n" +
"  normal = normalize(normal);  // #normalMap\n" +
"  vec3 normal = normalize(v_normal);   // #noNormalMap\n" +
"\n" +
"  vec3 surfaceToLight = normalize(v_surfaceToLight);\n" +
"  vec3 surfaceToView = normalize(v_surfaceToView);\n" +
"\n" +
"  vec4 skyColor = textureCube(skybox, -reflect(surfaceToView, normal));\n" +
"  float fudgeAmount = 1.1;\n" +
"  vec3 fudge = skyColor.rgb * vec3(fudgeAmount, fudgeAmount, fudgeAmount);\n" +
"  float bright = min(1.0, fudge.r * fudge.g * fudge.b);\n" +
"  vec4 reflectColor =\n" +
"      mix(vec4(skyColor.rgb, bright),\n" +
"          diffuseColor,\n" +
"          (1.0 - reflection.r));\n" +
"  float r = abs(dot(surfaceToView, normal));\n" +
"  gl_FragColor = vec4(mix(\n" +
"      skyColor,\n" +
"      reflectColor,\n" +
"      ((r + 0.3) * (reflection.r))).rgb, 1.0 - r);\n" +
"}";

window.__refractSkyboxVertexShader =
"attribute vec4 position;" +
"varying vec4 v_position;" +
"" +
"void main() {" +
"  v_position = position;" +
"  gl_Position = position;" +
"}";

window.__skyboxVertexShader =
"attribute vec4 position;" +
"varying vec4 v_position;" +
"void main() {" +
"  v_position = position;" +
"  gl_Position = position;" +
"}";

window.__skyboxFragmentShader =
"precision mediump float;" +
"uniform samplerCube skybox;" +
"uniform mat4 viewDirectionProjectionInverse;" +
"varying vec4 v_position;" +
"void main() {" +
"  vec4 t = viewDirectionProjectionInverse * v_position;" +
"  gl_FragColor = textureCube(" +
"      skybox," +
"      normalize(t.xyz));" +
"}";