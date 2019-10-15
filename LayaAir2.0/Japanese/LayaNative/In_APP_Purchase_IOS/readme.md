#IOSアプリ内で購入



IOSアプリ内で購入すると、In App Purrhaseとなります。以下、IAPといいます。

App Storeは、AlipayやWeChat決済などの第三者決済方式をサポートしていませんので、どのエンジンやツールを使って開発しても、最終的にはAppleが提供するIAP方式で取引を完了する必要があります。

Layaboxは開発者がIAP関連インターフェースのデバッグ時間を節約するために、この部分の関連インターフェースを実装し、JavaScript言語を通じて開発者に直接呼び出しまたは拡張を提供しています。

IAPの流れは非常に簡単で、クライアントは直接にApp Storeと通信して取引を完了する。

​![blob.png](1.png)<br/>
図(1)


シングルゲームについては、前回の図はIAPフローを完了しましたが、不正行為の可能性を考慮して開発者は検証のステップを追加できます。

​![blob.png](2.png)<br/>
図(2)

上記の方式を通じて不正行為を防止することができます。だから、開発者は必ず検証のステップを増やすことを提案します。

##参照コード

###1.アプリケーション層JavaScriptでのコード化


```javascript

// JavaScript中 组装充值相关参数. (参数意义参见本文末尾处的附录1)
var json= '{"order_id":"OriderID_20160824_9824","amount":1,"product_id":"Laya.joychina.test","callback_uri":"http://186.152.54.225:8800/Apple.pay"}';
 
// JavaScript中 调用充值函数. (这里会调用原生开发语言中对应的LP_Login方法)
conchMarket.recharge(json,function(jsonString) {
     var pJson = JSON.parse(jsonString);
     console.log("code:"+ pJson .code);
     console.log("product_id:"+ pJson.product_id);
     console.log("amount:"+ pJson.amount);
     console.log("order_id:"+ pJson.order_id);
     console.log("desc:"+ pJson.desc);
});
```


###2.IOSシステム下のObjective-Cで符号化する

（注：LayaNativeでは消耗性商品の一例としてIAPMnager類をご提供しております。参照）


```javascript

// MarketAppStore.mm文件中的LP_CZ方法中添加内购相关代码, 然后在JavaScript中调用conchMarket.recharge就会执行此方法.
//以前版本叫LP_Recharge，因为怕苹果扫描误伤，改成了不专业的拼音 充值
-(void)LP_CZ:(NSString*) jsonParam
{
    // TODO 添加内购相关代码.
}
```


上記の手順により、iOSのIAP機能を簡単に完了することができます。

###3.チャージインターフェースとパラメータの説明：


  `conchMarket.recharge(jsonParam,callBack);`

`jsonParam`パラメータは入力パラメータです。json文字列の場合、Jsonオブジェクトは以下の属性を提供しなければなりません。

|名𞓜タイプ𞓜記述
|-------------------------------------------|
アップルの商品ID（iTunectに設定）
124 amount𞓜number124;購入数量
|orderガイド124; string 124;注文ID（単体版設定空文字列）|
|calbackuuri𞓜サーバ検証アドレス（単体版設定空文字列）|



`callBack`パラメータは買い戻し関数で、json文字列のパラメータをフィードバックします。json属性は以下の通りです。

|名𞓜タイプ𞓜記述
|------|-----------------------------|
124コードnumber成功は0で、失敗は-1 124です。
アップルの商品ID（iTunectに設定）
124 amount𞓜number124;購入数量
|orderガイド124; string 124;注文ID 124;
|desc124; string 124;成功「success」、失敗「error」124;

###4.注意事項：

iOSのIAP機能はLayaNativeエンジンの核心機能ではありません。この部分のコードも開放されています。開発者は自分の需要に応じて自分で修正できます。例えば、チャージ問題が発生したら、LayaBoxはbugを探す責任がありません。法律に関する問題はありません。
