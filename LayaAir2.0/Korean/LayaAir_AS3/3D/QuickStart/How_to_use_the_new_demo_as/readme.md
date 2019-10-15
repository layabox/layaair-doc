#홈페이지에 다운로드한 DEMO 는 어떻게 사용합니까?

새로운 예례가 전부적으로 테스트하고 검사한 후에야 새로운 공식 예례를 발표할 수 있다.그래서 새 문서가 사용한 예례는 일시적으로 홈페이지 예례처에서 직접 볼 수 없다.

이 문제를 일시적으로 해결하기 위해 공식 측은 새로운 사례를 사용한 곳에서 원본 주소를 첨부할 예정이며 개발자 자체 배치 주소가 필요합니다.

새로운 예례가 정식 발표된 후 문서회가 동기화된 후 업데이트를 시작합니다.

이 곳에서 다운로드된 데모는 어떻게 사용할지 알 수 있다면 이 문서를 바로 뛰어넘을 수 있다.

**Tip:**개발자가 다운로드를 실행하는 예제가 계속 하나의 항목을 사용할 것을 건의합니다.그렇다면 자원 주소를 여러 번 수정할 필요가 없다.사용된 자원 주소 루트 디렉터리:[资源地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E).

여기 저희가 사용합니다.**도형 기초편의 Transform**예를 들어 예를 만들다[地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/as/LayaAir3D_Sprite3D/TransformDemo.as%3E)무엇

코드 받아서 ide 생성 예제 항목을 엽니다.다운로드한 자원을 저장합니다`bin/res`목록 아래.

[] (img/1.png)<br>(1)

그리고`src/script`폴더 아래에 새 파일을 생성합니다.이름 조심하세요.`地址中复制`.(TransformDemo.as)

[] (img/2.png)<br>(2)

복제 코드 복사`git`복제에서 가져온 파일은 이 폴더에 직접 넣을 수 있습니다.물론 이맘때 많은 신문이 있을 것이다.

[] (img/3.png)<br>(2)

이것은 현재 가방의 이름만 잘못한 것이며, 가방을 올바른 가방 이름으로 바꾸면 된다.이곳의 가방`script`.

[] (img/4.png)<br>(4)

이쯤에서 실수가 하나 있을 거예요.

[] (img/5.png)<br>(도 5)

간단한 처리 방안은 이 줄을 직접 주석해서 바로 실행할 수 있다.이 스크립트는 카메라로 스크립트를 이동하는 데 편리한 개방자는 각도에서 예시를 관찰하는 것이다.(w 전진 이동, s 뒤로 이동, a 왼쪽으로 이동, d 오른쪽으로 이동, 마우스 왼쪽 단추를 누르면 카메라의 시각을 조정할 수 있다)

아니면 저희가 common 폴더에서 찾습니다`CameraMoveScript.as`복사하다.

[] (img/6.png)<br>(도 6)

이 마지막에 우리는 다시 써야 한다`Main.as`파일이 실행될 수 있습니다.데모는 여러 가지 초기화로 직접적으로 신경 쓰지 않아도 된다.수정 후 Main.


```typescript

package {
	import script.TransformDemo;

	public class Main {
		public function Main() {
			var transformDemo:TransformDemo = new TransformDemo();
		}
	}
}
```


그리고 F5 가 실행되면 효과를 볼 수 있다.

[] (img/7.png)<br>(7)

**새로운 예례는 script 폴더에서 계속 신규 사례 코드 를 추가하고 main 을 사용하면 된다.**