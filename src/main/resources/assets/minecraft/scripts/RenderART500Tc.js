var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);

function init(par1, par2)
{
	body = renderer.registerParts(new Parts("face", "InFace", "ExFace", "obj1", "obj2", "obj3"));
	doorLF = renderer.registerParts(new Parts("doorLF"));
	doorLB = renderer.registerParts(new Parts("doorLB"));
	doorRF = renderer.registerParts(new Parts("doorRF"));
	doorRB = renderer.registerParts(new Parts("doorRB"));
	doorLF1 = renderer.registerParts(new Parts("doorLF1"));
	doorLB1 = renderer.registerParts(new Parts("doorLB1"));
	doorRF1 = renderer.registerParts(new Parts("doorRF1"));
	doorRB1 = renderer.registerParts(new Parts("doorRB1"));
	car1 = renderer.registerParts(new Parts("1car"));
	car2 = renderer.registerParts(new Parts("2car"));
	car3 = renderer.registerParts(new Parts("3car"));
	car4 = renderer.registerParts(new Parts("4"));
	car5 = renderer.registerParts(new Parts("5"));
	car6 = renderer.registerParts(new Parts("6"));
	car7 = renderer.registerParts(new Parts("7"));
	car8 = renderer.registerParts(new Parts("8"));
	car9 = renderer.registerParts(new Parts("9"));
	car10 = renderer.registerParts(new Parts("10"));
	nightWindow = renderer.registerParts(new Parts("Nightwindow"));
	Aoff = renderer.registerParts(new Parts("off"));
	AoffB = renderer.registerParts(new Parts("offB"));
}



function lights(entity){
	if(entity === null){

		return
	}
	reverser = entity.getTrainStateData(10);

if(reverser == 0){
	Aoff.render(renderer);
}
else if(reverser == 2){
	AoffB.render(renderer);
}
else{
	return;
}

}


function randomcurtain(entity){
	var time = renderer.getMCTime();
	if(time < 400 || time > 13000){
		nightWindow.render(renderer);
	}
}


function render_door(entity){
	var moveL = 0;
	var moveR = 0;
	var doorMoveL = renderer.getDoorMovementL(entity),
		doorMoveR = renderer.getDoorMovementR(entity);
		if(entity != null){
			moveL = renderer.sigmoid(entity.doorMoveL / 5);
			moveR = renderer.sigmoid(entity.doorMoveR / 5);
			}

			if(time < 400 || time > 13000){
		  GL11.glPushMatrix();
		   GL11.glTranslatef(moveL * 0.07, 0.0, doorMoveL * 0.7);
		   doorLF1.render(renderer);
		  GL11.glPopMatrix();
		  GL11.glPushMatrix();
		   GL11.glTranslatef(moveL * 0.07, 0.0, -doorMoveL * 0.7);
		   doorLB1.render(renderer);
		  GL11.glPopMatrix();
		  GL11.glPushMatrix();
		   GL11.glTranslatef(-moveR * 0.07, 0.0, doorMoveR * 0.7);
		   doorRF1.render(renderer);
		  GL11.glPopMatrix();
		  GL11.glPushMatrix();
		   GL11.glTranslatef(-moveR * 0.07, 0.0, -doorMoveR * 0.7);
		   doorRB1.render(renderer);
		  GL11.glPopMatrix();
		}
		else{
		  GL11.glPushMatrix();
		   GL11.glTranslatef(moveL * 0.07, 0.0, doorMoveL * 0.7);
		   doorLF.render(renderer);
		  GL11.glPopMatrix();
		  GL11.glPushMatrix();
		   GL11.glTranslatef(moveL * 0.07, 0.0, -doorMoveL * 0.7);
		   doorLB.render(renderer);
		  GL11.glPopMatrix();
		  GL11.glPushMatrix();
		   GL11.glTranslatef(-moveR * 0.07, 0.0, doorMoveR * 0.7);
		   doorRF.render(renderer);
		  GL11.glPopMatrix();
		  GL11.glPushMatrix();
		   GL11.glTranslatef(-moveR * 0.07, 0.0, -doorMoveR * 0.7);
		   doorRB.render(renderer);
		  GL11.glPopMatrix();
		}
	
}	





	
function render(entity, pass, par3){
	time = renderer.getMCTime();
	if(pass==0){
		body.render(renderer);
		render_door(entity);
		lights(entity);
	}
	if(pass==1){
		body.render(renderer);
		randomcurtain(entity);
		render_door(entity);
		lights(entity);
	}
	if(pass==2){
		body.render(renderer);
		randomcurtain(entity);
		render_door(entity);
		lights(entity);
	}
	if(pass==3){
		body.render(renderer);
		randomcurtain(entity);
		render_door(entity);
		lights(entity);
	}
	if(pass==4){
		body.render(renderer);
		randomcurtain(entity);
		render_door(entity);
		lights(entity);
    }

        if (pass >= 0 && pass <= 4) {
        if(entity == null){
			return;
        }
        else{
            var formation = entity.getFormation();
        if(formation == null) return;
        var CarNumber = formation.getEntry(entity).entryId+1;

        switch( CarNumber ) {
        case 1:
            GL11.glPushMatrix();
            car1.render(renderer);
            GL11.glPopMatrix();
            break;
        case 2:
            GL11.glPushMatrix();
            car2.render(renderer);
            GL11.glPopMatrix();
            break;
        case 3:
            GL11.glPushMatrix();
            car3.render(renderer);
            GL11.glPopMatrix();
            break;
        case 4:
            GL11.glPushMatrix();
            car4.render(renderer);
            GL11.glPopMatrix();
            break;
        case 5:
            GL11.glPushMatrix();
            car5.render(renderer);
            GL11.glPopMatrix();
            break;
        case 6:
            GL11.glPushMatrix();
            car6.render(renderer);
            GL11.glPopMatrix();
            break;
        case 7:
            GL11.glPushMatrix();
            car7.render(renderer);
            GL11.glPopMatrix();
            break;
        case 8:
            GL11.glPushMatrix();
            car8.render(renderer);
            GL11.glPopMatrix();
            break;
        case 9:
            GL11.glPushMatrix();
            car9.render(renderer);
            GL11.glPopMatrix();
            break;
        case 10:
            GL11.glPushMatrix();
            car10.render(renderer);
            GL11.glPopMatrix();
            break;
        }
        }
    }
}