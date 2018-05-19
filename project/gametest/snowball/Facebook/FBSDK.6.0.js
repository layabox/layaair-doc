var FBSDK = {};
var LayaCommon = {};
FBSDK.basicInfo = {};
var LayaVersion = "6.0";

/**
 * 初始化
 * 应当在其他 API 使用前调用
 * option:relatedId,openId,openKey,login
 * */
FBSDK.initializeAsync = function(option,callback) {
    LayaCommon.loadScript("https://connect.facebook.net/en_US/fbinstant." + LayaVersion + ".js", function(){
        if(option.login) {
            FBSDK.basicInfo["relatedId"] = option.relatedId;
            FBInstant.initializeAsync().then(function() {
                LayaCommon.getAccessToken(option.openId, option.openKey,function(data){
                      LayaCommon.getGInfoByRelId(function(data){
                        FBSDK.login(function(){
                            callback&&callback(data);
                        })
                    });
                });
            }).catch(function(error){
                callback&&callback(error);
            });
        } else {
            FBInstant.initializeAsync().then(function() {
                callback&&callback({result:0});
            }).catch(function(error){
                callback&&callback(error);
            });
        }
    })
}


FBSDK.login = function(callback,option){
    var loginResult = {};
    loginResult.data = {};
    loginResult.data.locale =  FBSDK.getLocale();
    loginResult.data.spuid = FBSDK.player.getID();
    loginResult.data.nickName = FBSDK.player.getName();
    loginResult.data.avatarUrl =  FBSDK.player.getPhoto();//人物头像
    loginResult.data.platform = FBSDK.getPlatform();
    loginResult.data.type = FBSDK.context.getType();
    loginResult.data.SDKVersion = FBSDK.getSDKVersion();
    if(option && option.loginType) {
        loginResult.result = 0;
        loginResult.desc = "";
        callback && callback(loginResult)
    } else {
        var url = "https://ucenter.layabox.com/api/reglogin" +
            "?spuid=" + FBSDK.player.getID() +
            "&sp=" + FBSDK.gameInfo["sp"] +
            "&nickname=" + encodeURIComponent(FBSDK.player.getName() || "") +
            "&photo=" + encodeURIComponent(FBSDK.player.getPhoto() || "") +
            "&os=" + "" +
            "&osver=" + "" +
            "&imei=" + "" +
            "&imsi=" + "" +
            "&mac=" + "" +
            "&sptoken=" + "" +
            "&ip=" + "" +
            "&typeId=2&access_token=" + FBSDK.basicInfo["access_token"] +
            "&gameId=" + FBSDK.gameInfo["gameId"] +
            "&isvip=" + "" +
            "&city=" + "" +
            "&sex=" + "" +
            "&language="+FBSDK.getLocale()+"&province=" + "" +
            "&country=" + "" +
            "&headimg=" + encodeURIComponent(FBSDK.player.getPhoto() || "") +
            "&mobile=" + "" +
            "&email=" + "" +
            "&equipmentNum=" + "" +
            "&other="+ "" +
            "&SpFname=" + FBSDK.gameInfo["spFname"];

        LayaCommon.getJson(url, function (param) {
            loginResult.result = param.ret;
            loginResult.desc = param.msg;
            loginResult.data.userId = param.data.userId;
            callback && callback(loginResult)
        });
    }

}
/**
 * 获取用户信息方法
 */
FBSDK.getUserInfo = function(){
    var userInfo = {};

    userInfo.locale =  FBSDK.getLocale();
    userInfo.uid = FBSDK.player.getID();
    userInfo.nickName = FBSDK.player.getName();
    userInfo.avatarUrl =  FBSDK.player.getPhoto();//人物头像
    userInfo.platform = FBSDK.getPlatform();
    // userInfo.type = FBSDK.context.getType();
    userInfo.SDKVersion = FBSDK.getSDKVersion();
    return userInfo;
}

/**
 * 用户信息
 */
FBSDK.player = new Object();

/**
 * 当前游戏的来源信息   房间
 */
FBSDK.context = new Object();

/**
 * 支付信息
 **/
FBSDK.payments = new Object();

/**
 * 广告
 */
FBSDK.Interstitial = null;
FBSDK.InterstitialLoad = false;
FBSDK.InterstitialShow = false;

FBSDK.Rewarded = null;
FBSDK.RewardedLoad = false;
FBSDK.RewardedShow = false;

/* --------------------- 用户数据 Player start ------------------------ */
/**
 * 玩家的唯一标识ID
 */
