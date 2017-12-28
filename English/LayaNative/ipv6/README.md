
# On iOS of ipv6
Apple Corp has been enforcing the IPv6 standard since June 1, 2016. So when developers publish projects, HTTP requests and socket must use domain names , can not use the ip address.
Before the developer submits appStore, it needs to test whether IPv6 is normal. Please refer to the official Apple documentation, or the following document:
  

[Official document of the IPv6 test method](https://developer.apple.com/library/mac/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/UnderstandingandPreparingfortheIPv6Transition/UnderstandingandPreparingfortheIPv6Transition.html#//apple_ref/doc/uid/TP40010220-CH213-SW1)  


**Good tips:**  
1. There are many developers have shown that they have tested IPv6 by Apple's official website as OK, but are still repulsed by Apple's unrelenting access to IPv6. This phenomenon occurs, developers need to replace a compatible ipv6 web server.  
2. If the developer's server is set up in China, it will be very slow when the apple is reviewed, and it may also affect the audit at this time. There are two ways to try it out.
*    （1）. A server is set up abroad and the domain name is redirected to China after the audit is passed.
*    （2）. Package project resources into local app so that you can avoid downloading resources。[Packaging resources](http://ldc.layabox.com/doc/?nav=en-as-5-2-0)



