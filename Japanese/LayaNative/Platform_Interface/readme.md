#反射機構でNative APPチャネルをドッキングする

LayaNativeは反射機構によって開発者にドッキングチャネルのインターフェースを提供しています。以下の内容はドッキングチャネルの商店街を実現することによって、反射メカニズムを利用してドッキングチャネルの仕事を完成する方法を詳しく紹介しています。

###1.ドッキングルートのショッピングセンター

LayaNativeはすでに反射機構によってJavaScriptと原生開発言語（AndroidでJava、iOSでObjective-C）との相互呼出しを実現しました。開発者は残りの原生開発言語（AndroidでJava、iOSでObjective-C）部分の開発作業を完成するだけです。

####1.1 iOSシステムにおけるドッキングチャネルのショッピングモールの実現：

#####Part.1-クラス名反射：

LayaNativeで構築されたiOSプロジェクトプロジェクトでは、PlatformInterfaceディレクトリの下に自動作成されたMarket AppStore類が見られます。このクラスはLayaplatformInterface類から継承されています。そして、resource/config.iniにplotem Class Name=MarketApStoreを設置しました。このように、私達はlognメソッドを元にします。ginメソッドの二次開発

#####Part 2-JavaScript呼び出しOC:

やはり上述のlogin方法を例にとって、JavaScriptでは、conchMarket類で呼び出されるlogin方法は、実際にLayaplatformInterfaceでLPメソッドを呼び出しています。このプロセスは、JavaScriptでOCを呼び出すプロセスです。

#####Part 3-OC呼び出しJavaScript:

上記のlogin方法を例にとって、JavaScriptでは、conchMarket類で呼び出されたlogin方法で実行後にコールバック方法が実行されます。このコールバック方法はLayaplatformCallbackで宣言し、LayaplatformInterfaceのLP uLoginでLayaplatformCallbackの呼び出し方法を実現します。

#####Part 4-コードセグメント:


```javascript

// JavaScript中调用方式: conchMarket.login([参数], [回调函数]) ;
var sData={type:"test"};
window.conchMarket.login(JSON.stringify(sData),function(data){
console.log(data);
// TODO 数据处理.
});
```



```javascript

// MarketAppStore.mm文件中根据自己需求添加相关代码到LP_Login方法中, JavaScript中调用conchMarket.login就会执行LP_Login方法.
-(void)LP_Login:(NSString*)jsonParam{
// TODO 调用第三方平台的登陆的登陆接口
// OC层调用登录结束回调.
[[LayaPlatformCallback GetInstance] LP_LoginCallback:pJsonString];
}
```


####1.2 Androidシステムにおけるドッキングチャネルのショッピングモールの実現：

#####Part.1-クラス名反射：

LayaNativeによって構築されたAndroidプロジェクトプロジェクトの中で、layaair.game.Marketパッケージに自動的に作成されたMarket Test類があります。この種類はLayaplatform Interface類から継承されています。私達はlogin方法を例にとって、MarketTest.javaでLP Login方法を書き換えるだけで、login方法を完成しました。

#####Part 2-JavaScript呼び出しJava:

やはり上述のlogin方法を例にとって、JavaScriptでは、conchMarket類で呼び出されるlogin方法は、実際にLayaplatformInterfaceでLPメソッドを呼び出します。このプロセスはJava ScriptでJavaを呼び出すプロセスです。すなわち、conchMarket.login=LayaplatformInterfaceのLPメソッドです。

#####Part 3-Java呼び出しJava Script:

上記のlogin方法を例にとって、JavaScriptでは、conchMarket類で呼び出されたloginメソッドを実行した後、コールバック方法を実行します。このコールバック方法はLayaplatformCallbackで宣言し、LayaplatformInterfaceのLPuLoginでLayaplatformCallbackを呼び出します。=>LayaplatformCallbackのLPギャルCallback。

#####Part 4-コードセグメント:


