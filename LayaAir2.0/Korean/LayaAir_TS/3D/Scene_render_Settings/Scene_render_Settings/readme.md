#장면 렌치 소개

###### *version :2.0.1beta   Update:2019-3-19*

###Sce3D 개요

장면은 레이야아 엔진의 3D 세계용기를 위한 게임의 3D 화면과 각종 3D 화면을 가재하며, 게임의 카메라, 조명, 인물, 물품 등을 모두 화면에 놓아야 화면을 보여 줄 수 있으며, 게임 3D 플레이어나 3D 보기에 해당한다.

Scene3D 의 상속관계를 통해 Sprite 종류를 계승하는 것을 볼 수 있다.그래서 간단하게 2D의 디스플레이 대상으로 볼 수 있습니다.

Layair 엔진에서 3D와 2D를 섞어 사용할 수 있으며, Scen 3D 장면과 Sprite 2D 용기나 원소는 무대에 함께 가재할 수 있다.

###유닛에서 빛을 내보내기

개발자는 과장 설정을 편집해서 더 뛰어난 게임 장면을 선보일 수 있다.유닛 에서 편집 을 더 직관적 으로 보실 수 있 는 효과 를 볼 수 있 기 때문에 여기 는 유닛 에서 유닛 에서 보카시 설정 을 편집 한 뒤 사용 장면 을 끄는 것 이다.

####Ligthing (빛 사진) 과장 지원

… 에`window-lighting-settings`빛을 내며 렌더보드를 비추다.

[] (img/1.png)<br>(1)

**(1) Skybox Matrial**(material) 하늘상자.

​**Tip**Layair3D / Sky 디렉토리 아래 Shader 를 사용하십시오.

**(2) Envinment Lighting**환경빛

Color, AmbientMode-Realtime (실시간) 빛을 지원합니다.

**(3) Envinment Reflections**환경 반사

Custom 사용자 정의 환경 반사를 지원합니다.

**(4) Lightmaping Setting**라이트 사진 설정

모두 지원합니다. 하지만 Direction nal Mode 포함되지 않습니다 (Directional)

​**Tip**베이킹 사진은 Non-Direction을 사용해야 합니다

**(5) Other Setting**기타 설정

Fog 장면 안개

**(6) Global maps**

내보낼 수 있으며, 효과와 PC, Mac & Linux Standalone 이 일치한다.

####장면 내보내기

앞[Unity插件篇](http://localhost/LayaAir2_Auto/%E5%9C%B0%E5%9D%80)간단한 플러그인을 사용하여 내보내는 장면이 있습니다. 여기에서 자세한 설명을 할 예정입니다.

내보낼 장면을 확인하고 플러그인 패널 열기, 클릭**브라운**디렉토리를 내보내기 위해 디렉토리를 선택한 후 클릭**Layair Export**장면을 내보내다.

[] (img/2.png)<br>(2)

내보내는 장면을 보여주세요 (2):

[] (img/3.png)<br>(2)

test.ls 는 바로 우리가 내보내는 장면의 배경 파일이다. 장면은 다양한 데이터, 모형, 라이트 스티커, 위치 등을 기록했다.

Library 폴더에서 기본 충돌 케이스입니다.

Assets 폴더 아래에 있는 장면 자원 목록,.jpg,.png 등 파일은 소재 스티커입니다.

Matrials 파일 아래는 소재 공입니다.


