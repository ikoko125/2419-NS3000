var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";

importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.model);
importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.render);

function init(modelSet, modelObject) {
    ModelART500Tc.registerObjects(renderer);
}

function render(entity, pass, partialTick) {
    RenderART500Tc.render(renderer, entity, pass)
}
