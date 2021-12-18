//このスクリプトはフリーなので好きなだけコピったり複製して改造してOKです

var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);

//先頭車から移植してるので使わないのもある↓
importPackage(Packages.net.minecraft.tileentity);//TileEntitySign
importPackage(Packages.jp.ngt.ngtlib.util); //NGTUtil NGTUtilClient
importPackage(Packages.org.lwjgl.util.vector);//Vector3f
importPackage(Packages.jp.ngt.ngtlib.renderer); //NGTTessellator
importPackage(Packages.jp.ngt.ngtlib.io);//NGTLog
importPackage(Packages.jp.kaiz.atsassistmod.api);//ControlTrain
importPackage(Packages.net.minecraft.util);//ResourceLocation
importPackage(Packages.org.lwjgl.input);//Keyboard

//データ保存用 持ち越しが可能
var prevTickData = {};
var rollsignAnimationTimeData = {};


function init(par1, par2) {
    //オブジェクト
    body = renderer.registerParts(new Parts("obj1", "obj2", "panta", "panta_D2", "panta_D2_1", "panta_D2_2", "panta_D2_3", "panta_D2_4", "panta_D2_5"));



    
    //ドア
    rollsign_off = renderer.registerParts(new Parts("rollsign_off"));
    door_FL = renderer.registerParts(new Parts("door_LF"));
    door_BL = renderer.registerParts(new Parts("door_LB"));
    door_FR = renderer.registerParts(new Parts("door_RF"));
    door_BR = renderer.registerParts(new Parts("door_RB"));
}

function Monitor_1(entity){
	if(entity === null){
		return
	}
    var signal = entity.getSignal();
    var speed = Math.ceil(entity.getSpeed() * 72);
    if(speed > 60){//60km/h�ȏ�̎�
        
        GL11.glPushMatrix();
        rollsign_off.render(renderer);
        GL11.glPopMatrix();
    } 
}





function render(entity, pass, par3) {
    

    if (pass >= 0 && pass <= 4) {
        GL11.glPushMatrix();
        body.render(renderer);
        Monitor_1(entity);
        render_door(entity);
        
            
        GL11.glPopMatrix();
    }

    //nullのとき処理を止めないとメニューでクラッシュ
    if (entity === null) return;

    //処理 tick単位のためこの中では描画できない
    var shouldUpdate = updateTick(entity, pass);
    if (shouldUpdate) {
        updateAnimation(entity);
    }

    //描画
    if (pass >= 0 && pass <= 4) {
        renderRollsign(entity);
    }
}





//entity === null対応済
function render_door(entity){

	doorMoveL = renderer.getDoorMovementL(entity);
	doorMoveR = renderer.getDoorMovementR(entity);
	
		GL11.glPushMatrix();
		 GL11.glTranslatef(0.0, 0.0, doorMoveL * 0.7);
		 door_FL.render(renderer);
		GL11.glPopMatrix();
		GL11.glPushMatrix();
		 GL11.glTranslatef(0.0, 0.0, -doorMoveL * 0.7);
		 door_BL.render(renderer);
		GL11.glPopMatrix();
		GL11.glPushMatrix();
		 GL11.glTranslatef(0.0, 0.0, doorMoveR * 0.7);
		 door_FR.render(renderer);
		GL11.glPopMatrix();
		GL11.glPushMatrix();
		 GL11.glTranslatef(0.0, 0.0, -doorMoveR * 0.7);
		 door_BR.render(renderer);
		GL11.glPopMatrix();
	  
}

//Tick更新検知 1回だけ実行すること 描画には使えない
function updateTick(entity, pass) {
    var matId = renderer.currentMatId;
    var entityId = entity.func_145782_y();
    var tick = renderer.getTick(entity);
    var prevTick = prevTickData[entityId];
    prevTickData[entityId] = tick;//データ保存 entityIdを使うことで競合回避
    return prevTick !== tick && pass === 0 && matId === 0;//材質xpassで走査されるので1つに制限する
}