FBSDK.player.getID = function(){
    return FBInstant.player.getID();
}

/**
 * 获取玩家的唯一ID和一个签名，签名用来验证该 ID 是否来自 Facebook ，是否被篡改。
 * 返回SignedPlayerInfo
 */
FBSDK.player.getSignedPlayerInfoAsync = function(requestPayload, callback){

    FBInstant.player.getSignedPlayerInfoAsync(requestPayload)
        .then(function (result) {
                // The verification of the ID and signature should happen on server side.
                callback && callback(result);
        }).catch(function(error){
            callback&&callback(error);
        })
}
/**
 * 获取用户在Facebook上的的名字，使用用户的语言种类显示
 */
FBSDK.player.getName = function(){
    return FBInstant.player.getName();
}
/**
 * 获取用户在Facebook上的头像的url，头像为正方形，最小尺寸为200x200
 * The value will always be null until FBInstant.startGameAsync() resolves.
 */
FBSDK.player.getPhoto = function() {
    return FBInstant.player.getPhoto();
}
/**
 * 取回在facebook储存的当前用户的数据
 * @param keys 数据的 key 的数组
 */
FBSDK.player.getDataAsync = function(keys,callback){

    FBInstant.player
        .getDataAsync(keys)
        .then(function(data) {
            callback && callback(data)
        }).catch(function(error){
            callback&&callback(error);
        });
}
/**
 * 把当前用户的数据储存到facebook。
 * @param data 包含key-value的数据对象.
 */
FBSDK.player.setDataAsync = function(data,callback){
    FBInstant.player.setDataAsync(data)
        .then(function() {
            callback&&callback();
        }).catch(function(error){
            callback&&callback(error);
        });
}
/**
 * 立刻保存数据
 */
FBSDK.player.flushDataAsync = function(callback){
    FBInstant.player.flushDataAsync()
        .then(function() {
            callback&&callback();
        }).catch(function(error){
            callback&&callback(error);
        });
}
/**
 * 从指定云存储检索当前玩家的统计数据。
 */
FBSDK.player.getStatsAsync = function(keys, callback){
    FBInstant.player
        .getStatsAsync(keys)
        .then(function(stats) {
            callback && callback(stats);
        }).catch(function(error){
            callback&&callback(error);
        });
}
/**
 * 设置要保存到指定云存储的当前玩家 的统计数据。
 */
FBSDK.player.setStatsAsync = function(data, callback){
    FBInstant.player
        .setStatsAsync(data)
        .then(function() {
            callback && callback();
        }).catch(function(error){
            callback&&callback(error);
        });
}

/**
 * 保存到指定云存储的当前玩家 的增量统计数据。
 */
FBSDK.player.incrementStatsAsync = function(data, callback){
    FBInstant.player
        .incrementStatsAsync(data)
        .then(function(stats) {
            callback && callback(stats)
        }).catch(function(error){
            callback&&callback(error);
        });
}
/**
 * 获取玩家同玩好友的信息
 * 返回的值是数组[ConnectedPlayer]
 */
FBSDK.player.getConnectedPlayersAsync = function(callback){
    FBInstant.player.getConnectedPlayersAsync()
        .then(function(players) {
            callback&&callback(players.map(function(player) {
                return {
                    id: player.getID(),
                    name: player.getName(),
                    avatarUrl:player.getPhoto()
                }
            }));
        }).catch(function(error){
            callback&&callback(error);
        });
}
/* --------------------- 用户数据 Player end ------------------------ */

/* --------------------- 对战场景 Context start ------------------------ */
/**
 * 当前游戏的唯一id
 */
FBSDK.context.getID = function(){
    return FBInstant.context.getID();
}
/**
 * 游戏上下文的类型："POST" | "THREAD" | "GROUP" | "SOLO"
 */
FBSDK.context.getType = function(){
    return FBInstant.context.getType();
}
/**
 * 用这个方法来判断当前游戏环境中游戏参与者的数量是否介于指定的最小值和最大值之间。
 * 返回值{answer: true, minSize: 3, maxSize: 5}
 */
FBSDK.context.isSizeBetween = function(minSize, maxSize)
{
    return FBInstant.context.isSizeBetween(minSize, maxSize);
}
/**
 * 切换游戏场景
 * id//FBInstant.context.getID()
 */
FBSDK.context.switchAsync = function(id,callback){
    FBInstant.context.switchAsync(id)
        .then(function() {
            callback&&callback();
        }).catch(function(error){
            callback&&callback(error);
        });
}
/**
 * 选择游戏场景
 * param:{ filters: ['NEW_CONTEXT_ONLY'], minSize: 3,minSize:1}
 */
