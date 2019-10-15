#Animation hanging point

###### *version :2.1.0beta   Update:2019-6-13*

Skeletal hang-point technology is widely used in 3D games. For example, the weapon changes with the action of the character's hand. Then we can bind the weapon to the skeleton of the hand. As a sub-node of the skeleton of the hand, the weapon can naturally change with the action of the hand.

Of course, the binded 3D model can also be removed by code or replaced by another 3D model, which can realize the replacement function of weapons or equipment, riding function and so on.

####(1) set bone hanging point in unity

Skeletal hangpoints are very convenient to set up in Unity and can be directly operated in the resource level of the scene. The following figure (Fig. 1)

The objects that need to be bound can be a 3D container or just a 3D model. After adjusting their positions, dragging them under the specified skeleton as a sub-level, they can be bound successfully. When playing the animation, we can find that it changes with the skeleton animation.

Sometimes, we need to be weapon-free at the beginning, but also need a hang point to prepare for future weapons change. Then we can put an empty node container GameObject under the skeleton and add different 3D models or multiple models to it when needed.

![] (img/1.png)<br> (Figure 1)

**Tips: When our skeleton hangpoints are set up, skeleton and hangpoint objects are automatically exported to. LS or. LH files, which can be obtained by the getChildByName () method.**

####(2) implement bone hang point in code

Animator animation component class provides two example methods`linkSprite3DToAvatarNode()`And`unLinkSprite3DToAvatarNode()`You can add and remove hanging points (Figure 2, figure 3).

Tips: Before adding skeletal animation to the code, you need the art to provide the names of the skeletal nodes that need to be associated.

![] (img/2.png)<br> (Figure 2)

![] (img/3.png) < br > (fig. 3)

The specific code used is excerpted from the official example. For more details, you can see:（[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=BoneLinkSprite3D%3E))

**Get the skeleton animation model from the scene - get the animation component of the model - create the hang-point object - after the button clicks, bind the skeleton and hang-point object through the animation component.**

Click on the add code for the part of the hangpoint in the event:


```typescript

//往场景上添加龙
scene.addChild(dragon1);
//将角色节点添加到龙的节点上
aniSprte3D1.addChild(role);
//关联精灵节点到Avatar节点
dragonAnimator1.linkSprite3DToAvatarNode("point", role);
//胖子播放骑乘动作
animator.play("ride");
//龙播放奔跑动作
dragonAnimator1.play("run");
//调整胖子的相对旋转，相对位移，以及缩放。
pangzi.transform.localRotation = _rotation;
pangzi.transform.localPosition = _position;
pangzi.transform.localScale = _scale;
```


Click on the removal code of part of the hangpoint in the event:


```typescript

//将role从龙2的节点上移除
dragonAnimator2.unLinkSprite3DToAvatarNode(role);
aniSprte3D2.removeChild(role);
//移除龙2
dragon2.removeSelf();
//将role添加到场景上，同时播放hello动画
scene.addChild(role);
animator.play("hello");
```


![] (img/4.gif) < br > (fig. 4)

