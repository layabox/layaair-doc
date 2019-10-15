#反射機構で二次開発を実現

LayaNativeは反射機構を提供することによって開発者が簡単に二次開発ができるようになります。次の例を通して、二次開発の方法を調べてみます。

##1.静関数の呼び出し

LayaNativeを使用して、JavaScript層でモバイル端末の原生開発言語（AndroidでJava、iOSでObjective-C）で作成された静的関数を呼び出すことができます。

####1.1 JavaScript層：

JavaScript層の呼び出し方法：


```javascript


  var os = conchConfig.getOS();
  var bridge;
  var obj = {};
  if (os == "Conch-ios") {
      bridge = PlatformClass.createClass("JSBridge");//创建脚步代理
  }
  else if (os == "Conch-android") {
    //需要完整的类路径，注意与iOS的不同
    bridge = PlatformClass.createClass("demo.JSBridge");//创建脚步代理
  } 

  if (os == "Conch-ios") {
    //iOS注意函数签名，注意与Android的不同
    alert(bridge.call("testString:","hello"));
    alert(bridge.call("testNumber:",256.0));
    alert(bridge.call("testBool:",false));
    obj.value = "Hello OC!";
    bridge.callWithBack(function(value) {
      var obj = JSON.parse(value)
      alert(obj.value);
      },"testAsyncCallback:", JSON.stringify(obj));
  }
  else if (os == "Conch-android") {
    alert(bridge.call("testString","hello"));
    alert(bridge.call("testNumber",256.0));
    alert(bridge.call("testBool",false));
    obj.value = "Hello Java!";
    bridge.callWithBack(function(value) {
      var obj = JSON.parse(value)
      alert(obj.value);
    },"testAsyncCallback",JSON.stringify(obj));
  } 

```



####1.2 Android/Java層

クラスJSBridgeに下記の関数を追加します。


```javascript

    public static String testString(String value) {
        Log.d("JSBridge", "java: " + value);
        return "LayaBox";
    }
    public static double testNumber(double value) {
        Log.d("JSBridge", "java: " + value);
        return 512;
    }
    public static boolean testBool(boolean value) {
        Log.d("JSBridge", "java: " + value);
        return value ? false : true;
    }
    public static void testAsyncCallback(String json) {
        //js thread
        try {
            JSONObject root = new JSONObject(json);
            Log.d("JSBridge", "java: " + root.getString( "value" ));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        //ui thread update ui
                        JSONObject obj = new JSONObject();
                        try {
                            obj.put("value", "Hello JS!");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        ExportJavaFunction.CallBackToJS(JSBridge.class,"testAsyncCallback", obj.toString());
                    }
                });
    }
```


####2.1.4 iOS/OC層

クラスJSBridgeに下記の関数を追加します。


```javascript

    +(NSString*)testString:(NSString*)value
    {
      NSLog(@"OC: %@",value);
      return @"LayaBox";
    }
    +(NSNumber*)testNumber:(NSNumber*)value
    {
      NSLog(@"OC: %@",value);
      return @512;
    }
    +(NSNumber*)testBool:(NSNumber*)value
    {
      NSLog(@"OC: %d",value.boolValue);
      return [NSNumber numberWithBool:value.boolValue ? NO : YES];
    }
    +(void)testAsyncCallback:(NSString*)json
    {
      //js thread
      NSError* error = nil;
      NSData* jsonData = [json dataUsingEncoding:NSUTF8StringEncoding];
      NSDictionary* dict = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&error];
      NSLog(@"OC: %@", [dict objectForKey:@"value"]);
      dispatch_async(dispatch_get_main_queue(), ^{
          //ui thread
          NSError* error = nil;
          NSDictionary* dic = [NSDictionary dictionaryWithObject:@"Hello JS!" forKey:@"value"];
          NSData* jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];
          NSString* jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
          [[conchRuntime GetIOSConchRuntime] callbackToJSWithClass:self.class methodName:@"testAsyncCallback:" ret:jsonStr];
      });
  }

```

注意:
関数パラメータは、ブール、浮動小数点、文字列などの基本タイプのみをサポートします。戻り値をサポートします。オリジナル関数はスクリプトスレッドで動作し、UIを更新するにはUIスレッドに移動し、非同期のコールバック関数をサポートする必要がある。
OCソースファイルの拡張子を.mmに変更します。OCの方法は静的な種類の方法で＋を使います。


上記の方法により、生コードに関する二次開発が容易に行えます。


##3.プラットフォームコード（android/ios）自主的にjsスクリプトを実行する

###3.1 IOS/OCはJSスクリプトを実行する


```javascript

  [[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```


###3.2 Android/JavaがJSスクリプトを実行する


```javascript

  ConchJNI.RunJS("alert('hello world')");
```