FBSDK.context.chooseAsync = function(param,callback){
    FBInstant.context.chooseAsync(param)
        .then(function() {
            callback&&callback();
        }).catch(function(error){
            callback&&callback(error);
        });
}
/**
 * 创建游戏场景
 * playerID 玩家Id
 */
FBSDK.context.createAsync = function(playerID,callback){
    FBInstant.context.createAsync(playerID)
        .then(function() {
            callback&&callback();
        }).catch(function(error){
            callback&&callback(error);
        });
}
/**
 * 获取当前环境中正在玩游戏的玩家列表，它可能包含当前玩家的信息。
 * 返回的值是数组[ContextPlayer]
 * 获取 #contextplayer 对象的数组， 其中包含与当前环境相关的活跃玩家 （在过去 90 天内玩过游戏的用户）的信息。这可能包含当前 玩家。
 */
FBSDK.context.getPlayersAsync = function(callback){
    FBInstant.context.getPlayersAsync()
        .then(function(players) {
            callback&&callback(players.map(function(player) {
                return {
                    id: player.getID(),
                    name: player.getName(),
                    avatarUrl:player.getPhoto()
                }
            }));
        }).catch(function(error){
            callback&&callback(error);
        });
}
/* --------------------- 对战场景 Context end ------------------------ */

/* --------------------- 支付 Payment start ------------------------ */
/**
 * 获取价格档位列表
 */
FBSDK.payments.getCatalogAsync = function(callback){
    FBInstant.payments.getCatalogAsync().then(function (catalog) {
        callback && callback(catalog);
        // console.log(catalog); // [{productID: '12345', ...}, ...]
    }).catch(function(error){
        callback && callback(error);
    });
}
/**
 * 通过价格档位购买商品
 */
FBSDK.payments.purchaseAsync = function(purchaseConfig, callback) {
    FBInstant.payments.purchaseAsync(purchaseConfig).then(function (purchase) {
        callback && callback(purchase);
        // console.log(purchase);
        // {productID: '12345', purchaseToken: '54321', developerPayload: 'foobar', ...}
    }).catch(function(error) {
        callback && callback(error);
    });
}

/**
 * 动态价格支付 获取当前玩家未购买的商品列表
 */
FBSDK.payments.getPurchasesAsync = function(callback){
    FBInstant.payments.getPurchasesAsync().then(function (purchases) {
        callback && callback(purchases);
        // console.log(purchase);
        // [{productID: '12345', ...}, ...]
    }).catch(function(error) {
        callback && callback(error);
    });
}
/**
 * 动态价格支付 调起支付页面，返回同步支付结果
 * */
FBSDK.payments.consumePurchaseAsync = function(purchaseToken, callback){
    FBInstant.payments.consumePurchaseAsync(purchaseToken).then(function () {
        // Purchase successfully consumed!
        // Game should now provision the product to the player
        callback && callback();
    }).catch(function(error) {
        callback && callback (error)
    });
}
/*
 * 设置一个回调，在支付操作可进行时触发
 * 当支付可进行时执行的 回调函数。
 *  */
FBSDK.payments.onReady = function(callback){
    FBInstant.payments.onReady(function () {
        callback && callback()
        // console.log('Payments Ready!')
    }).catch(function(e){
        callback && callback(e)
    });
}
/* --------------------- 支付 Payment end ------------------------ */

/**
 * 获取用户的地域信息，例如:zh_CN en_US
 */
FBSDK.getLocale = function(){
    return FBInstant.getLocale();
}
/**
 * 获取运行的平台信息: IOS | ANDROID | WEB | MOBILE_WEB
 */
FBSDK.getPlatform = function(){
    return FBInstant.getPlatform();
}
/**
 * SDK 的版本号，例如: '4.0'
 */
FBSDK.getSDKVersion = function () {
    return FBInstant.getSDKVersion();
}
/**
 * 通知平台资源加载的百分比
 * @param value 0-100
 */
FBSDK.setLoadingProgress=function(value){
    FBInstant.setLoadingProgress(value);
}
/**
 * 获取平台支持的 api 列表  返回一个数组
 */
FBSDK.getSupportedAPIs=function () {
    return FBInstant.getSupportedAPIs();
}
/**
 * 获取入口参数getEntryPointData
 */
FBSDK.getEntryPointData = function() {
    return FBInstant.getEntryPointData();
}
/**
 * 获取入口
 */
