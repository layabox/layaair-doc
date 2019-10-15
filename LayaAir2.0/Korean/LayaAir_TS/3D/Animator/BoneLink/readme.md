#애니메이션 포인트

###### *version :2.1.0beta   Update:2019-6-13*

골격 단점 기술은 3D 게임에서 매우 보편적이며, 예를 들면 무기가 캐릭터의 손동작에 따라 변화하고, 우리는 무기와 손뼈를 묶어 묶고 무기를 손뼈의 자릿점으로 하면 자연스럽게 손의 동작과 변화할 수 있다.

물론 바인딩 후 3D 모형도 인코딩을 통해 납치하거나 다른 3D 모형을 바꿀 수 있으며 이러한 방식으로 무기나 장비의 환장 기능을 실현할 수 있으며 승승승기능 등이 가능하다.

####(1) 유닛에 골격 걸이를 설치하다

골격이 유나이티에 설치가 매우 편리하여 장면의 자원 계급에서 직접 조작할 수 있다.다음 그림 (그림 1)

납치해야 할 대상은 3D 용기이며, 3D 모형일 수 있으며, 그 위치를 잘 조정한 뒤 지정 골격 아래로 끌어들이면 스트랩으로 묶어서 묶어 성공했다. 애니메이션 재생 시, 골격 애니메이션에 따라 변화하는 것을 발견할 수 있다.

때로는 우리가 처음 시작할 때 무기가 필요할 때도 있지만, 또 다른 3D 모델 또는 여러 모형을 추가할 수 있다.

[] (img/1.png)<br>(1)

**Tips: 골격 단점이 설치된 후 골격과 단점 대상은 자동으로 ls 나 lh 파일에서 우리는 getChildByName () 방법을 통해 그것들을 얻을 수 있습니다.**

####(2) 코드에서 골격걸이를 실현하다

애니메이터 애니메이션 구성 요소는 두 가지 실례 방법을 제공했다`linkSprite3DToAvatarNode()`과`unLinkSprite3DToAvatarNode()`연결점 추가 및 제거 가능 (그림 2, 그림 3).

Tips: 골격 애니메이션 첨가하기 전에 미술은 골격 노드를 필요로 하는 이름이다.

[] (img/2.png)<br>(2)

[] (img/3.png)<br>(2)

구체적으로 사용하는 코드 선택은 공식적인 예로, 더 자세한 사용은 볼 수 있다: (()[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=BoneLinkSprite3D%3E)무엇

**장면에서 뼈 애니메이션 모형을 획득한 애니메이션 구성 요소 — 단축점 대상 — 버튼을 클릭한 후 애니메이션 구성 요소를 통해 골격과 고리를 묶는다.**

클릭 이벤트의 부분에 포인트를 추가하는 코드:


```typescript

//往场景上添加龙
this.scene.addChild(this.dragon1);
//将角色节点添加到龙的节点上
this.aniSprte3D1.addChild(this.role);
//关联精灵节点到Avatar节点
this.dragonAnimator1.linkSprite3DToAvatarNode("point", this.role);
//胖子播放骑乘动作
this.animator.play("ride");
//龙播放奔跑动作
this.dragonAnimator1.play("run");
//调整胖子的相对旋转，相对位移，以及缩放。
this.pangzi.transform.localRotation = this._rotation;
this.pangzi.transform.localPosition = this._position;
this.pangzi.transform.localScale = this._scale;
```


클릭 이벤트 부분의 포인트 이동 코드:


```typescript

//将role从龙2的节点上移除
this.dragonAnimator2.unLinkSprite3DToAvatarNode(this.role);
this.aniSprte3D2.removeChild(this.role);
//移除龙2
this.dragon2.removeSelf();
//将role添加到场景上，同时播放hello动画
this.scene.addChild(this.role);
this.animator.play("hello");
```


[] (img/4.gif)<br>(4)

