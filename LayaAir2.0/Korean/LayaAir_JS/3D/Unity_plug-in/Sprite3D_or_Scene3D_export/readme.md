#예상 / 장면 내보내기

우리가 방금 미리 보기로 한 장면을 열어 출력 장면을 설정한 후.

Laya Export 단추를 누르면 Sce3D와 Sprite3D 각각 하나로 합병하는 폴더 목록 구조는 다음과 같습니다.

[] (img/1.png)<br>(1)

그림 파일 자원을 보고, 내보내면 ls, lm, lmat 데이터 자원, 스티커 jpg, png 자원이 생성된다.

그것들의 구체적인 용법은 후속 과정 문서에서 상세하게 소개할 것이다.

**Tips: 동시에 내보내는 동안 리야아의 소재구를 사용해야 합니다. 그렇지 않으면 내보내면 큰 차이가 있을 뿐만 아니라 부분은 사용할 수 없습니다.장면 모형에 대한 유닛이 내보내는 메뉴판 --Layairair3D-Help--Tutorial 에서 볼 수 있습니다.**

메뉴 표시줄 --Layaiair3D--쇼트컷--Switch to Layair3D shader, 프로젝트 내의 소재를 리야아3D의 기본 소재(Blinphong)로 바꿀 수 있다.

다음 파일을 간단한 예로 내보내는 빈 폴더에 복사합니다.

Tips: 이 장절에는 단순 다운로드만 소개하고 내보내면 다양한 형식을 생성할 수 있습니다. 그것들은 3D 기술 문서에서 '자원 가재편'을 소개합니다.

장소를 가재합니다. ls 예례 코드 다음과 같습니다.


```javascript

export default class GameUI extends Laya.Scene {
    constructor(){
        super();
        //加载场景文件
        this.loadScene("test/TestScene.scene");
        //加载场景
        		Laya.Scene3D.load('LayaScene_test/Conventional/test.ls',Laya.Handler.create(this,this.onComplete))
    }
    /**
	 * 加载完成
	 */
    onComplete(scene){
        // 将场景加到舞台上
        Laya.stage.addChild(scene);
    }
}
```


실행 효과 (그림 2):

[] (img/2.png)<br>(2)