FBSDK.getEntryPointAsync = function(callback){
    FBInstant.getEntryPointAsync().then(function(entrypoint){
        callback && callback(entrypoint)
    });
}
/**
 * 为当前上下文设置与个别游戏会话相关的数据。
 */
FBSDK.setSessionData = function(sessionData){
    FBInstant.setSessionData(sessionData);
}
/**
 * 游戏已完成加载资源，用户点击了开始游戏的按钮
 * callback回来用户处理游戏逻辑
 */
FBSDK.startGameAsync = function (callback) {
    FBInstant.startGameAsync().then(function() {
        callback&&callback();
    }).catch(function(e){
        callback && callback(e);
    });
}
/**
 * 分享游戏 shareAsync
 * @param payload is JSON
 *  intent("INVITE" | "REQUEST" | "CHALLENGE" | "SHARE") 表示分享的意图。
 *  image字符串 要分享的 base64 编码图片。
 *  text字符串 要分享的文本消息。
 *  data对象 要附加到分享中的数据块。通过分享 开始的所有游戏会话都可以通过 FBInstant.getEntryPointData() 访问此数据块。
 */
FBSDK.shareAsync=function(payload,callback){
    FBInstant.shareAsync(payload).then(function() {
        callback&&callback();
    }).catch(function(e){
        callback && callback(e);
    });
}
/**
 * 通知 Facebook 在游戏中发生的更新
 * @param payload is CustomUpdatePayload
 *  action对于自定义更新，此属性应为“CUSTOM”。
    template字符串 此自定义更新使用的模板的编号。 模板应在 fbapp-config.json 中预定义。请参阅 [捆绑包配置文档]https://developers.facebook.com/docs/games/instant-games/bundle-config，获取有关 fbapp-config.json 的文档。
    cta（字符串 | LocalizableContent） 可选的行动号召按钮 文本。默认情况下，我们会使用经本地化的“Play”作为按钮文本。 若要提供自定义行动号召的本地化版本， 应传递一个包含默认行动号召的对象作为“default”值，以及将语言键映射到翻译的 另一个对象作为“localizations”值。
    image字符串 base64 编码图片的数据网址。
    text（字符串 | LocalizableContent） 一条文本消息， 或者是一个包含默认文本作为“default”值的对象 以及另一个将语言键映射到翻译内容作为“localizations”值的对象。
    data对象 要附加到更新中的数据块。通过更新 开始的所有游戏会话都可以通过 FBInstant.getEntryPointData() 访问此数据块。转变为字符串时， 此数据块必须小于或等于 1000 个字符。
    strategy字符串 指定更新的发布 方式。可以是下列方式之一： “IMMEDIATE”— 更新应立即发布。 “LAST”— 更新应在游戏会话结束时发布。使用 “LAST”策略发送的是最近发送的更新。 “IMMEDIATE_CLEAR”— 更新将立即发布，并清除其他任何待处理的 更新（如通过“LAST”策略发布的更新）。 如果未指定策略，我们将默认为“IMMEDIATE”。
    notification字符串 指定自定义更新的 通知设置。可以是“NO_PUSH”或“PUSH”，默认为“NO_PUSH”。 仅将推送通知用于 对接收人来说非常显著且可立即操作的更新。另请注意，并不一定 会发送推送通知，具体取决于用户设置和平台政策。
 *
 * 更新自定义时间
   {
      action: 'CUSTOM',
      cta: 'Join The Fight',
      image: base64Picture,
      text: {
        default: 'X just invaded Y\'s village!',
        localizations: {
          ar_AR: 'X \u0641\u0642\u0637 \u063A\u0632\u062A ' +
          '\u0642\u0631\u064A\u0629 Y!',
          en_US: 'X just invaded Y\'s village!',
          es_LA: '\u00A1X acaba de invadir el pueblo de Y!',
        }
      }
      template: 'VILLAGE_INVASION',
      data: { myReplayData: '...' },
      strategy: 'IMMEDIATE',
      notification: 'NO_PUSH',
    }
  更新排行榜
 {
      action: 'LEADERBOARD',
      name : 所更新排行榜的 名称
      text字符串？ 可选的文本消息。如果未指定，将会提供 一条经本地化的回退消息。
    }
 */
    FBSDK.updateAsync=function(payload,callback){
    FBInstant.updateAsync(payload).then(function() {
        callback&&callback();
    });
}

/*
 *  [in closed bate]switchGameAsync
 * */

