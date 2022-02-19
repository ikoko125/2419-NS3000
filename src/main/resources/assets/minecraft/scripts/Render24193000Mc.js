//このスクリプトはフリーなので好きなだけコピったり複製して改造してOKです

var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";

importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.model);
importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.render);

function init(modelSet, modelObject) {
    Model3000Mc.registerObjects(renderer);
}

function render(entity, pass, partialTick) {
    Render3000Mc.render(renderer, entity, pass)
}
