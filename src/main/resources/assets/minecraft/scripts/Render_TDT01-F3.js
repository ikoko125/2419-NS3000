var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";

importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.model);
importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.render);

function init(modelSet, modelObject) {
    ModelTDT01F3.registerObjects(renderer);
}

function render(entity, pass, par3) {
    RenderTDT01F3.render(renderer, entity, pass)
}
