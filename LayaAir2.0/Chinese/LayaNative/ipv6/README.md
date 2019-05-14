
# 关于iOS的ipv6
苹果公司在2016年6月1日起，强制执行ipv6标准，所以开发者发布项目的时候，http请求和socket都必须使用域名的方式，不能使用ip地址。  
开发者在提交appStore前，需要测试ipv6是否正常，测试方法请参考苹果官方文档，或者以下文档：  
  

[ipv6测试方法官方文档](https://developer.apple.com/library/mac/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/UnderstandingandPreparingfortheIPv6Transition/UnderstandingandPreparingfortheIPv6Transition.html#//apple_ref/doc/uid/TP40010220-CH213-SW1)  

**友情提示：**  
1.有很多开发者反映，自己按照苹果官网测试ipv6是OK的，但是仍然被苹果因为ipv6无法访问无情拒绝。出现这种现象，开发者需要更换一台可以兼容ipv6的web服务器。  
2.如果开发者的服务器架设在中国，苹果在审核的时候访问会非常慢，这个时候也有可能会影响审核。有两种方法可以尝试一下。  
*    （1）、在国外架设一台服务器，等审核通过后，把域名再指向中国。
*    （2）、把项目资源打包到本地app中，这样可以避免下载资源。



