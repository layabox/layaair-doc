# 用反射机制实现二次开发

    LayaNative通过提供反射机制来帮助开发者可以方便的进行二次开发, 下面通过示例来了解一下如何进行二次开发.

## 1. 调用静态函数

    使用LayaNative, 可以在JavaScript层调用移动端的原生开发语言(Android下Java, iOS下Objective-C)编写的静态函数。

####    1.1 JavaScript层:

    JavaScript层的调用方式:

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


####     1.2 Android/Java层

    在类JSBridge中添加下列函数:

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
####     2.1.4 iOS/OC层

    在类JSBridge中添加下列函数:

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

注意：OC源文件后缀要改成.mm，OC的方法是静态的类方法要用+。


  通过上述方法可以很方便的进行原生代码相关的二次开发, 此外, LayaNative为了帮助开发者节省更多的时间, 封装了conchMarket全局类, 让开发者可以更方便的对接渠道。


##  3.平台代码（android/ios）主动执行js脚本

###     3.1 IOS/OC执行JS脚本

```javascript
  [[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```

###     3.2 Android/Java执行JS脚本

```javascript
  ConchJNI.RunJS("alert('hello world')");
```

