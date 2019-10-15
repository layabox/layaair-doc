#Mise au point secondaire au moyen d 'un mécanisme de réflexion

Layanative aide le developpeur en mettant en place un mécanisme de réflexion qui lui permet d 'effectuer un second developpement.

##Appel à des fonctions statiques

Au moyen de layanative, une fonction statique peut être établie par la langue de développement originale de l 'extrémité mobile (Java sous Android, objective - C sous iOS) dans la couche JavaScript.

####1.1 couche javascript:

La couche JavaScript est appelée de la manière suivante:


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



####1.2 couche Android / java

Ajouter la fonction suivante dans la classe jsbridge:


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


####2.1.4 couche iOS / OC

Ajouter la fonction suivante dans la classe jsbridge:


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

Attention:
Les paramètres de la fonction ne prennent en charge que les types de base tels que booléen, point flottant, chaîne de caractères et supportent les valeurs de retour.La fonction d 'origine fonctionne dans la ligne de script, et la mise à jour de l' ui doit être transférée à la ligne UI pour prendre en charge la fonction de retour asynchrone.
Le suffixe du fichier source oc doit être remplacé par. Mm, et le procédé oc est une méthode de type statique +.


Le procédé décrit ci - dessus permet d 'effectuer facilement le développement secondaire associé au code original.


##Mise en œuvre active des scripts JS par le Code de la plate - forme Android / iOS

###3.1 Mise en œuvre des scripts JS de l'IOS / OC


```javascript

  [[conchRuntime GetIOSConchRuntime] runJS:@"alert('hello')"];
```


###3.2 exécution du script JS par Android / java


```javascript

  ConchJNI.RunJS("alert('hello world')");
```


