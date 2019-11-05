#IPv6 on iOS
Apple enforced the IPv6 standard on June 1, 2016, so when developers release projects, HTTP requests and sockets must use domain names instead of IP addresses.
Developers need to test IPv6 before submitting appStore. For testing, please refer to Apple's official documents or the following documents:

  



[ipv6测试方法官方文档](https://developer.apple.com/library/mac/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/UnderstandingandPreparingfortheIPv6Transition/UnderstandingandPreparingfortheIPv6Transition.html%3Ch1%3E//apple_ref/doc/uid/TP40010220-CH213-SW1)  


**Friendship Tips:**  
1. Many developers report that they test IPv6 according to Apple's official website is OK, but it is still rejected by Apple because IPv6 can not access relentlessly. In this case, developers need to replace a web server compatible with ipv6.
2. If the developer's server is set up in China, Apple's access to the audit will be very slow, which may also affect the audit. There are two ways to try.
* (1) Set up a server abroad and point the domain name to China after approval.
* (2) Packing project resources into local apps can avoid downloading resources.



