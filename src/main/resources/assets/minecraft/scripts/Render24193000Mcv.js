//このスクリプトはフリーなので好きなだけコピったり複製して改造してOKです

var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);

//先頭車から移植してるので使わないのもある↓
importPackage(Packages.net.minecraft.tileentity); //TileEntitySign
importPackage(Packages.jp.ngt.ngtlib.util); //NGTUtil NGTUtilClient
importPackage(Packages.org.lwjgl.util.vector); //Vector3f
importPackage(Packages.jp.ngt.ngtlib.renderer); //NGTTessellator
importPackage(Packages.jp.ngt.ngtlib.io); //NGTLog
importPackage(Packages.net.minecraft.util); //ResourceLocation
importPackage(Packages.org.lwjgl.input); //Keyboard

//データ保存用 持ち越しが可能
var prevTickData = {};
var rollsignAnimationTimeData = {};


function init(par1, par2) {
    //オブジェクト
    body = renderer.registerParts(new Parts("obj1", "obj2", "shade", "panta", "panta_C1", "panta_C1_1", "panta_C1_2", "panta_C1_3", "panta_C1_4", "panta_C1_5"));
    pre = renderer.registerParts(new Parts("obj1", "obj2", "shade", "panta", "panta_C1", "panta_C1_1", "panta_C1_2", "panta_C1_3", "panta_C1_4", "panta_C1_5", "F1", "B1", "door_LB", "door_LF", "door_RF", "door_RB"))




    //ドア
    rollsign_off = renderer.registerParts(new Parts("rollsign_off"));
    doorFL = renderer.registerParts(new Parts("door_LF"));
    doorBL = renderer.registerParts(new Parts("door_LB"));
    doorFR = renderer.registerParts(new Parts("door_RF"));
    doorBR = renderer.registerParts(new Parts("door_RB"));
    ATS_PANEL = renderer.registerParts(new Parts("ATS_PANEL"));
    R_ATS = renderer.registerParts(new Parts("R_ATS"));
    ATS_B = renderer.registerParts(new Parts("ATS_B"));
    ATS_PA = renderer.registerParts(new Parts("ATS_PA"));
    NO_ATS = renderer.registerParts(new Parts("NO_ATS"));
    L0 = renderer.registerParts(new Parts("L0"));
    L15 = renderer.registerParts(new Parts("L15"));
    L25 = renderer.registerParts(new Parts("L25"));
    L35 = renderer.registerParts(new Parts("L35"));
    L45 = renderer.registerParts(new Parts("L45"));
    L55 = renderer.registerParts(new Parts("L55"));
    L65 = renderer.registerParts(new Parts("L65"));
    L75 = renderer.registerParts(new Parts("L75"));
    L85 = renderer.registerParts(new Parts("L85"));
    L95 = renderer.registerParts(new Parts("L95"));
    L100 = renderer.registerParts(new Parts("L100"));
    L110 = renderer.registerParts(new Parts("L110"));
    L120 = renderer.registerParts(new Parts("L120"));
    L130 = renderer.registerParts(new Parts("L130"));
    F = renderer.registerParts(new Parts("F"));
    B = renderer.registerParts(new Parts("B"));
    F1 = renderer.registerParts(new Parts("F1"));
    B1 = renderer.registerParts(new Parts("B1"));
    car1 = renderer.registerParts(new Parts("car1"));
    car2 = renderer.registerParts(new Parts("car2"));
    car3 = renderer.registerParts(new Parts("car3"));
    car4 = renderer.registerParts(new Parts("car4"));
    car5 = renderer.registerParts(new Parts("car5"));
    car6 = renderer.registerParts(new Parts("car6"));
    car7 = renderer.registerParts(new Parts("car7"));
    car8 = renderer.registerParts(new Parts("car8"));
    car9 = renderer.registerParts(new Parts("car9"));
    car10 = renderer.registerParts(new Parts("car10"));
    car11 = renderer.registerParts(new Parts("car11"));
    car12 = renderer.registerParts(new Parts("car12"));
    car13 = renderer.registerParts(new Parts("car13"));
    car14 = renderer.registerParts(new Parts("car14"));
    car15 = renderer.registerParts(new Parts("car15"));
}



function lights(entity) {
    reverser = entity.getTrainStateData(10);

    if (reverser == 0) {
        F.render(renderer);
        B1.render(renderer);
    } else if (reverser == 2) {
        B.render(renderer);
        F1.render(renderer);
    } else {
        F1.render(renderer);
        B1.render(renderer);
    }

}


function Monitor_1(entity) {
    var signal = entity.getSignal();
    var speed = Math.ceil(entity.getSpeed() * 72);
    if (speed > 60) { //60km/h�ȏ�̎�

        GL11.glPushMatrix();
        rollsign_off.render(renderer);
        GL11.glPopMatrix();
    }


}





function render(entity, pass, par3) {

    //nullのとき処理を止めないとメニューでクラッシュ
    if (entity === null) {
        pre.render(renderer);
        return;
    }

    //処理 tick単位のためこの中では描画できない
    var shouldUpdate = updateTick(entity, pass);
    if (shouldUpdate) {
        updateAnimation(entity);
    }

    //描画
    if (pass >= 0 && pass <= 4) {
        if (entity === null) {
            return;
        } else {
            body.render(renderer);
            Monitor_1(entity);
            lights(entity);
            render_door(entity);
            renderRollsign(entity);
            carN(entity);
        }
    }
}






function carN(entity) {
    if (entity === null) {
        return;
    } else {
        var formation = entity.getFormation();
        if (formation == null) return;
        var form = formation.getEntry(entity).entryId + 1;

        if (form < 16 && form > 0) {
            GL11.glPushMatrix();
            Function('car' + form + '.render(renderer);')();
            GL11.glPopMatrix();
        }
    }
}

