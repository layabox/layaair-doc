#Wechat IOS client is upgraded to the WK Webview kernel, HTML5 performance will be improved four times!

2017-01-06

Since the last Android upgrade to X5 Blink, Wechat IOS also announced the good news on the evening of January 6, 2017: "Wechat IOS client will be upgraded to WK Webview kernel, please web developers to adapt as soon as possible". What does this phrase mean for non-technical developers? The Layabox editor first throws out the answer, then slowly interprets it.

Since the last Android upgrade to X5 Blink, Wechat IOS also announced the good news on the evening of January 6, 2017: "Wechat IOS client will be upgraded to WK Webview kernel, please web developers to adapt as soon as possible". What does this phrase mean for non-technical developers? The Layabox editor first throws out the answer, then slowly interprets it.

**Upgraded benefits**

>**First, HTML5 rendering performance improved by four times.**
>
>**2. Memory usage will be reduced to 30%.**

Comparing the performance test links given by Tech Brother, Xiaobian finds that the performance gap between the current UIWebView and Safari's WKWebview kernels is about four times. Memory usage can be reduced to about 30%. The current WK Webview kernel of Safari is used by Wechat IOS client after upgrading to WK Webview.**Performance improvements and memory footprint reductions are significant good news for developers of HTML5 games, which can easily achieve the effect of APP games in the future.**

**Update time cycle**

Wechat iOS client will be upgraded to WK Webview kernel by March 1, 2017.

#### **background**

WKWebView is a new component introduced by Apple in iOS 8. Its purpose is to provide a modern web browsing control that supports the latest Webkit functionality, and to get rid of the old, old and clumsy problems of UIWebView in the past, especially the huge memory footprint. It uses the same Nitro JavaScript engine as in Safari, greatly improving the page JS execution speed.

####Handover method

IOS Wechat version 6.5.3 began to support developers to manually switch between WK Web view and UI Web view, enabling developers to adapt WK Web view in advance.

**Manual switching entry:**

On the Wechat session list page, click the "plus button" in the upper right corner, select "Add Friends" in the menu, and enter a string in the search box of the Add Friends Interface: ": switch web", then click the search button in the lower right corner of the keyboard. When the switch is successful, it will be prompted that the currently used kernel is UIWebview or WKWebview.

**Check switching method:**

After successfully switching to WK Webview by command, you can verify whether the current Web page is using the WK Webview kernel by the following methods.

Any entrance in Wechat enters any web page, pulls down the page (or clicks the menu button in the upper right corner of the page) after the page is loaded successfully, so that it displays the address bar. The address bar begins with "this web page is from" which is the current use of WKWebview, and UIWebview is used if "Web page is from".

**How do pages determine the currently used WebView kernel:**

In the page, the currently used WebView kernel can be judged by the window. _wxjs_is_wkwebview variable injected by Wechat. IOS Wechat 6.5.3 and its subsequent version window. _wxjs_is_wkwebview is true when using WKWebview, false or "undefine" when UIWebview.

**Key points of front-end adaptation**

The first principle of adaptation: If you can't distinguish between the new features and new behavior of WKWebview or the problems of the original page caused by the internal logic of Wechat, you can use the test page to test the WKWebview kernel in Safari and Weichat separately to quickly locate the causes of the problems.

####Adaptation Guidelines

After switching to WKWebview, the behavior of Webview in Weichat is highly consistent with that in Safari. The only difference is that the script related to JSBridge will be injected into Weichat Webview. Therefore, the focus of adaptation needs to pay attention to the following aspects:

> First: Whether the page function is normal or not
>
> Two: whether the page screen adaptation is normal or not. Three: whether the page behavior is normal (for example, whether the page logic is normal when the user clicks the return button to return to the previous page when browsing the page)
>
> Fourth: Is the grammar used on the page compatible?
>
> Fifth: Is the JSSAPI working properly and perfectly?
>
> Sixth: Focus on whether the relevant logic such as Cookie and Local Storage is normal.
>
> Seven: If the server has settings to return the Cache-Control cache validity time, it needs to check whether the relevant logic is normal.

Normally, your page does not need to be adapted specifically, but if your page involves the following affected logic, it needs to be adapted and validated according to the adaptation recommendations.

