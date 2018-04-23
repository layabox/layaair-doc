//#begin
//玩家技能：二次群攻,每次攻击一个对象
function skill001(context)
{
    context.target.playActionById(2000);
    await context.sleep(99);

	//context.capture(context.skill.targets);
    //context.playMusic('attack');
    //await context.sleep(300);
       //技能碰撞对象：（位置绑定对象， 碰撞检测类型[距离碰撞]，检测参数[范围，距离计算类型xz]， 生命周期，捕获数量）：
    //context.createSkillCollision(context.target,'DistanceCollision',{range:5,distanceType:'xz'},500,1000);
     //技能碰撞对象：（位置绑定对象， 碰撞检测类型[形状碰撞]，检测参数[形状类型[扇形]]，形状大小[扇形角度,最大半径，最小半径]]， 生命周期，捕获数量）：
     context.createSkillCollision(context.target,'ShapeCollision',{type:'fan',size:[90,5,0]},500,1000);
	//ontext.capture(context.skill.targets);
    context.playMusic('attack');
    await context.sleep(396);
    context.complete();
}
//#end
//#begin
//玩家普攻2
function playerSkill1(context)
{
    context.target.playActionById(2001);
    await context.sleep(99);

	//context.capture(context.skill.targets);
    //context.playMusic('attack');
	
       //技能碰撞对象：（位置绑定对象， 碰撞检测类型，检测参数， 生命周期，捕获数量）
    context.createSkillCollision(context.target,'DistanceCollision',{range:5,distanceType:'xz'},500,1000);
	//ontext.capture(context.skill.targets);
    context.playMusic('attack');
    await context.sleep(396);
    context.complete();
}
//#end
//#begin
//玩家技能：旋风斩
function playerSkill2(context)
{
    context.target.playActionById(2003);
	
    //context.create(1003,'Effect',context.target);

    await context.sleep(200);
    //技能碰撞对象：（位置绑定对象， 碰撞检测类型，检测参数， 生命周期，捕获数量）
    context.createSkillCollision(context.target,'DistanceCollision',{range:5,distanceType:'xz'},500,1000);
    await context.sleep(50);
    //context.capture(context.skill.targets);


    context.complete();
}
//#end
//#begin
//玩家技能：跳斩
function playerSkill3(context)
{
    context.target.playActionById(2002);
	
    //context.create(1003,'Effect',context.target);

		await context.sleep(700);
		//匝地效果
    context.ceateStaticEffect(9001,context.target,true);
	//await context.sleep(600);

    
    //技能碰撞对象：（位置绑定对象， 碰撞检测类型，检测参数， 生命周期，捕获数量）
    context.createSkillCollision(context.target,'DistanceCollision',{range:5,distanceType:'xz'},500,1000);
    await context.sleep(50);

    context.complete();
}
//#end
//#begin
//怪物技能：定点打击
function skill002(context)
{
    var target;
    var createObjParam;
    context.playAction(context.target,2000);
    //搜索目标
    target = context.searchByDistance(context.target,10,'xz');
    if(target)
    {
        //击中效果
        context.ceateStaticEffect(1005,target);
        //伤害计算
        context.capture(target);
    }
    await context.sleep(500);
    context.complete();
}
//#end

//#begin
//怪物技能:发射特效
function skill003(context)
{
    var effect;
    var target;
    var collison;
    context.playAction(context.target,2000);
    //抛物线 发射
    effect=context.cast(context.target,1001,'Parabola3D',{speed:2,upspeed:5,accspeed:-5},1);
    //追宗 发射
    //effect=context.cast(context.target,1001,'Track3D',{speed:20,turnAngle:360,range:10},1,90);
    //添加 距离碰撞
    collison = context.createSkillCollision(effect,'DistanceCollision',{range:0.5,distanceType:'xyz'},1000,1);
    //捕获目标后自动销毁
    collison.autoDead = true;
    //搜索目标
    target = context.searchByDistance(context.target,10,'xz');
    //锁定对象
    if(target)
    {
        effect.lockTarget(target);
    }
    await context.sleep(4000);
    context.complete();
}
//#end
//#begin
//怪物普攻
function skill004(context)
{
    context.target.playActionById(2000);
    await context.sleep(200);

	context.capture(context.skill.targets);
    context.playMusic('attack');
   await context.sleep(50);
    context.complete();
   
}
//#end
//#begin
//宠物技能：定点打击
function skill2001(context)
{
    var target;
    var createObjParam;
    context.playAction(context.target,2000);
    //搜索目标
    target = context.searchByDistance(context.target,10,'xz');
    if(target)
    {
        //击中效果
        context.ceateStaticEffect(1006,target);
        //伤害计算
        context.capture(target);
    }
    await context.sleep(500);
    context.complete();
}
//#end


//#begin
//宠物技能：定点群攻打击
function skill2002(context)
{
    var target;
    var createObjParam;
    var effect;
    context.playAction(context.target,2000);
    //搜索目标
    target = context.searchByDistance(context.target,10,'xz');
    if(target)
    {
          //击中效果
        effect= context.create(1008,'Effect');
        effect.pos.copy(context.target.pos);
        context.createSkillCollision(effect,'DistanceCollision',{range:5,distanceType:'xz'},500);
    }
    await context.sleep(1000);
    context.complete();
}
//#end

//#begin
//宠物技能：定点打击
function skill2003(context)
{
    var target;
    var createObjParam;
    context.playAction(context.target,2000);
    //搜索目标
    target = context.searchByDistance(context.target,10,'xz');
    if(target)
    {
        //击中效果
        context.ceateStaticEffect(1005,target);
        //伤害计算
        context.capture(target);
    }
    await context.sleep(500);
    context.complete();
}
//#end

//#begin
function hit001(context)
{
    //var eff = context.create(2000,'Effect',null,'2d');
	//var targetPos = new laya.d3.math.Vector3();
	//eff.pos.x = context.target.pos.x;
	//eff.pos.y = context.target.pos.y + 0.5;
	//eff.pos.z = context.target.pos.z;
	//targetPos.y += 1;
    //eff.pos.copy(targetPos);
    //context.create(2002,'Effect',context.target);
    context.playMusic('test');
    context.complete();
}
//#end
//#begin
//击退
function hit002(context)
{
    // 击退
    context.doBeHit(context.target,context.hitfrom,1);
    // 击中效果
    //var eff = context.create(2000,'Effect',null,'2d');
    //eff.pos.copy(context.target.pos);

    context.playMusic('test');
    context.complete();
}
//#end
//#begin
function runScript(context)
{
	if( !context.target.isHero )
	{
		return;
	}
    context.playMusic('run');
    context.complete();
}
//#end