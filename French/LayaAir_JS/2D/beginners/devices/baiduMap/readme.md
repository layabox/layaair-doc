#Afficher la position actuelle à l 'aide d' une carte de Baidu

> Cette section montre l 'emplacement actuel sur la carte de Baidu à l' aide de watchposition ().La méthode de surveillance provient de l'API.**Avant d 'apprendre ce festival, lisez le document de base geologue ou geologue API.**
]

Avant de commencer, il est nécessaire d 'introduire le script de la carte Baidu dans l' index.html, qui est disponible gratuitement sur le site Web officiel de la carte.URL utilisé dans la présentation[http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6](http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6)

### **I. Présentation des variables membres**


```java

// 百度地图的API
var map;                              // 地图引用
var marker;                           // 地图标注物
var BMap = Laya.Browser.window.BMap;       // 百度地图命名空间
var convertor = new BMap.Convertor(); // 坐标转换接口
 
var mapDiv; // 包含百度地图的div容器
```


###Ensuite, la fonction de construction:


```java

Laya.init(1, 1);

// 使用高精度位置
Laya.Geolocation.enableHighAccuracy = true;
Laya.Geolocation.watchPosition(Laya.Handler.create(this, updatePosition), Laya.Handler.create(this, onError));

// 绑定作用域
convertToBaiduCoord = convertToBaiduCoord.bind(this);
```


Etant donné que l 'élément d' affichage de layaair n 'est pas nécessaire dans ce cas, la dimension de scène est fixée à 1.L 'initialisation de l' interface de carte Baidu est placée dans init ().La position du dispositif d 'écoute est ensuite modifiée.Enfin, il convient de noter que la fonction convertttobaiducoord () Convertit les coordonnées obtenues en coordonnées de carte de Baidu, car elle est un paramètre de convertor.translate () qui modifie le champ d 'action au moment du déclenchement et qui, par conséquent, détermine le champ d' action de la fonction.

#####2.1 init, fonction:


```java

function init() {
    mapDiv = Laya.Browser.createElement("div");
    Laya.Browser.document.body.appendChild(mapDiv);

    // 适应窗口尺寸
    refit();
    Laya.stage.on(Laya.Event.RESIZE, this, refit);

    // 初始化地图
    map = new BMap.Map(mapDiv);

    // 禁用部分交互
    //map.disableDragging();
    map.disableKeyboard();
    map.disableScrollWheelZoom();
    map.disableDoubleClickZoom();
    map.disablePinchToZoom();
    // 初始地点北京，缩放系数15
    map.centerAndZoom(new BMap.Point(116.32715863448607, 39.990912172420714), 15);

    // 创建标注物
    marker = new BMap.Marker(new BMap.Point(0, 0));
    map.addOverlay(marker);
}
```


Init () Initialisez la carte de Baidu de la fonction.La plupart des fonctions interactives ont été supprimées, laissant une carte glissante.Le site initial de la carte se trouve à Beijing, coefficient d 'échelle 15.Et ajoute un indicateur de carte.

#####2.2 refit, fonction:


```java

function  refit() {
    mapDiv.style.width  =  Laya.Browser.width  /  Laya.Browser.pixelRatio  +  "px";
    mapDiv.style.height  =  Laya.Browser.height  /  Laya.Browser.pixelRatio  +  "px";
}
```


Refit () remplit la carte de Baidu de toute la fenêtre, qui sera de nouveau remplie lorsque l 'événement resize sera détecté.

#####2.3 updatepposition, fonction:


```java

// 更新设备位置
function  updatePosition(p) {
    // 转换为百度地图坐标
    var  point  =  new  BMap.Point(p.longitude,  p.latitude);
    // 把原始坐标转换为百度坐标，部分设备的浏览器可能获取到的是谷歌坐标，这时第三个参数改为3才是正确的。
    convertor.translate([point],  1,  5,  convertToBaiduCoord);
}
```


Updateposition () est une fonction de déclenchement de geologation.watchposition () qui exige que les coordonnées initiales acquises soient converties en coordonnées de pourcentage à chaque fois qu 'une modification de position est observée pour afficher la position correcte sur la carte de pourcentage.

Note que les coordonnées obtenues par le navigateur du matériel peuvent être celles de Google, alors que le troisième paramètre de convertor.translate n 'est pas 5, mais 3.

#####2.4 convertttobaiducoord, fonction:


```java

// 将原始坐标转换为百度坐标
function  convertToBaiduCoord(data) {
    if  (data.status  ==  0) {
        var  position  =  data.points[0];
        // 设置标注物位置
        marker.setPosition(position);

        map.panTo(position);
    }
}
```


Une fois la transition terminée, la position de l 'élément d' étiquette est définie et l 'angle de vision est déplacé vers une vue centrée sur l' objet d 'étiquette.

#####2.5 OnError, fonction:


```java

function  onError(e) {
    var  errType;
    if  (e.code  =  Laya.Geolocation.PERMISSION_DENIED)
        errType  =  "Permission Denied";
    else  if  (e.code  ==  Laya.Geolocation.POSITION_UNAVAILABLE)
        errType  =  "Position Unavailable";
    else  if  (e.code  ==  Laya.Geolocation.TIMEOUT)
        errType  =  "Time Out";
    alert('ERROR('  +  errType  +  '): '  +  e.message);
}
```


Une fois les étapes ci - dessus achevées, l 'effet de visualisation peut être affiché sur le navigateur du dispositif.Si l 'emplacement est erroné, Essayez les coordonnées obtenues comme des coordonnées Google.Attention aux limites de sécurité du navigateur lui - même, il peut être nécessaire que l 'utilisateur autorise manuellement l' utilisation d 'une position géographique sur le site Web ou que chrome ait besoin d' une adresse de protocole HTTPS pour pouvoir l 'utiliser.