JSAPI related adaptation

One: Cache will no longer be supported

Change: Cache jsapi will not be supported in WK Webview for the time being.

Suggestions for adaptation: All developers using this API can remove page-related logic.

2: The page previews pictures through LocalID

Change: It no longer supports previewing images by using the localld returned by the chooseImage api, such as "img SRC = wxLocalResource://50114659201332".

Suggestions for adaptation:

\ 1. In version 6.5.3 and later of iOS Wechat, we use the new jsapi: getLocalImgData to get the image Base64 encoding corresponding to the LocalID and then display it on the front page.

\ 2. If JSSDK is introduced into the page, updating JSSDK to the latest version of 1.2.0 will help the page to adapt automatically. (Currently JSSDk online version is 1.0.0 and 1.1.0, updated version is 1.2.0, [https://res.wx.qq.com/open/js/jweixin-1.2.0.js] ()

Third: When using JSSDK and using wx.config to authorize privileges, we need to pay attention to the failure of jsapi calls.

Change: The internal implementation changes of WKWebview make us make some logical adjustments to the page jsapi permission management in Wechat. There is very little possibility that the normal jsapi permission obtained by authorization before will be abnormal, which will lead to the failure of calling jsapi.

Suggestions for adaptation:

1. iOS Wechat 6.5.1, WK Webview in this version has known the following problems: the page uses HTML 5 History API pushState; popstate; replaceState and other control page navigation (typical single application pages), while using JSSDK wx.config for jsapi authorization, at this time there is a high probability of jsapi invocation failure because of no permission. In 6.5.1, if possible, Anchor hash technology can be used to replace History technology to solve this problem.

2. iOS Wechat 6.5.2 and later versions will not have the above problems, but it can not be 100% confirmed that there are pages using history or hash technology to change the navigation address of pages without such problems, still need the attention of developers.

Cookie and LocalStorage settings are related

One: After withdrawing from Weichat account, all Cookies and Local Storage will be cleared.

Second: Page functionality depends on Cookie, or related logic involving Cookie

Change: Implementing changes within WKWebview will affect the current page Cookie-related logic, such as cross-domain access to Cookie and page resources or image storage servers relying on checking Cookies to return data.

Question Note: When visiting a page A, if page A refers to the resources of another page B (page A and B are different domain names), then page B is considered a third-party page. If you set Cookie in Page B, you will hit the security policy under WK Webview to prevent third parties from setting Cookie across domains, resulting in problems.

Suggestions for adaptation:

In WK Webview, the default is to prevent cross-domain third-party settings of cookies. All the information transmitted through Cookie can be stored in the business background, and then a corresponding access_token encryption code is given to the page to store the information. Then the information is transferred between pages by adding access_token of its own business into Url.

If the resource of the page or the server of the picture storage relies on the checking Cookie to return the data, after switching to WK Web view, long press save in the Wechat or click on the preview image, the set Cookie will not be brought with it completely, which will lead to the failure of picture saving or preview. In addition to this, developers don't have to worry about losing cookies in other situations. All requests will bring complete cookies.

Page Video Window Play

Change: In iOS Wechat 6.5.3 and later versions, Webview defaults to support small window playback.

Developers need to pay special attention to small window playback, which requires the front end to adapt both iOS 10 and lower versions of iOS 10.



WK Web view page behavior is exactly the same as Safari, which will lead to the logical failure or abnormality of the page dependent on UI Web view page behavior: (can be validated in Safari and Wechat WK Web view respectively after implementing the test page according to the logic of the business itself)

One: Page A in Safari or Wechat WK Web View jumps to Page B and returns to Page A without re-executing Script and A Jax (nor triggering page reload).

Second: In Safari or Wechat WKWebview, the resize event of JQuery will be triggered when the page pops up and the keyboard is input, but not in UIWebView.

Third: In Safari or Wechat WK Web view, window unload events can only be triggered by refreshing, and neither exit page nor jump to other pages can be triggered.

Fourth: In Safari or Wechat WK Web View, in very few cases, page clicks with special implementations will fail.

If any of the above problems are involved or encountered, the compatibility with Safari behavior shall prevail.