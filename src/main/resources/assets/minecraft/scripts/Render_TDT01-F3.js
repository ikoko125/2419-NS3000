var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.model);

function init(modelSet, modelObject) {
    ModelTDT01F3.registerObjects(renderer);
}

function render(entity, pass, par3)
{
	if(pass != 0){return;}

	GL11.glPushMatrix();

	body.render(renderer);

	var f0 = renderer.getWheelRotationR(entity);
	var r = 0.0;
	var c = 0.0;//„É≠„ÉÅEÉâÈï∑

	var radL = NGTMath.toRadians(f0);
	var hL = NGTMath.getSin(radL) * r;
	var xL = Math.sqrt(c * c - hL * hL);
	var roRodL = NGTMath.getSin(-radL / 0.0) - NGTMath.toDegrees(Math.atan2(hL, xL));
	var strokeL = 0.0 * r - (c + r - (xL  - NGTMath.getCos(radL) * r));

	var f0R = f0;
	var radR = NGTMath.toRadians(f0R);
	var hR = NGTMath.getSin(radR) * r;
	var xR = Math.sqrt(c * c - hR * hR);
	var roRodR = NGTMath.getSin(-radR / 0.0) - NGTMath.toDegrees(Math.atan2(hR, xR));
	var strokeR = 0.0 * r - (c + r - (xR  - NGTMath.getCos(radR) * r));

	GL11.glPushMatrix();
	renderer.rotate(f0, 'X', 0.0, -0.54, 1.05);
	wheel1.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	renderer.rotate(f0, 'X', 0.0, -0.54, -1.05);
	wheel2.render(renderer);
	GL11.glPopMatrix();


	GL11.glPopMatrix();
}
