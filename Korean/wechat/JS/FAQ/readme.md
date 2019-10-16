#마이크로폰 소게임 흔히 볼 수 있는 문제

> author: charley

####1, 왜 작은 게임 로컬 가방에 넣었는지, 일부 자원이 제대로 적용되지 않았다.

로컬 가방에서 파일의 확장명에 명단을 설치하였기 때문에 리스트 내의 확장명의 파일이 업로드되지 않으면 사용할 수 없다.그러나 URL 의 동태를 통해 사용할 수 있으니 로컬 가방에 올리지 마세요.

이미 알 파일 형식목록목록목록: png, jpg, jpg, gpg, gf, svg, jjson, jjson, obje, dae, fx, mtl, mtl, stl, stl, jppg, jppg, jppppppppg, gpg, gf, jg, jjg, jjjjson, jsoson, jjson, jjjje, jjje, jjjje, pppx, dae, dae, mpx, mpx, mppppppppppppppppppppppppppppppppppppppppppppx, ogg, silk, dbbin, dbmv, etc, lmat, lm, ls, lh, lani, lav, ls ani, ltc.



####2, 왜 exactitfit 어울리기 모드를 설정하였는데, 전체 화면이 잘 어울릴 수 없습니까?

마이크로폰 작은 게임은 canvas 의 크기를 조절하는 것을 허용하지 않습니다.작은 게임의 canvas 크기는 자동으로 늘어난다.exactfit 패턴의 stage 폭은 디자인이 넓고, canvas 가 통제할 수 없을 때, exactfit 의 적절한 조합은 실효가 발생했다.fixedauto, 또는 full 등 디자인이 높은 것을 고려할 필요가 없습니다. stage 폭이 높은 적절한 패턴을 자동으로 바꾸고 다른 적절한 배합 방안을 결합하여 시도합니다.

예를 들어 fixedauto, 또는 full 적용 모드를 사용한 후 배경 그림의 top, bottom, left, right 속성을 0 으로 설정하면 전체 화면을 가득 깔 수 있다.



####3. H5 의 효과가 정상적으로 나타났고, 작은 게임이 발표된 후 오류를 알리고 JSON 과 관련이 있다.

작은 게임에서 로컬 자원을 읽기 위해 인코딩을 검사하기 때문에, 항목에는 절대 그림 파일의 인코딩이 ASCIII로 인터페이스 인터페이스 파일을 읽을 때 기본값은 작은 게임 인코딩 형식으로 ASCII 코딩 형식으로 ASCII 코드 (예를 들어 json 파일) 의 인코딩 형식이 ASCII 형식이 아니라면 오류가 발생할 수 있습니다.그래서 개발자는 서류 인코딩을 검사하고 통과해야 한다`MiniAdpter['getUrlEncode']`작은 게임은 이 파일의 진정한 인코딩이 무엇인지 알려 준다. 이렇게 작은 게임은 정확한 인코딩에 따라 검사하면 잘못되지 않을 것이다.


```js

//告诉小游戏你的文件编码是什么
MiniAdpter['getUrlEncode'] = getUrlAndEncode;//假如getUrlAndEncode是开发者识别文件编码的方法
```


개발자 인식 파일 인코딩 방법 (AS3 판):


```javascript

//该方法示例仅做参考，视项目情况自行修改或拓展
public static var getUrlAndEncode:Function = function(url:String,type:String):String
{
	if (url.indexOf(".fnt") != -1 || url.indexOf("xxx.json") != -1) 
    {
		return "utf8";
	} else if (type == "arraybuffer") 
    {
		return "";
	}
	return "ascii";
}
```




또 인터넷에서 동태에서 읽기, 인코딩이 없는 검사 제한이 있다.그래서 json 을 인터넷에서 동태로 불러올 수도 있다.



####4. 소리는 loader 미리 불러올 수 없음

마이크로폰 작은 게임으로 음성 파일을 저장하기 위한 메모리 사용 방식을 지원하지 않기 때문에 바로 Soundmanger 오디오 관리로 음성 재생할 수 있습니다.



####5, Mater 물리 엔진은 작은 게임 중 오류를 보고 세로 화면 모드 아래 마우스 응답이 없습니다.

작은 게임 window 역할 역의 문제로 나타나`Matter is not defined`잘못.아니면 세로 모드에서 마우스는 이벤트가 없습니다.이 문제들은 이미 엔진 라이브러리 1.7.20 버전에서 매트스터.js 를 복구했다.1.7.20 및 이후의 버전을 사용하여 이상 문제를 해결할 수 있습니다.하지만, Layabox 팀은 Matter.js 에 대한 수정을 한 뒤 엔진에서 제공되는 Matter.js, 제3측에서 Matter.js를 교체할 수 없다는 것을 주의해야 한다. 그렇지 않으면 해당 작업은 스스로 이뤄질 것이다.



###다음 업데이트:

이 문서는 트위터 소규모 게임 개발에서 만난 일부 흔한 문제들을 모아 해답을 한다.이 문서에 대한 의문이 있다면, 홈페이지 커뮤니티에 질문해 주세요.

커뮤니티에서 개발자가 피드백한 작은 게임의 흔한 문제로 본 문서는 부정기적인 업데이트를 진행한다.

커뮤니티 사이트: https://ask.layabox.com/



##본문 칭찬

만약 본문은 당신에게 도움이 된다고 생각하시면, 스코드가 작가님을 환영합니다. 당신의 격려는 우리가 더 우수한 문서의 동력입니다.

![wechatPay](../../../wechatPay.jpg)