FBSDK.switchGameAsync = function(appId, callback) {
    FBInstant.switchGameAsync(appId).catch(function (e) {
        // Handle game change failure
        callback && callback(e);
    });
}
/**
 * 退出游戏
 */
FBSDK.quit = function(){
    FBInstant.quit();
}
/**
 * 自定义事件，使用 Facebook 的分析后台功能来分析应用。
 * @param eventName string 要分析的事件名称  必须为2到40个字符, 并且只能包含 "_"、"-"、"和" 字母数字字符
 * @param valueToSum number 可选，FB分析后台可以计算它。
 * @param parameters Object 可选，它可以包含多达25个 key-value，以记录事件。key 必须是2-40个字符，只能包含'_', '-', ' '和字母数字的字符。 Value 必须少于100个字符。
 */
FBSDK.logEvent = function(eventName, valueToSum, parameters){
    return FBInstant.logEvent(eventName, valueToSum, parameters);
}
/**
 * 设置一个回调函数，当触发暂停事件时触发
 */
FBSDK.onPause = function(callback){
    FBInstant.onPause(function() {
        callback && callback();
    })
}


/* --------------------- 广告实例 Ad start ------------------------ */
/**
 * 尝试创建一个间隙广告实例。这个实例可以被预加载和呈现
 */
/*FBSDK.getInterstitialAdAsync = function(placementID, callback) {
    // FBInstant.getInterstitialAdAsync(placementID).then(function(interstitial) {
    //     interstitial.getPlacementID(); // 'my_placement_id'
    // });

    var ad = null;
    FBInstant.getInterstitialAdAsync(placementID).then(function(interstitial) {
        // Load the Ad asynchronously
        ad = interstitial;
        return ad.loadAsync();
    }).then(function() {
        // Show the Ad asynchronously once it has loaded
        return ad.showAsync();
    }).then(function() {
        // Perform post-Ad activity once the user has watched the Ad
    }).catch(function(e) {
        // Catch errors such as ADS_FREQUENT_LOAD, ADS_NO_FILL, ADS_NOT_LOADED,
        // ADS_TOO_MANY_INSTANCES, CLIENT_REQUIRES_UPDATE, INVALID_PARAM,
        // NETWORK_FAILURE, etc. See SDK reference for more information.
        console.log(e);
        callback && callback(e);
    });
}*/
/**
 * 尝试创建一个视频广告实例。这个实例可以被预加载和呈现
 */
/*FBSDK.getRewardedVideoAsync = function(placementID, callback) {
    // FBInstant.getRewardedVideoAsync(id).then(function(rewardedVideo) {
    //     callback&&callback(rewardedVideo);
    // });
    var ad = null;
    FBInstant.getRewardedVideoAsync(placementID).then(function(interstitial) {
        // Load the Ad asynchronously
        ad = interstitial;
        return ad.loadAsync();
    }).then(function() {
        // Show the Ad asynchronously once it has loaded
        return ad.showAsync();
    }).then(function() {
        // Perform post-Ad activity once the user has watched the Ad
    }).catch(function(e) {
        // Catch errors such as ADS_FREQUENT_LOAD, ADS_NO_FILL, ADS_NOT_LOADED,
        // ADS_TOO_MANY_INSTANCES, CLIENT_REQUIRES_UPDATE, INVALID_PARAM,
        // NETWORK_FAILURE, etc. See SDK reference for more information.
        console.log(e);
    });
}*/

/**
 * 获取广告ad  Rewarded Video尝试创建插屏广告的实例。此实例可在之后 预载和显示。
 * @returns {null}
 广告ID：463653114034966_529617980771812  冒险关卡
 */
//初始化插页广告实例
FBSDK.interstitialAdAsync = function (placement_id, callback) {

    var ad = null;
    FBSDK.Interstitial = null;
    console.log("开始获取插页广告实例");
    FBInstant.getInterstitialAdAsync(
        // '463653114034966_531084087291868', // from Wayne's Ad Placement

        placement_id
    ).then(function(interstitial) {
        // Load the Ad asynchronously  异步加载AD

        console.log("获取插页广告实例成功 开始预加载广告");
        ad = interstitial;
        return ad.loadAsync();
    }).then(function () {
        // FBSDK.logEvent && FBSDK.logEvent("requestAd",1,{placement_id:placement_id});
        console.log("插页广告预加载完成");
        FBSDK.Interstitial = ad;
        callback && callback(true);
    }).catch(function(e) {
        // Catch errors such as ADS_FREQUENT_LOAD, ADS_NO_FILL, ADS_NOT_LOADED,
        // ADS_TOO_MANY_INSTANCES, CLIENT_REQUIRES_UPDATE, INVALID_PARAM,
        // NETWORK_FAILURE, etc. See SDK reference for more information.
        FBSDK.Interstitial = null;
        FBSDK.InterstitialLoad = false;
        console.log("获取插页广告实例失败 Error: " +JSON.stringify(e));
        callback && callback(e);
    });
};

