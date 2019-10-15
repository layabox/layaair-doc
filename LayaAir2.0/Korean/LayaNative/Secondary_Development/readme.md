#반사 메커니즘으로 2차 개발을 실현하다

LayaNative 반사 메커니즘을 통해 개발자를 편리하게 2차 개발할 수 있도록 도와주고, 다음은 시례를 통해 두 번째 개발을 진행할 수 있는지 알아보자.

##1. 정적 함수 호출

LayaNative 사용하면 자바스크립트 계열 이동 원생 개발 언어 (Android 아래 자바, iOS 아래 Objecive-C) 가 작성한 정적 함수.

####1.1 자바스크립트 층:

자바스크립트의 호출 방식:


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



####1.2 앤드로이드/자바 층

JSBridge 에 다음 함수를 추가합니다:


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


####2.1.4 iOS/OC 층

JSBridge 에 다음 함수를 추가합니다:


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

주의:
함수 인자가 부르, 부점, 문자열 등 기본 유형만 지원하고 반환 값을 지원합니다.원생 함수는 스크립트 라인에서 실행하고 UI 라인을 업데이트하고 비동기 회신 함수를 지원합니다.
OC 원본 파일 접미사가 mm 로 바뀌고, OC 는 정적 방법으로 사용해야 한다.


이런 방법으로 원생 코드 관련 2차 개발이 편리하다.


##3. 플랫폼 코드 (android / ios) 자발적으로 js 스크립트 실행

###3.1 IOS/OC JS 스크립트 실행


```javascript

  [[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```


###3.2 앤드로이드/자바 집행 JS 스크립트


```javascript

  ConchJNI.RunJS("alert('hello world')");
```


