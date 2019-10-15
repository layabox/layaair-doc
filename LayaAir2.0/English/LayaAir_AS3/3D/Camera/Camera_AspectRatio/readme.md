#The aspect ratio of the camera

###### *version :2.0.1beta   Update:2019-3-19*

In general, we do not manually set the aspect ratio of the screen, but automatically set the aspect ratio by calculating during operation. However, in some special cases, when it is necessary to set the aspect ratio manually, you can set it manually by yourself. If you need to reset the aspect ratio, change back to automatically change the aspect ratio, just set this value to 0.


```typescript

//手动设置横纵比
camera.aspectRatio = 2;
```



```typescript

//重置
camera.aspectRatio = 0;
```


