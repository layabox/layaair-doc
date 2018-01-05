# Cross domain processing

When many new novice developers finish making a Demo operation, there is a chance that resources can't be displayed.

The contents of the hint are as follows:

*No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'file://' is therefore not allowed access.*

**Why do you need cross the domain ?**

When the browser is default, if you load a local file, there will be a cross-border access problem. This is the **cross-border**.

**How to solve cross-domain issues ?**

Cross-domain is divided into two kinds. One is cross-domain file request, one is cross-domain data requests

##### 1. File request across domains

There are two solutions to cross-domain file requests, one is to add startup parameters to the browser. Here to chrome, for example; select the chrome browser shortcut to open the icon -> right click to open the property -> open the shortcut bar -> the end of the target to add (in front of the quotation marks, plus the quotation marks) --allow-file-access-from-files. As shown below:

![1](img\1.png)(figure 1)

All the open Chrome browser pages are turned off and run again.

**The above method can only solve the problem of local debugging, and can not solve the cross - domain problems existing by other hosts** To solve the problem of file cross domain, we need to modify webServer (general webserver, most of which are Apache, nginx, Tomcat, etc.), and add cross domain identities to request specific domain names. Here's nginx as an example :

```
http {

  ......

  add_header Access-Control-Allow-Origin *;

  add_header Access-Control-Allow-Headers X-Requested-With;

  add_header Access-Control-Allow-Methods GET,POST,OPTIONS;

  ......

}

```

This enables the support of GET, POST, OPTIONS cross domain requests, and can also be implemented add_header Access-Control-Allow-Origin [http://www.layabox.com;](http://www.layabox.com%3B/) --Specified permissible of url；

##### 2. Data request cross domain

The data request cross domain requires the backend coordination modification, and the header logo is added to the request. In this case, the PHP language is used as an example :

```
header("Access-Control-Allow-Origin: *");
```

It does not necessarily use *, it allows all hosts to cross domain access, and developers can also write the host under the specified domain name for access.



**About WeChat Avatar cross domain: **

You can download the picture to your own server in the background, and then access your avatar resources through your own server