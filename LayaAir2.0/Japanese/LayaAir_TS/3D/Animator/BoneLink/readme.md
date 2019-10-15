#アニメーション

###### *version :2.1.0beta   Update:2019-6-13*

骨格の挂け技术は3 Dゲームの中で非常に普遍的で、たとえば武器は役の手の动作に従って変化して、それでは私达は武器と手の骨格を挂けることができて、武器は手の骨格のサブノードとして、自然と使いやすい动作と変化することができます。

もちろん、バインディングされた3 Dモデルはコードによってバインディングを除去したり、別の3 Dモデルを交換したりすることもできます。この方法で武器や装備の換装機能、騎乗機能などを実現できます。

####(1)ユニティに骨格掛点を設定する

骨格掛点はユニティに設置されていてとても便利です。シーンの資源階層で直接操作できます。以下の図（図1）

バインディングを必要とするオブジェクトは3 D容器でもいいです。3 Dモデルだけでもいいです。位置を調整した後、指定された骨格の下にドラッグしてサブレベルとして接着点を連結することに成功しました。動画を再生する時、骨格アニメーションに従って変化していることが分かります。

ある時、私達は最初の時に武器を持たない必要がありますが、またハングアップが必要です。今後武器を換えるために準備します。それなら私達は骨の下に空いているノードの容器GameObjectを入れてもいいです。必要な時には別の3 Dモデルや複数のモデルを追加します。

！[](img/1.png)<br/>(図1)

**Tips：私たちの骨格の掛点が設置されたら、骨格と掛点の対象は自動的に.lsまたは.lhファイルに導かれます。get ChildByName()方法でそれらを入手できます。**

####(2)コードの中で骨格掛点を実現する

アニメイトアニメーションモジュール類は二つの実例的な方法を提供しています。`linkSprite3DToAvatarNode()`を選択します`unLinkSprite3DToAvatarNode()`ハンガーポイントの追加と除去が可能です（図2、図3）。

Tips：コードは骨格動画を追加する前に、美術が骨格ノードに関連する名前を提供する必要があります。

！[](img/2 png)<br/>(図2)

！[](img/3 png)<br/>(図3)

具体的に使用されるコード・セクションは、公式の例から選択され、より詳細な使用は、下記を参照することができます。[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=BoneLinkSprite3D%3E)を選択します。

**シーンから骨格アニメーションモデルを取得します。模型のアニメーションコンポーネントを取得します。**

イベント中の部分をクリックしてコードを追加します。


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


イベントの一部をクリックして、コードを削除します。


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


！[](img/4 gif)<br/>(図4)