//内部値を1tickごとに加算する処理をここで書いてる
//tick単位で加算することでフレームに依存せずアニメーションが安定する(20fps以上)
function updateAnimation(entity) {
    //方向幕 0-600 繰り返し(単位はtick)
    var entityId = entity.func_145782_y();
    var rollsignTime = rollsignAnimationTimeData[entityId];
    if (rollsignTime === undefined) rollsignTime = 0;
    if (rollsignTime < 600) rollsignTime++;
    if (rollsignTime === 600) rollsignTime = 0;
    rollsignAnimationTimeData[entityId] = rollsignTime;
}

//発光未対応
function renderRollsign(entity) {
    if (renderer.currentMatId !== 0) return;
    var entityId = entity.func_145782_y();
    var rollsignTime = renderer.getSystemTime() * 20 % 600;//rollsignAnimationTimeData[entityId]; //時間同期のため強引に対応
    if (rollsignTime === undefined) rollsignTime = 0;
    var rollsignId = entity.getTrainStateData(8);
    var rollsignBlacklist = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];//篠目線を表示しない行き先リスト
    
    if (rollsignTime % 600 >= 400 && rollsignBlacklist.indexOf(rollsignId) === -1) {
        //路線表示
        var vartex3 = [
            [[1.3590, 2.2621, 0.2653], [1.3590, 2.0891, -0.3747]],//左上の座標, 右下の座標 (m)
            [[-1.3590, 2.2621, -0.3747], [-1.3590, 2.0891, 0.2653]]
        ];
        var uv3 = [[256 / 1024, 0], [382 / 1024, 32 / 1024]];
        if (rollsignTime % 200 >= 100) uv3 = [[383 / 1024, 0], [509 / 1024, 32 / 1024]];
        renderVartexListWithUV(vartex3, uv3);
    }

    //種別
    var vartex1 = [
        [[1.375, 2.2650, 5.225], [1.375, 2.1150, 5]],
        [[-1.375, 2.2650, 4.4750], [-1.375, 2.1150, 4.7]]
    ];
    var uv1 = [[0, 0], [48 / 1024, 32 / 1024]];
    if (rollsignTime % 200 >= 100) uv1 = [[50 / 1024, 0], [97 / 1024, 32 / 1024]];
    var rollsignPage1 = rollsignId;
    if (6 <= rollsignId && rollsignId <= 22) rollsignPage1 = 6;
    if (23 <= rollsignId && rollsignId <= 39) rollsignPage1 = 7;
    if (40 <= rollsignId && rollsignId <= 56) rollsignPage1 = 8;
    if (57 <= rollsignId && rollsignId <= 73) rollsignPage1 = 9;
    var offsetV1 = uv1[1][1] * rollsignPage1;
    var uv1R = [[uv1[0][0], uv1[0][1] + offsetV1], [uv1[1][0], uv1[1][1] + offsetV1]];//左上のUV, 右下のUV
    renderVartexListWithUV(vartex1, uv1R);

    //行先
    var vartex2 = [
        [[1.375, 2.2650, 5], [1.375, 2.1150, 4.4750]],
        [[-1.375, 2.2650, 4.7], [-1.375, 2.1150, 5.225]]
    ];
    var uv2 = [[99 / 1024, 0], [210 / 1024, 32 / 1024]];
    if (rollsignTime % 200 >= 100) uv2 = [[212 / 1024, 0], [323 / 1024, 32 / 1024]];
    var rollsignPage2 = 0;
    switch (rollsignId) {//行き先と表示させるタイルを一致させる
        //普通 6-13
        case 1: rollsignPage2 = 1; break;
        case 2: rollsignPage2 = 2; break;
        case 3: rollsignPage2 = 3; break;
        case 4: rollsignPage2 = 4; break;
        case 5: rollsignPage2 = 5; break;
        case 6: rollsignPage2 = 6; break;
                //普通 7-24.17ある
        case 7: rollsignPage2 = 7; break;
        case 8: rollsignPage2 = 8; break;
        case 9: rollsignPage2 = 9; break;
        case 10: rollsignPage2 = 10; break;
        case 11: rollsignPage2 = 11; break;
        case 12: rollsignPage2 = 12; break;
        case 13: rollsignPage2 = 13; break;
        case 14: rollsignPage2 = 14; break;
        case 15: rollsignPage2 = 15; break;
        case 16: rollsignPage2 = 16; break;
        case 17: rollsignPage2 = 17; break;
        case 18: rollsignPage2 = 18; break;
        case 19: rollsignPage2 = 19; break;
        case 20: rollsignPage2 = 20; break;
        case 21: rollsignPage2 = 21; break;
        case 22: rollsignPage2 = 22; break;
        case 23: rollsignPage2 = 23; break;
                //普通 7-24.17ある
        case 24: rollsignPage2 = 7; break;
        case 25: rollsignPage2 = 8; break;
        case 26: rollsignPage2 = 9; break;
        case 27: rollsignPage2 = 10; break;
        case 28: rollsignPage2 = 11; break;
        case 29: rollsignPage2 = 12; break;
        case 30: rollsignPage2 = 13; break;
        case 31: rollsignPage2 = 14; break;
        case 32: rollsignPage2 = 15; break;
        case 33: rollsignPage2 = 16; break;
        case 34: rollsignPage2 = 17; break;
        case 35: rollsignPage2 = 18; break;
        case 36: rollsignPage2 = 19; break;
        case 37: rollsignPage2 = 20; break;
        case 38: rollsignPage2 = 21; break;
        case 39: rollsignPage2 = 22; break;
        case 40: rollsignPage2 = 23; break;
                //普通 7-24.17ある
        case 41: rollsignPage2 = 7; break;
        case 42: rollsignPage2 = 8; break;
        case 43: rollsignPage2 = 9; break;
        case 44: rollsignPage2 = 10; break;
        case 45: rollsignPage2 = 11; break;
        case 46: rollsignPage2 = 12; break;
        case 47: rollsignPage2 = 13; break;
        case 48: rollsignPage2 = 14; break;
        case 49: rollsignPage2 = 15; break;
        case 50: rollsignPage2 = 16; break;
        case 51: rollsignPage2 = 17; break;
        case 52: rollsignPage2 = 18; break;
        case 53: rollsignPage2 = 19; break;
        case 54: rollsignPage2 = 20; break;
        case 55: rollsignPage2 = 21; break;
        case 56: rollsignPage2 = 22; break;
        case 57: rollsignPage2 = 23; break;
                //普通 7-24.17ある
        case 58: rollsignPage2 = 7; break;
        case 59: rollsignPage2 = 8; break;
        case 60: rollsignPage2 = 9; break;
        case 61: rollsignPage2 = 10; break;
        case 62: rollsignPage2 = 11; break;
        case 63: rollsignPage2 = 12; break;
        case 64: rollsignPage2 = 13; break;
        case 65: rollsignPage2 = 14; break;
        case 66: rollsignPage2 = 15; break;
        case 67: rollsignPage2 = 16; break;
        case 68: rollsignPage2 = 17; break;
        case 69: rollsignPage2 = 18; break;
        case 70: rollsignPage2 = 19; break;
        case 71: rollsignPage2 = 20; break;
        case 72: rollsignPage2 = 21; break;
        case 73: rollsignPage2 = 22; break;
        case 74: rollsignPage2 = 23; break;
    }
    var offsetV2 = uv2[1][1] * rollsignPage2;
    var uv2R = [[uv2[0][0], uv2[0][1] + offsetV2], [uv2[1][0], uv2[1][1] + offsetV2]];//左上のUV, 右下のUV
    renderVartexListWithUV(vartex2, uv2R);
}
//縦方向の面は描画可能 他未検証
function renderVartexListWithUV(vartexs, uv) {
    GL11.glPushMatrix();
    var tessellator = NGTTessellator.instance;
    for (var i = 0; i < vartexs.length; i++) {
        tessellator.startDrawingQuads();
        tessellator.addVertexWithUV(vartexs[i][0][0], vartexs[i][0][1], vartexs[i][0][2], uv[0][0], uv[0][1]);
        tessellator.addVertexWithUV(vartexs[i][0][0], vartexs[i][1][1], vartexs[i][0][2], uv[0][0], uv[1][1]);
        tessellator.addVertexWithUV(vartexs[i][1][0], vartexs[i][1][1], vartexs[i][1][2], uv[1][0], uv[1][1]);
        tessellator.addVertexWithUV(vartexs[i][1][0], vartexs[i][0][1], vartexs[i][1][2], uv[1][0], uv[0][1]);
        tessellator.draw();
    }
    GL11.glPopMatrix();
}