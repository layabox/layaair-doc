#2.2 버전의 F5 디버그 시작

LayaiairIDE 내장 코드 편집 도구는 VScode,

F5 디버깅은 VScode 테이프의 디버그 도구다.

그러나 2.2 버전 번역 방식의 변화로 F5 디버깅을 지원해 bin 디렉터리가 커질 수 있다.그래서 F5 디버깅을 종료하고 F6 실행을 사용하여 chrome 디버그 활성화를 추천합니다.(MAC 시스템의 개발자는 F6 을 실행하기 전에 chrome 프로세스를 켜지 마세요. 그렇지 않으면 F6이 chrome 프로세스를 조절하는 데 영향을 미칠 수 있습니다)

크라미는 그동안 추천해 온 첫 디버그 모드로 개발자 Crome 사용을 제안했다.

개발자가 특정한 수요가 있다면 다음과 같은 방식에 따라 레이야아이드의 F5 디버깅을 시작하십시오.

###1, module 모드 TS 프로젝트 (실험판) F5 디버그 시작

####1、고치다`.laya/compile.js`

찾아내다`sourceMap: false`수정하다`sourcemap: true`

총 두 개 있어요.`sourcemap`장소는 모두 수정해야 한다`true`.

####2、고치다`.laya/launch.json`

찾아내다`"sourceMaps": false,`수정하다`"sourceMaps": true,`

여기에도 두 곳, 한 곳은 라야아 디버깅, 한 곳은 크로메 디버깅.

우리 건의는 크롬 디버깅으로 chrome 디버깅을 하면 됩니다.layair 디버깅이 필요하다면 모두 고칠 수 있고, 라야아 디버깅만 볼 수 있다.

####3、수정`src/tsconfig.json`

compillerOptions 아래'sourcemap'추가

수정 후 tsconfig.json 은 다음과 같습니다:


```json

{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "baseUrl": "../libs",
    "outDir": "../build/src",
    "sourceMap": true
  },
  "references": [
    {"path":"../libs"},
  ],
  "exclude": [
    "../node_modules"
  ]
}
```




###2, bundle 모드 TS 프로젝트, F5 디버그 실행

####1、고치다`.laya/compile.js`

찾아내다`sourceMap: false`수정하다`sourcemap: true`

총 두 개 있어요.`sourcemap`장소는 모두 수정해야 한다`true`.

####2、고치다`src/tsconfig.json`

장`"sourceMap": false`수정하다`"sourceMap": true`

수정 후 tsconfig.json 은 다음과 같습니다:


```json

{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "noEmitHelpers": true,
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ]
}
```




###3, JS 프로젝트, F5 디버그 시작

찾아내다`sourceMap: false`수정하다`sourcemap: true`

총 두 개 있어요.`sourcemap`장소는 모두 수정해야 한다`true`.

> 두 번째만 고쳐도 되고 두 번째는 다 고쳐주세요.