FBSDK.getInterstitialAdAsync=function(placement_id,callback){
    if(FBSDK.Interstitial)
    {
        if(!FBSDK.InterstitialShow)
        {
            console.log("开始播放插页广告");
            FBSDK.InterstitialShow = true;
            FBSDK.Interstitial.showAsync().then(function () {
                FBSDK.Interstitial = null;
                FBSDK.InterstitialShow = false;
                FBSDK.InterstitialLoad = false;

                console.log("插页广告播放成功");
                // FBSDK.logEvent && FBSDK.logEvent("showAd",1,{placement_id:placement_id});
                callback&&callback(true); //视频加载成功
            }).catch(function (e) {
                FBSDK.Interstitial = null;
                FBSDK.InterstitialShow = false;
                FBSDK.InterstitialLoad = false;

                console.log("插页广告播放失败 Error: " +JSON.stringify(e));
                callback&&callback(e); //视频加载失败
            });
        }
    }
    else
    {
        if( !FBSDK.InterstitialLoad)
        {
            FBSDK.InterstitialLoad = true;
            FBSDK.interstitialAdAsync(placement_id,function (isSuccess) {
                if(isSuccess === true) {
                    FBSDK.getInterstitialAdAsync(placement_id,callback);
                }
                else {
                    FBSDK.InterstitialLoad  = false;
                    callback && callback(isSuccess);
                }
            })
        }
    }
};
/**
 * 尝试创建奖励式视频广告的实例。此实例可在之后 预载和显示。
 * @returns {null}
 *
 广告ID：463653114034966_531084087291868   冒险关卡
 广告ID：463653114034966_531084087291868  天天向上
 广告ID：463653114034966_532925170441093   主界面免费宝石
 广告ID：463653114034966_532928510440759   免费生命星领取
 */
//初始化视频广告实例
FBSDK.initRewardedVideoAsync = function (placement_id, callback) {
    var ad = null;
    FBSDK.Rewarded = null;
    console.log("initRewardedVideoAsync ");
    FBInstant.getRewardedVideoAsync(
        // '463653114034966_531084087291868', // from Wayne's Ad Placement
        placement_id
    ).then(function(rewardedVideo) {
        // Load the Ad asynchronously  异步加载AD
        console.log("获得视频广告实例 开始预加载");
        ad = rewardedVideo;
        return ad.loadAsync();
    }).then(function () {
        console.log("视频广告预加载完成");
        FBSDK.Rewarded = ad;
        // FBSDK.logEvent && FBSDK.logEvent("requestAd",1,{placement_id:placement_id});
        callback && callback(true);
    }).catch(function(e) {
        // Catch errors such as ADS_FREQUENT_LOAD, ADS_NO_FILL, ADS_NOT_LOADED,
        // ADS_TOO_MANY_INSTANCES, CLIENT_REQUIRES_UPDATE, INVALID_PARAM,
        // NETWORK_FAILURE, etc. See SDK reference for more information.
        FBSDK.Rewarded = null;
        FBSDK.RewardedLoad = false;
        console.log("视频广告实例获取失败 Error: " +JSON.stringify(e));
        callback && callback(e);
    });
};

FBSDK.getRewardedVideoAsync=function(placement_id,callback){
    // var infoBox = document.getElementById('info');

    if(FBSDK.Rewarded)
    {
        if(!FBSDK.RewardedShow)
        {
            console.log("开始播放视频广告");
            FBSDK.RewardedShow = true;
            FBSDK.Rewarded.showAsync().then(function () {
                FBSDK.Rewarded = null;
                FBSDK.RewardedShow = false;
                FBSDK.RewardedLoad = false;

                console.log("视频广告播放成功");
                // FBSDK.logEvent && FBSDK.logEvent("showAd",1,{placement_id:placement_id});
                callback&&callback(true); //视频加载成功
            }).catch(function (e) {
                FBSDK.Rewarded = null;
                FBSDK.RewardedShow = false;
                FBSDK.RewardedLoad = false;
                console.log("视频广告播放失败 Error: " +JSON.stringify(e));
                callback&&callback(e); //视频加载失败
            });
        }
    }
    else
    {
        if( !FBSDK.RewardedLoad)
        {
            FBSDK.RewardedLoad = true;

            FBSDK.initRewardedVideoAsync(placement_id,function (isSuccess) {

                // addTip(infoBox, "initRewardedVideoAsync：" + isSuccess + "   isSuccess === true" + (isSuccess === true));
                if(isSuccess === true) {
                    FBSDK.getRewardedVideoAsync(placement_id,callback);
                }
                else {
                    FBSDK.RewardedLoad  = false;
                    callback && callback(isSuccess);
                }
            })
        }
    }
};
/* --------------------- 广告实例 Ad end ------------------------ */

