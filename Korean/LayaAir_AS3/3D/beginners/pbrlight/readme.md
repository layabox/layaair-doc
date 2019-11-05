##소개하다
PBR 은 물리에 기반한 빛이다.기본 사상은 모든 빛으로 계산된 계산이 완전히 통일된 물리에 맞는 방법에 따라 완성되며, 즉 샤더를 사용하여 미술을 완성하기를 희망한다.기본적으로 재질이 만들어진 후 어떤 환경에도 재질과 수정 변수가 필요 없이 환경과 자연을 융합할 수 있다.미술은 수정할 수 있는 소재 인자가 물리적 의미가 있는 소재 자체 색상, 거칠고 메탈.
그래서 PBR 에 필요한 물건은 포함:
1. 환경 정보.pbr 소재에 광샷 정보를 제공합니다.여기 hdr 하나 써요.[全景图](http://localhost/LayaAir2_Auto/panorama.md)설명
2. 소재.소재는 Substancepainter에서 완성 후 UE4 로 내보내는 형식을 제안합니다.
##Laya3D 가 이루어진 PBR 의 제한
이것은 아직 테스트판일 뿐이기 때문에 아래와 같은 제한이 있습니다:
1. 동적 광원을 지원하지 않는다.앞으로 동적점, 면광원을 지지해야 한다.
2. 자발광이 아직 이뤄지지 않았다. (이게 쉽지만 새로운 통로가 필요하다)
3. 현재 한 장면은 한 환경 빛으로 비춰진다.앞으로 여러 개로 만들어야 한다.
4. 미리 처리 속도와 WebGL 의 기능 제한으로 현재 환경 스티커 크기는 512x256에 필수

##도구 의존
pbrtools 필요합니다.설치 방법:

```bash

npm install -g pbrtools
```

컴파일된 c 모듈을 사용했기 때문에 현재 윈도ws 버전만 지원하고 electron 환경에서 실행할 수 없습니다.나중에 필요하면 다른 버전을 제공할 수 있습니다.

##PBR 소재를 어떻게 만들어요?
1. 환경 스티커 만들기.
이것은 무료 전경도를 다운로드할 수 있다. 자신이 카메라와 소프트웨어를 통해 전경도를 만들 수 있다. 3dsmax, 유닛에서 파노라마 사진을 선보이는 방법으로 얻을 수 있다.형식은 hdr 가 가장 좋다. 이렇게 하면 더욱 광범위한 광조 정보를 보존할 수 있다.
2. 환경 스티커를 처리하고 조잡한 반사 데이터와 diffuse 데이터를 생성한다.
환경 스티커 크기는 반드시 512x256, 격식은 png, tga, 혹은 hdr, 전경도를 사용해야 하며, cubemap 을 사용할 수 없습니다.
명령 pbrtools 를 통해 환경 스티커 처리:

```bash

    pbrtools handleenvmap img
```
img 은 처리할 전경 그림입니다.이 명령은 img 의 디렉토리 아래에서 미리 처리된 그림 (env.mipmaps) 을 생성할 것입니다. 하늘공의 스티커에 쓰이는 env.png, jsong 파일과 함께 jsong 파일을 소개합니다.

```json

{
    "skytex":"env.png",
    "prefiltedEnv":"env.mipmaps",
    "IrradianceMat":[
        0.28129690885543823,0,0,0,-0.3282267153263092,-0.1073296070098877,0,0,-0.29809144139289856,0.13647188246250153,-0.17396731674671173,0,-0.5436494946479797,0.18786616623401642,0.2717423141002655,0.5554966926574707,0.2510770261287689,0,0,0,-0.295642226934433,-0.08785344660282135,0,0,-0.2755483090877533,0.12092982232570648,-0.16322359442710876,0,-0.5187899470329285,0.1655164659023285,0.3213203251361847,0.5639563798904419,0.17064285278320312,0,0,0,-0.22071118652820587,-0.04934860020875931,0,0,-0.21280556917190552,0.08689119666814804,-0.12129425257444382,0,-0.40946751832962036,0.11174142360687256,0.36054936051368713,0.5101194381713867
    ],
    "sunpos":[0,0,0],
    "ev":0.0
}
```

*skytex*하늘공을 주는 스티커입니다.
*prefilterdEnv * 예비 처리의 다른 거칠고 굵은 반사 정보입니다.
*Irradianceat * difuse 인자가 파라다이스를 실현하는 diffuse 빛으로 비추고 있습니다.
*ev*은 노출 수치, -3~3, 비슷한 카메라 의 ev 인자: 0 변수, -1 은 반, 1 이 두 배.

사용 실례:
(현재 SkyDome 류만 PBR 환경 정보를 다운로드할 수 있습니다.)

```javascript

    var skyDome:SkyDome = new SkyDome();
    camera.sky = skyDome;
    skyDome.loadEnvInfo('res/env/def/envinfo.json');   //加载envinfo文件指定的环境光照信息。
```


3. 모형을 만든다.
4. pbr 소재를 제작합니다.
Substance Painter 에서 재질과 수정 소재를 만들어 UE4 형식으로 내보내드립니다.
[] (exptex.png)
그림 세 장 내보내기:
[] (uetx.png)
이 세 장의 그림은 각각:
*BaseColor*기본 색상, 빛사진, 음영 등 정보는 포함되지 않고 소재의 원본색만 표시합니다.
*Normal*법선 스티커
*Occlusion RoughnessMelic* 차단 정보 (빨간색 채널), 굵은 도도 정보(녹색 채널)

5. PBRMarterial 만들기
pbr 재질 생성:

```javascript

    mtl = new PBRMaterial();
    mtl.diffuseTexture = Texture2D.load('copper.png');
    mtl.normalTexture = Texture2D.load('normal.png');
    //mtl.pbrInfoTexture = Texture2D.load('orm.png'); 这个可有可无。
    mtl.roughness = 0.5;
    mtl.metaless =  1.0;
```

*difuseTexture*: 소재의 diffuse 스티커입니다.그의 alpha 채널은 투명도나 금속도를 나타낸다.
*normalTexture*: 소재의 법선 스티커.그의 alpha 채널은 거칠음을 표시했다.
* pbrInfoTexture *: 소재의 PBR 관련 정보는 이 스티커를 설정하면 이 이모티콘의 금속도, 거칠고 도깨비 정보를 우선 사용합니다.이 중 알은 AO 정보를 나타낸다. G 는 거칠고 굵을수록 거칠어진다. B 는 금속도를 나타낼수록 금속도를 높게 나타낸다.UE 의 스티커를 직접 사용할 수 있습니다.
*roughness*: 굵기.가선이것을 설치하면 스티커에 설치된 거칠고 굵은 정보는 무시하고, 전체 소재의 거친 도량은 같은 것으로 나타난다. 일반적으로 시사나 프로그램 제어만 사용한다.
*metaless*: 금속도.가선이것을 설치하면 스티커에 설치된 금속도 정보를 무시하고, 전체 소재의 금속도는 모두 같은 것으로 나타냅니다. 일반적으로 시사나 프로그램 제어 금속도를 사용합니다.

6. 모델 자원에 PBR 소재를 사용한다
이것은 두 가지 방법이 있습니다. 하나는 lh 중 지정되어 있으며, 하나는 프로그래밍을 통해 PBRMATERMAERMARMATIL을 만들어 메쉬린더에게 주어지는 방법입니다.
예를 들어 lh 로 지정한:

```json

        ...
        "meshPath":"dude-him.lm",
        "materials":[
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/head.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/jacket.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/pants.lmat"
            },
            {
                "type":"Laya.PBRMaterial",
                "path":"Materials/upBodyC.lmat"
            }
        ]
        ...
```

모든 lmat 내용

```json

{
    "version":"LAYAMATERIAL:01",
    "type": "PBRMaterial",
    "props": {
        "name": "head",
        "renderMode": 1,
        "has_tangent":true,
        "textures":[
            {"name":"diffuseTexture","path":"../headC.png"},
            {"name":"normalTexture","path":"../headN.png"}
        ]
    }
}
```


프로그램 지정

```javascript

    //手工设置材质
    var mtl:PBRMaterial = new PBRMaterial();
    mtl.diffuseTexture = Texture2D.load('../../../../res/threeDimen/pbr/basecolor.png');
    mtl.normalTexture = Texture2D.load('../../../../res/threeDimen/pbr/normal.png');
    mtl.pbrInfoTexture = Texture2D.load('../../../../res/threeDimen/pbr/orm.png');
    var sphere:MeshSprite3D = scene.addChild( new MeshSprite3D(new SphereMesh(0.1, 32, 32))) as MeshSprite3D;
    sphere.meshRender.sharedMaterial = mtl;

```


위에 있는 예에는 이모티콘을 두 장 사용하고, 어떤 이는 이모티콘을 세 장 사용해서 설명한다.효율을 높이기 위해서는 차단 정보가 필요 없다면 이 세 장의 그림을 두 장씩 합병할 수 있으며, 세 번째 그림의 남은 두 개의 채널을 앞에 두개의 그림의 alpha 채널에 두개 정도 올려 놓으세요.
이것은 pbrtools 명령을 통해 처리할 수 있습니다:

```bash

pbrtools handle_ue4_texture expPath
```

이 명령은 expPath 디렉터리에 내보내는 모든 그림을 합쳐줍니다. 세 장의 두 장의 변동과 expPath 아래에 출력하는 layaout 디렉터리에 출력합니다.
그래서 앞으로 자발광 지원이 필요하다면, 어쨌든 스티커 세 장이 걸린다.

##기타 문제
1. pbrlut.js
이것은 BRDF 를 처리하는 미리 계산된 검색 목록입니다. 엔진이 2진수 데이터를 배포하기 편리하지 않기 때문에 pbr 필요한 검색표 데이터를 독립된 js 파일에 저장하기 전에 이 스크립트를 다운로드해야 합니다.

```html

<script src='pbrlut.js' ></script>
<script src='myGame.js' ></script>
```


5. tangent 정보
현재 lm 에는 법선 정보만 포함되어 있으며 내보내기 인자 수정을 통해 tangent 정보를 늘릴 수 있지만, 때로는 온전한 normal, binormal, tangent 정보가 정확하게 법선 스티커를 표시할 수 있는 결과를 계산해 binormal 방법을 계산하면 나중에 플러그인을 사용하거나 pbrtools 사용한다.법략을 쓰다
