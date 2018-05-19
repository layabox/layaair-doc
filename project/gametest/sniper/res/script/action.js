//#begin
//玩家技能：二次群攻,每次攻击一个对象
function run001(context)
{
	//context.target.avatar.enabelBladeTrail = false;
    context.playMusic('run');
    await context.sleep(500);
    context.playMusic('run');
    context.complete();
}
//#end

//#begin
//刀光开始
function trailBegin(context)
{
	context.target.avatar.enabelBladeTrail = true;
    context.complete();
}
//#end

//#begin
//刀光结束
function trailEnd(context)
{
	context.target.avatar.enabelBladeTrail = false;
    context.complete();
}
//#end