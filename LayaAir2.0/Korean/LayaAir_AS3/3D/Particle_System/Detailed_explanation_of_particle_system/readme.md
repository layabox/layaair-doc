#입자 속성 상해

###### *version :2.1.1beta   Update:2019-8-2*

[] (img/1.png)<br>(1)

입자 시스템에 대한 자세한 사용법을 살펴볼 수 있습니다.[Unity官方文档](https://docs.unity3d.com/Manual/PartSysReference.html).Layair 내보내기 도구로 내보내는 부분만 간단히 소개합니다.

**주의:**내보낼 때 지원하지 않는 부분이 있다면 내보내면 알 수 없는 오류가 발생할 수 있다.

--------

**기초판**

일.`Duration`입자 지속 시간
이.`Looping`순환 여부
삼.`Startdelay`입자가 지연되다
1.*Const*상수
2.*Random Between two Const*최대 상수
사.`StartLifetime`입자 생명
1.*Const*상수
2.*Random Between two Contant*랜덤 중 최대 최대 소수 중 상수
오.`StartSpeed`입자 속도
1.*Const*상수
2.*Random Between two Contant*랜덤 중 최대 최대 소수 중 상수
육.`StartSize`시작 크기
1.*Const*상수
2.*Random Between two Contant*랜덤 중 최대 최대 소수 중 상수
칠.`3DStartSize`3D 시작 크기
1.*Const*상수
2.*Random Between two Contant*랜덤 중 최대 최대 소수 중 상수
팔.`StartRotation`회전을 시작하다
1.*Const*상수
구.`3DRotaion`3D 회전 변수
1.*Const*상수
2.*Random Between two Contant*랜덤 중 최대 최대 소수 중 상수
십.`RandomizeRotation`무작위 회전의 확률
십일.`StartColor`시작 색상
1.*Color*상수 색상
2.*random Between two Color*랜덤 색상 중
십이.`GravityModifier`중력 수정
십삼.`Simulation Space`아날로그 공간
1.*local*모형
2.*Hierarchy*세계
십사.`ScalingMode`축소 모드
1.*Hierarchy*레이어드 축소
2.*local*자체 축소
십오.`Play On Awake`시작 시 재생
십육.`Max Partticles`최대 입자 수
십칠.`AutoRandomSeed`자유 회전 속도

--------

**Emisssion**발사 모듈

`Rate over Time`입자수를 발사하다

`Bursts`입자수를 발사하다

--------

**Shape**형태 모듈

이 모듈은 입자 발사기의 체적과 형태를 정의한다.

일.`Sphere`공
1.*Radius*반경
2.*Emit from shell*껍질에 따라 발사
3.*Randomize Direction*임기화 방향
이.`Hemisphere`반구형
1.*Radius*반경
2.*Emit from shell*껍질에 따라 발사
3.*Randomize Direction*임기화 방향
삼.`cone`원추형
1.*Angle*각도
2.*Radius*반경
3.*Emit from*발사
4.*Base*기초
1.*Base Shell*껍질에 기반
2.*Volume*체적
3.*Volume Shell*체적 케이스
5.*Randomize Direction*임기화 방향
사.`Box`상자형
1.*BoxX*박스X
2.*BoxY*케이스 Y
3.*BoxZ*박스 Z
4.*Emitform*발사
일.*volume*
5.*Randomize Direction*임기화 방향
오.`circle`고리형
1.*Radius*반경
2.*Arc*각도
3.*Emit From Edge*가장자리에 기반 발사
4.*Randomize Direction*임기화 방향

--------

**Velocity over Lifetime**생명 기반 의 속도 변화

일.
1.*Const* 상수 모드, 속도는 항정적이다
2.*Curve*라인 모드, 입자 속도가 lifetime
3.*Random from two Const*랜덤 모드
이.`Space`공간
1.*Local*모형 공간
2.*World*세계공간

--------

**Color over Lifetime**생명 기반 의 색깔 변화

일.`Color`색깔
1.*Gradient*사다리도
2.*Random between two Gradient* 두 사다리에서 무작위로 추출

--------

**Size over Lifetime**생명의 크기 변화에 기초하다

일.`Separate Axes`축별로 분리 하다
1.*size*크기
1. *Curve*곡선
2.*Random Between Two Contants*두 상수에서 무작위로
이.`Separate Axes`축소축 선택
1.*size*크기
1. *Curve*곡선
2.*Random Between Two Contants*두 상수에서 무작위로

--------

**Texture Sheet 애니메이션**그림 애니메이션

일.`Tiles`평점
이.`Animation`애니메이션
1.*Single Row*단줄
2.*whole Sheet*전체 시계
삼.`Random Row`무작위 행
사.`Frame over Time`애니메이션 프레임 시간 변화
1. *contants*상수
2.*curves*곡선
3.*Random Between Two Contants*두 상수 중 무작위로
오.`Start Frame`시작 프레임
일.*Contant*
2.*Random Between Two Contants*두 상수에서 무작위로
육.`Cycles`주기
칠.`Flip U`뒤집다
팔.`Flip V`브이를 뒤집다

--------

**Rotation over Lifetime**생명 기반 의 회전 변화

일.`Separate Axes`축 분리 중
1. *Angular Velocity*각속도
2.*Const*상수
3.*Curve*곡선
4.*Random Between Two Contants*두 상수에서 무작위로



--------

**Render**렌더링 모드

이 모드 렌더로 지원

일.`RenderMode`렌더링 모드
1. *빌보드 입자가 항상 카메라를 향한다.
이.*Stretched 빌보드*
1. *Camera Scale*카메라 비율
2.*Velocity Scale*속도 비율
3.*Length Scale*길이 비율
3.*Horizontal 빌보드 입자 평면
4.*Vertical 빌보드 * 입자가 Y 축에 직립되었지만 카메라를 향해서
5. *Mersh*입자는 무늬가 아닌 3D의 격자를 사용한다.
-(지지) 하지만 면수가 특히 큰 모델이 있다면 오보를 할 수 있다. 오보원인은 index 65536을 넘어서기 때문이다
이.`Sorting Fudge`수치가 작아질수록 과장이 우선순위가 더 커진다.

