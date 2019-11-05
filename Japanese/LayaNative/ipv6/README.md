#iOSのipv 6について
アップルは2016年6月1日から、ipv 6標準を強制的に実行していますので、開発者がプロジェクトを発表する際には、http要請とsocketはドメイン名を使用しなければなりません。ipアドレスは使用できません。
開発者はappStoreを提出する前に、ipv 6が正常かどうかをテストする必要があります。テスト方法はアップルの公式文書または以下の文書を参照してください。

  



[ipv6测试方法官方文档](https://developer.apple.com/library/mac/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/UnderstandingandPreparingfortheIPv6Transition/UnderstandingandPreparingfortheIPv6Transition.html%3Ch1%3E//apple_ref/doc/uid/TP40010220-CH213-SW1)  



**友情のヒント:**  
1.多くの開発者の反応があります。自分はアップルの公式サイトでipv 6をテストするのはOKですが、アップルにipv 6がアクセスできないので、無情に断られました。このような現象が発生した場合、開発者はipv 6対応のウェブサーバを交換する必要があります。
2.開発者のサーバーが中国に設置されていたら、アップルが審査の時に訪問がとても遅くなります。この時も審査に影響を与える可能性があります。二つの方法があります。試してみてもいいです。
＊（1）、国外にサーバーを設置し、審査が通過したら、ドメイン名を中国に向ける。
*（2）、プロジェクトのリソースを地元のアプリにパッケージ化することで、ダウンロードリソースを避けることができます。[打包资源](https://ldc.layabox.com/doc/?nav=ch-as-5-2-0)