/*
 * 【in closed bate】matchPlayerAsync
 * */

/*
 * 【in closed bate】checkCanPlayerMatchAsync
 * */

/* --------------------- 排行榜 Leaderboard start ------------------------ */
/**
 * 获取这款小游戏中某个排行榜信息
 * @param name 排行榜名称
 * */
FBSDK.getLeaderboardAsync = function(name,callback){
    FBInstant.getLeaderboardAsync(name)
        .then(function(leaderboard){

            var board = {};
            board.name = leaderboard.getName();
            board.contextId = leaderboard.getContextID();
            board.playerCount = leaderboard.getEntryCountAsync();
            board.entry = leaderboard;
            callback&&callback(board);
        }).catch(function(e){
            callback && callback(e)
    }); // 'my_awesome_leaderboard'
}
/**
 * 更新玩家最高分数
 * 如果玩家已有分数， 只有新分数更好时，才会替换旧分数。
 */
FBSDK.setScoreAsync = function(boardName, score, ext, callback) {
    FBInstant.getLeaderboardAsync(boardName)
        .then(function(leaderboard) {
            return leaderboard.setScoreAsync(score, ext);
        })
        .then(function(entry) {
            // console.log(entry.getScore()); // 42
            // console.log(entry.getExtraData()); // '{race: "elf", level: 3}'
            callback && callback({
                score: entry.getScore(),
                ext: entry.getExtraData(),
                rank : entry.getRank(),
                timestamp : entry.getTimestamp()
            })
        }).catch(function(e){
            callback && callback(e);
        });
}
/**
 * 获取玩家在某个排行榜的信息
 */
FBSDK.getPlayerEntryAsync = function(boardName,callback) {
    FBInstant.getLeaderboardAsync(boardName)
        .then(function(leaderboard) {
            return leaderboard.getPlayerEntryAsync();
        })
        .then(function(entry) {
            /*console.log(entry.getRank()); // 2
            console.log(entry.getScore()); // 42
            console.log(entry.getExtraData()); // '{race: "elf", level: 3}'
            */


            // var player = entry.getPlayer();
            // var info = {
            //     rank : entry.getRank(), // 名次
            //     score: entry.getScore(), // 分数
            //     ext : entry.getExtraData(), // ext
            //     timestamp : entry.getTimestamp(), // 获取排行榜上榜分数的上次更新时间戳
            //     formattedScore : entry.getFormattedScore(), // 获取与上榜分数相关的分值
            //     user : {// 用户信息
            //         name : player.getName(), //昵称
            //         avatarUrl : player.getPhoto(),// 头像
            //         uid : player.getID() // 用户FB id
            //     }
            // }

            callback && callback(FBSDK.getLeaderboardEntry(entry))
        }).catch(function(e){
            callback && callback(e);
        });
}

FBSDK.getLeaderboardEntry = function(entry) {
    var player = entry.getPlayer();
    var info = {
        rank : entry.getRank(), // 名次
        score: entry.getScore(), // 分数
        ext : entry.getExtraData(), // ext
        timestamp : entry.getTimestamp(), // 获取排行榜上榜分数的上次更新时间戳
        formattedScore : entry.getFormattedScore(), // 获取与上榜分数相关的分值
        user : {// 用户信息
            name : player.getName(), //昵称
            avatarUrl : player.getPhoto(),// 头像
            uid : player.getID() // 用户FB id
        }
    };
    return info;
}
/**
 * 检索一组排行榜上榜分数，按排行榜上的得分名次 排序。
 * option -> count 尝试从排行榜获取的上榜分数 总数量。如果未指定，默认为 10。每条查询命令最多可获取 100 个上榜分数。
 * offset数字 从排行榜顶部检索 上榜分数的偏移量。
 */
