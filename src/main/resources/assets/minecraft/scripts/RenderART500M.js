var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.com.github.ikoko125.banetsu2419_ns3000.model);

function init(modelSet, modelObject) {
    ModelART500M.registerObjects(renderer);
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
	}
	if(pass==1){
		body.render(renderer);
		randomcurtain(entity);
		render_door(entity);
	}
	if(pass==2){
		body.render(renderer);
		randomcurtain(entity);
		render_door(entity);
	}
	if(pass==3){
		body.render(renderer);
		randomcurtain(entity);
		render_door(entity);
	}
	if(pass==4){
		body.render(renderer);
		randomcurtain(entity);
		render_door(entity);
	}


		//パンタ動作用
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

		if (pass >= 0 && pass <= 4) {
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


		var pantaRotate1,pantaRotate2,pantaRotate4;//パンタ動作用
		try{
		  pantaRotate1 = renderer.sigmoid(entity.pantograph_F / 60) * 1.2 * 30;//パンタ動作用
		  pantaRotate2 = renderer.sigmoid(entity.pantograph_F / 60) * 1.2 * 56;//パンタ動作用
		  pantaRotate4 = renderer.sigmoid(entity.pantograph_F / 60) * 1.2 * 66;//パンタ動作用
		}catch(e)
		{}
		if(pass == 0){
			GL11.glPushMatrix();
			renderer.rotate(pantaRotate1, 'X', 0.0, 2.2085, 2.3091);
			panta1.render(renderer);
			renderer.rotate(-pantaRotate2, 'X', 0.0, 3.0606, 3.8144);
			panta2.render(renderer);
			renderer.rotate(pantaRotate1, 'X', -0.0320, 4.0304, 2.3787);
			panta3.render(renderer);
			GL11.glPopMatrix();
			GL11.glPushMatrix();
			renderer.rotate(pantaRotate1, 'X', 0.0, 2.2085, 2.3091);
			renderer.rotate(-pantaRotate2, 'X', 0.0, 3.0606, 3.8144);
			renderer.rotate(pantaRotate4, 'X', 0.0, 2.22, 3.0478);
			panta4.render(renderer);
			GL11.glPopMatrix();
		}
		
}
