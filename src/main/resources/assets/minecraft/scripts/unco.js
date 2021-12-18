function updateTick(entity, pass) {
    var matId = renderer.currentMatId;
    var entityId = entity.func_145782_y();
    var tick = renderer.getTick(entity);
    var prevTick = prevTickData[entityId];
    prevTickData[entityId] = tick; //データ保存 entityIdを使うことで競合回避
    return prevTick !== tick && pass === 0 && matId === 0; //材質xpassで走査されるので1つに制限する
}

//内部値を1tickごとに加算する処理をここで書いてる
//tick単位で加算することでフレームに依存せずアニメーションが安定する(20fps以上)
function updateAnimation(entity) {
    //方向幕のをドアに転用 0-100 繰り返し(単位はtick)
    var entityId = entity.func_145782_y();
    var doorTime = doorAnimationTimeData[entityId];
    if (doorTime === undefined) doorTime = 0;
    if (doorTime < 100) doorTime++;
    doorAnimationTimeData[entityId] = doorTime;
}

function renderdoor(entity) {
    var doorMovespeed = 0.0;
    var doorTime = renderer.getSystemTime() * 20 % 100;
    if (doorTime === undefined) doorTime = 0;
    var doorlength = 0.64;

    if (rollsignTime % 100 < 60) {
        doorMovespeed = (80 / 60) / 100;
    }
    if (rollsignTime % 100 < 100) {
        doorMovespeed = 0.5 / 100;
    }
    if (rollsignTime % 100 === 100) {
        doorMovespeed = 1;
    }
    GL11.glPushMatrix(); //FL
    GL11.glTranslatef(0.0, 0.0, doorlength * doorMovespeed);
    doorFL.render(renderer);
    GL11.glPopMatrix();
    GL11.glPushMatrix(); //BL
    GL11.glTranslatef(0.0, 0.0, -doorlength * doorMovespeed);
    doorBL.render(renderer);
    GL11.glPopMatrix();
    GL11.glPushMatrix(); //FR
    GL11.glTranslatef(0.0, 0.0, doorlength * doorMovespeed);
    doorFR.render(renderer);
    GL11.glPopMatrix();
    GL11.glPushMatrix(); //BR
    GL11.glTranslatef(0.0, 0.0, -doorlength * doorMovespeed);
    doorBR.render(renderer);
    GL11.glPopMatrix();
}