```javascript

// JavaScript中调用方式: conchMarket.login([参数], [回调函数]) ;
var sData={type:"test"};
window.conchMarket.login(JSON.stringify(sData),function(data){
console.log(data);
// 数据处理.
});
```



```javascript

// MarketTest.java文件中根据自己需求添加相关代码到LP_Login方法中, JavaScript中调用conchMarket.login就会执行LP_Login方法.
public void LP_Login(final String jsonParam)
{
// 调用第三方平台的登陆的登陆接口
// Java层调用登录结束回调.
LayaPlatformCallback.GetInstance().LP_LoginCallback(objCallBack.toString());
}
```


###2.コネクションチャネルのAPI統合

LayaNativeが提供する反射機構によって、開発者は異なるチャネルのいくつかのよく使われるAPI（例えば、ログイン、共有、チャージなど）をJavaScript層で統一したインターフェースを作って、システムの原生開発言語を使って、LayaNativeはconchMarket全局類を通じてドッキングチャネルに関連するAPIを統合して、開発者に便利に使うことができます。

（注：インターフェース対応のオリジナル開発言語（AndroidでJava，iOSでObjective-C）の部分のコード作業は、二次開発中のコード例を参照してください。）

|APIの名前𞓜APIは、124; APIのプロトタイプ124;を説明します。
|------------------------|--------------------------|
|init|初期化Market|`conchMarket.init(JSON.stringify(sData),function(data));`𞓜
124 logn 124がログインしています。`conchMarket.login(JSON.stringify(sData),function(data));`𞓜
124 logout𞓜登𞓜`conchMarket.logout(JSON.stringify(sData),function(data));`𞓜
|switch User𞓜切り替えユーザ`conchMarket.switchUser(JSON.stringify(sData),function(data));`𞓜
|enterPlatformが第三者のプラットフォームに入る。`conchMarket.enterPlatform(JSON.stringify(sData),function(data));`𞓜
124 enterBBS 124がフォーラムに入る。`conchMarket.enterBBS(JSON.stringify(sData),function(data));`𞓜
|enterFeedback 124;フィードバック`conchMarket.enterFeedback(JSON.stringify(sData),function(data));`𞓜
|enterAcceountMgrアカウント管理に入る`conchMarket.enterAccountMgr(JSON.stringify(sData),function(data));`𞓜
|authorize授権𞓜`conchMarket.authorize(JSON.stringify(sData),function(data));`𞓜
|refsh Token|リフレッシュtoken 124;`conchMarket.refreshToken(JSON.stringify(sData),function(data));`𞓜
|recharge（1.0.4 czに変更）|チャージ`conchMarket.recharge(JSON.stringify(sData),function(data));`𞓜
124 buyProps 124が道具を買う。`conchMarket.buyProps(JSON.stringify(sData),function(data));`𞓜
|setRechargInfo（1.0.4 setCZinfoに変更）|設定チャージ情報|`conchMarket.setRechargeInfo(JSON.stringify(sData),function(data));`𞓜
|enterShare AndFeed|シェア`conchMarket.enterShareAndFeed(JSON.stringify(sData),function(data));`𞓜
|enterInvite124;招待`conchMarket.enterInvite(JSON.stringify(sData),function(data));`𞓜
友達リストを獲得しました。`conchMarket.getGameFriends(JSON.stringify(sData),function(data));`𞓜
𞓜sendToDesktop 124;がデスクトップに送信されます。`conchMarket.sendToDesktop(JSON.stringify(sData),function(data));`𞓜
124 sendMessage ToPlatform|がメッセージを送信します。`conchMarket.sendMessageToPlatform(JSON.stringify(sData),function(data));`𞓜
|canSendToDesktop|はpusiconかどうか`conchMarket.canSendToDesktop(JSON.stringify(sData),function(data));`𞓜
|opentopicCircule 124;が話題の輪を広げる`conchMarket.openTopicCircle(JSON.stringify(sData),function(data));`𞓜

**付録:**

[对接渠道demo for Eclipse(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForEclipse.zip)

[对接渠道demo for AndroidStudio(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForAndroidStudio.zip)