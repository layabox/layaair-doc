# 暂停动画

###### *version :2.1.0beta   Update:2019-6-13*

After playing animation, let's talk about pausing animation. Developers can directly control the pausing and playing of animation by using the playing speed of animation. They can directly set the playing speed of pausing animation to 0, and they only need to reset the playing speed to 1.


```typescript

//暂停动画
animator.speed = 0.0;

//播放动画
animator.speed = 1.0;
```


When the speed is greater than 1, the animation is accelerated.