//entity === null対応済
function render_door(entity) {
    var moveL = renderer.getDoorMovementL(entity);
    var moveR = renderer.getDoorMovementR(entity);
    var doorlength = 0.64;
    GL11.glPushMatrix(); //LF
    GL11.glTranslatef(0.0, 0.0, doorlength * doorType("Linear", moveL));
    doorFL.render(renderer);
    GL11.glPopMatrix();
    GL11.glPushMatrix(); //LB
    GL11.glTranslatef(0.0, 0.0, -doorlength * doorType("Linear", moveL));
    doorBL.render(renderer);
    GL11.glPopMatrix();
    GL11.glPushMatrix(); //RF
    GL11.glTranslatef(0.0, 0.0, doorlength * doorType("Linear", moveR));
    doorFR.render(renderer);
    GL11.glPopMatrix();
    GL11.glPushMatrix(); //RB
    GL11.glTranslatef(0.0, 0.0, -doorlength * doorType("Linear", moveR));
    doorBR.render(renderer);
    GL11.glPopMatrix();
}

function doorType(type, par1) {
    if (type == "Linear") {
        var m;
        if (par1 === 1.0) { m = 1.0; } else if (par1 === 0.0) { m = 0.0; } else if (par1 > 0.0 && par1 < 0.3) {
            m = 0.66666 * par1;
        } else if (par1 >= 0.3 && par1 <= 0.8) {
            m = 1.4 * par1 - 0.22;
        } else if (par1 > 0.8 && par1 < 1.0) {
            m = par1 * 0.5 + 0.5;
        }
        return m;
    } else if (type == "Normal") {
        return renderer.sigmoid(par1);
    } else {
        return par1;
    }
}

//Tick更新検知 1回だけ実行すること 描画には使えない
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
    var rollsignTime = renderer.getSystemTime() * 20 % 600; //rollsignAnimationTimeData[entityId]; //時間同期のため強引に対応
    if (rollsignTime === undefined) rollsignTime = 0;
    var rollsignId = entity.getTrainStateData(8);
    var rollsignBlacklist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]; //篠目線を表示しない行き先リスト

    if (rollsignTime % 600 >= 400 && rollsignBlacklist.indexOf(rollsignId) === -1) {
        //路線表示
        var vartex3 = [
            [
                [1.3590, 2.2621, 0.2653],
                [1.3590, 2.0891, -0.3747]
            ], //左上の座標, 右下の座標 (m)
            [
                [-1.3590, 2.2621, -0.3747],
                [-1.3590, 2.0891, 0.2653]
            ]
        ];
        var uv3 = [
            [256 / 1024, 0],
            [382 / 1024, 32 / 1024]
        ];
        if (rollsignTime % 200 >= 100) uv3 = [
            [383 / 1024, 0],
            [509 / 1024, 32 / 1024]
        ];
        renderVartexListWithUV(vartex3, uv3);
    }

    //種別
    var vartex1 = [
        [
            [-0.475, 2.4188, 9.67],
            [-0.19, 2.1813, 9.67]
        ],
        [
            [1.375, 2.2650, 5.225],
            [1.375, 2.1150, 5]
        ],
        [
            [-1.375, 2.2650, 4.4750],
            [-1.375, 2.1150, 4.7]
        ]
    ];
    var uv1 = [
        [0, 0],
        [48 / 1024, 32 / 1024]
    ];
    if (rollsignTime % 200 >= 100) uv1 = [
        [50 / 1024, 0],
        [97 / 1024, 32 / 1024]
    ];
    var rollsignPage1 = rollsignId;
    if (6 <= rollsignId && rollsignId <= 22) rollsignPage1 = 6;
    if (23 <= rollsignId && rollsignId <= 39) rollsignPage1 = 7;
    if (40 <= rollsignId && rollsignId <= 56) rollsignPage1 = 8;
    if (57 <= rollsignId && rollsignId <= 73) rollsignPage1 = 9;
    var offsetV1 = uv1[1][1] * rollsignPage1;
    var uv1R = [
        [uv1[0][0], uv1[0][1] + offsetV1],
        [uv1[1][0], uv1[1][1] + offsetV1]
    ]; //左上のUV, 右下のUV
    renderVartexListWithUV(vartex1, uv1R);

    //行先
    var vartex2 = [
        [
            [-0.19, 2.4188, 9.67],
            [0.475, 2.1813, 9.67]
        ],
        [
            [1.375, 2.2650, 5],
            [1.375, 2.1150, 4.4750]
        ],
        [
            [-1.375, 2.2650, 4.7],
            [-1.375, 2.1150, 5.225]
        ]
    ];
    var uv2 = [
        [99 / 1024, 0],
        [210 / 1024, 32 / 1024]
    ];
    if (rollsignTime % 200 >= 100) uv2 = [
        [212 / 1024, 0],
        [323 / 1024, 32 / 1024]
    ];
    var rollsignPage2 = 0;
    if (rollsignId < 24) { //行き先と表示させるタイルを一致させる
        rollsignPage2 = rollsignId;
    } else if (rollsignId >= 24 && rollsignId < 41) {
        rollsignPage2 = rollsignId - 17;
    } else if (rollsignId >= 41 && rollsignId < 58) {
        rollsignPage2 = rollsignId - 34;
    } else if (rollsignId >= 58) {
        rollsignPage2 = rollsignId - 51;
    } else {
        rollsignPage2 = rollsignId;
    }

    var offsetV2 = uv2[1][1] * rollsignPage2;
    var uv2R = [
        [uv2[0][0], uv2[0][1] + offsetV2],
        [uv2[1][0], uv2[1][1] + offsetV2]
    ]; //左上のUV, 右下のUV
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
