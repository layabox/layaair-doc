#Système de recherche

###### *version :2.2.0bate4   Update:2019-9-11*

Un algorithme de recherche automatique Astar de tiers peut être utilisé à layaair3d.([demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Advance&name=AStarFindPath)- Oui.

Dans cet exemple, nous avons utilisé l 'elfe X et le point Z le plus petit comme point d' origine associé à la carte de protection.Le point situé dans le coin supérieur gauche et centre de la figure 1.

[] (IMG / 1.png) (Figure 1) <br >

> chargement terminé, réglage du Masquage et


```typescript

 private function onLoadFinish():void {
     .......//前面摄影机，猴子精灵相关操作忽略
 	var heightMap:Texture2D = Loader.getRes("res/threeDimen/scene/TerrainScene/Assets/HeightMap.png") as Texture2D;
    //初始化MeshTerrainSprite3D
    terrainSprite = MeshTerrainSprite3D.createFromMeshAndHeightMap(meshSprite3D.meshFilter.sharedMesh as Mesh, heightMap, 6.574996471405029, 10.000000953674316);
    //更新terrainSprite世界矩阵(为可行走区域世界矩阵)
    terrainSprite.transform.worldMatrix = meshSprite3D.transform.worldMatrix;
    //读取墙壁的数据
    aStarMap = Loader.getRes("res/threeDimen/scene/TerrainScene/Assets/AStarMap.png");
     //通过遮挡图生成astar网格数据
     var aStarArr:Array = createGridFromAStarMap(aStarMap);
     //使用astar组织数据
     graph = new Browser.window.Graph(aStarArr);
     opts = {};
     opts.closest = true;
     opts.heuristic = Browser.window.astar.heuristics.diagonal;
     ......
 }
```


> génération d 'écran


```typescript

/**
* 通过图片数据计算得到AStar网格
*/
private function createGridFromAStarMap(texture:Texture):Array {
    var textureWidth:int = texture.width;
    var textureHeight:int = texture.height;
    //读取图片像素
    var pixelsInfo:Uint8Array = texture.getPixels();
    var aStarArr:Array = new Array();
    var index:int = 0;
    //像素值为黑色不可通行，白色部分可以通行
    for (var w:int = 0; w < textureWidth; w++) {
        var colaStarArr:Array = new Array();
        aStarArr[w] = colaStarArr;
        for (var h = 0; h < textureHeight; h++) {
            var r:int = pixelsInfo[index++];
            var g:int = pixelsInfo[index++];
            var b:int = pixelsInfo[index++];
            var a:int = pixelsInfo[index++];
            if (r == 255 && g == 255 && b == 255 && a == 255)
                colaStarArr[h] = 1;
            else {
                colaStarArr[h] = 0;
            }
        }
    }
	return aStarArr;
}
```



> ecouter l 'événement de la souris et convertir les données de trajet du monde 3D correspondant par l' intermédiaire des données de trajet de l 'étoile a


```typescript

//监听鼠标抬起
Laya.stage.on(Event.MOUSE_UP, this, function():void {
    index = 0;
    //获取每次生成路径
    getGridIndex(path[curPathIndex % pointCount].x, path[curPathIndex++ % pointCount].z, startPoint);
    getGridIndex(path[nextPathIndex % pointCount].x,path[nextPathIndex++ % pointCount].z, endPoint);
			
    //开始于结束点数据
    var start:Object = graph.grid[startPoint.x][startPoint.z];
    var end:Object = graph.grid[endPoint.x][endPoint.z];
    //生成路径
    _everyPath = Browser.window.astar.search(graph, start, end, {
                  closest: opts.closest
                 });
    if (_everyPath && _everyPath.length > 0) {
         getRealPosition(start, _everyPath);
    }
});
```

> l 'index de grille correspondant est converti par X, Z dans le monde 3D et converti par le trajet Astar en trajet 3D dans le monde 3D


```typescript

/**
 * 得到整数的网格索引
 */
private function getGridIndex(x:int, z:int,out:Vector2):void{
    var minX:int = terrainSprite.minX;
    var minZ:int = terrainSprite.minZ;
    var cellX:Number = terrainSprite.width / aStarMap.width;
    var cellZ:Number = terrainSprite.depth / aStarMap.height;
    var gridX:int = Math.floor((x - minX) / cellX);
    var gridZ:int = Math.floor((z - minZ) / cellZ);
    var boundWidth:int = aStarMap.width - 1;
    var boundHeight:int = aStarMap.height - 1;
    (gridX > boundWidth) && (gridX = boundWidth);
    (gridZ > boundHeight) && (gridZ = boundHeight);
    (gridX < 0) && (gridX = 0);
    (gridZ < 0) && (gridZ = 0);
   	out.x = gridX;
	out.y = gridZ;
}

/**
 * 得到世界坐标系下的真实坐标
 */
private function getRealPosition(start, path):void{
    var resPath:Array = new Array();
    var minX:Number = terrainSprite.minX;
    var minZ:Number = terrainSprite.minZ;
    var cellX:Number = terrainSprite.width / aStarMap.width;
    var cellZ:Number = terrainSprite.depth / aStarMap.height;
    var halfCellX:Number = cellX / 2;
    var halfCellZ:Number = cellZ / 2;
    
    resPath[0].x = start.x * cellX + halfCellX + minX;
    resPath[0].z = start.y * cellZ + halfCellZ + minZ;
    
   if(resPath.length < path.length ){//如果预先准备的Vector2不够
       var diff:int = path.length - resPath.length;
       for(var j:int = 0; j < diff; j++){
           var newPoint:Vector2 = new Vector2();
           this.resPath.push(newPoint);
       }
   }

    for (var i:int = 1; i < path.length; i++) {
        var gridPos = path[i];
        resPath[i].x = gridPos.x * cellX + halfCellX + minX;
        resPath[i].y = gridPos.y * cellZ + halfCellZ + minZ;
    }
}
```


Plus le trajet généré par la carte de masquage est détaillé, mais il faut aussi plus d 'opérations, l' développeur peut choisir en fonction de ses besoins personnels.


[] (IMG / 1.gif) <br > (Figure 1)

