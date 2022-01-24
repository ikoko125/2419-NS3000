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
importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.model);
importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.render);

function init(modelSet, modelObject) {
    Model3000M.registerObjects(renderer);
}

function render(entity, pass, partialTick) {
    Render3000M.render(renderer, entity, pass);
}