FBSDK.getEntriesAsync = function(option, callback) {
    //option -> count, offset

    FBInstant.getLeaderboardAsync(option.boardName)
        .then(function(leaderboard) {
            return leaderboard.getEntriesAsync(option.count || 10, option.offset || 0);
        })
        .then(function(entries) {
            var len = entries.length;

            var players = [];
            for(var i = 0; i < len; i++) {
                players.push(FBSDK.getLeaderboardEntry(entries[i]));
            }
            callback && callback(players);
            /*console.log(entries.length); // 10
            console.log(entries[0].getRank()); // 1
            console.log(entries[0].getScore()); // 42
            console.log(entries[1].getRank()); // 2
            console.log(entries[1].getScore()); // 40*/
        }).catch(function(e){
            callback && callback(e);
        });
}
/* --------------------- 排行榜 Leaderboard start ------------------------ */

LayaCommon.getUniqueID = function (splitChar) {
    var uniqueID = "";
    for (var i = 1; i <= 32; i++) {
        uniqueID += Math.floor(Math.random() * 16.0).toString(16);
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            uniqueID += (splitChar ? splitChar : "");
    }
    return uniqueID;
};
LayaCommon.createCallback = function (callback, callbackName) {
    if (!callbackName)
        callbackName = "callback" + LayaCommon.getUniqueID("_");
    window[callbackName] = (function (name) {
        function CallbackHandler(param) {
            if (window[CallbackHandler.funcName]) {
                window[CallbackHandler.funcName] = null;
                delete window[CallbackHandler.funcName];
            }
            if (document && document.head) {
                var scp = document.getElementById(CallbackHandler.funcName)
                scp && document.head.removeChild(scp);
            }
            callback && callback(param);
        }

        CallbackHandler.funcName = name;
        return CallbackHandler;
    })(callbackName);
    return callbackName;
};
LayaCommon.getJson = function (url, callback, onError) {
    var callbackName = LayaCommon.createCallback(function (param) {
        callback && callback(param);
    });
    var scp = document.createElement("script");
    document.head.appendChild(scp);
    scp.id = callbackName;
    scp.onerror = function () {
        onError && onError({"result": -101, "desc": "json download error"})
    };
    scp.src = (url.indexOf("?") > -1) ? (url + "&callback=" + callbackName) : (url + "?callback=" + callbackName);
};
LayaCommon.getPostJson = function (targetUrl, params, method, accessToken, callback) {
    var url = "//ucenter.layabox.com/HRProxy/http?url=" + targetUrl + "&params=" + params + "&ac=" + method + "&access_token=" + accessToken;
    LayaCommon.getJson(url, function (param) {
        callback && callback(param);
    }, function (param) {
        callback && callback(param);
    });
};
LayaCommon.getAccessToken = function(openId,openKey,callback) {
    var url = "https://ucenter.layabox.com/oauth2/authorize?appid=" + openId + "&appkey=" + openKey;
    LayaCommon.getJson(url, function (param) {
        if (param.ret == 0) {
            FBSDK.basicInfo["access_token"] = param.data.access_token;
            callback && callback({"result": 0});
        }
        else if (param.ret == 111) {
            callback && callback({"result": -102, "desc": "appid or appkey error[-3]"});
        }
        else {
            callback && callback({"result": param.ret, "desc":  param.msg});
        }
    }, function () {
        callback && callback({"result": -102, "desc": "get token error"});
    });
}
LayaCommon.getGInfoByRelId = function(callback) {
    // 获取关联的游戏的信息和渠道信息
    var url = "https://ucenter.layabox.com/api/getRelatedById?access_token=" + FBSDK.basicInfo["access_token"] + "&relatedId=" + FBSDK.basicInfo["relatedId"];
    LayaCommon.getJson(url, function (param) {
        if (param.ret == 0) {
            FBSDK.gameInfo = param.data;
            callback && callback({"result": 0});
        }
        else if (param.ret == 112)
            callback && callback({"result": -103, "desc": "token error[-4]"});
        else
            callback && callback({"result": param.ret, "desc":  param.msg});
    }, function () {
        callback && callback({"result": -103, "desc": "get related error"});
    });
}
LayaCommon.loadScript = function (url, onload) {
    var scp = document.createElement("script");
    scp.onload = function () {
        onload && onload({"result": 0});
    };
    scp.onerror = function () {
        loadScript(url, onload);
        // onerror && onerror({"result": -100, "desc": "脚本下载失败"})
    };
    document.head.appendChild(scp);
    scp.src = url;
};
window.FBSDK=FBSDK;
window.LayaCommon = LayaCommon;