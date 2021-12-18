//hi03SoundLib、MugenTrainSoundLibが必要ない

importPackage(Packages.jp.ngt.rtm);
importPackage(Packages.jp.ngt.rtm.render);

var prevDoorStateID = 1;



function onUpdate(su) {
   notch = su.getNotch();
   var speed = su.getSpeed();
  var regenerationBreak = false;
  var entity = su.getEntity();
  var entityID = -1;

  if(entity != null){
  	//entityID = entity.getEntityId();//DevEnv
  	entityID = entity.func_145782_y();//Compiled
  }

  var doorState = entity.getTrainStateData(4);
  var prevDoorState = -1;

  //盲導鈴
  if(entityID != -1){
   prevDoorState = entityID != -1 ? su.getData(entityID << prevDoorStateID) : 0;
  }

  if((doorState == 1 && prevDoorState == 0) || (doorState == 3 && prevDoorState == 2)){
	su.playSound('sound_iwsmlib', 'RTMLib.sound.blindbell50000', 1.0, 1.0);
	su.setData(entityID << prevDoorStateID, doorState);
  }

  if((doorState == 0 && prevDoorState == 1) || (doorState == 2 && prevDoorState == 3)){
	su.stopSound('sound_iwsmlib', 'RTMLib.sound.blindbell50000');
	su.setData(entityID << prevDoorStateID, doorState);
  }

  if((doorState == 2 && prevDoorState == 0) || (doorState == 3 && prevDoorState == 1)){
	su.playSound('sound_iwsmlib', 'RTMLib.sound.blindbell50000', 1.0, 1.0);
	su.setData(entityID << prevDoorStateID, doorState);
  }

  if((doorState == 0 && prevDoorState == 2) || (doorState == 1 && prevDoorState == 3)){
	su.stopSound('sound_iwsmlib', 'RTMLib.sound.blindbell50000');
	su.setData(entityID << prevDoorStateID, doorState);
  }




  if(speed>0.1){
    if(notch!=0){
      
      if(speed>0&&speed<41){
        var pit1 = 1.0,
            vol1 = 1.0;
        if(speed<6) vol1 = fadeCon(0, 0.0, 6, 0.8, su);
        if(speed>40) vol1 = fadeCon(40, 0.8, 42, 0.0, su);
        su.playSound('sound_ntsa_nt', 'train.ntsa_run1', vol1, pit1);
      }
      else{
        su.stopSound('sound_ntsa_nt', 'train.ntsa_run1');
      }
      if(speed>21&&speed<28){
        var pit3 = fadeCon(21, 1.0, 34, 1.6, su),
            vol3 = 1.0;
        if(speed<22) vol5 = fadeCon(15, 0.0, 22, 1.0, su);
        if(speed>28) vol5 = fadeCon(28, 1.0, 32, 0.5, su);
        su.playSound('sound_ntsa_nt', 'train.ntsa_run2', vol5, pit3);
      }
      else{
        su.stopSound('sound_ntsa_nt', 'train.ntsa_run2');
      }
      if(speed>19&&speed<41){
        var pit4 = fadeCon(19, 0.88, 45, 1.5, su),
            vol4 = 1.0;
        if(speed<22) vol4 = fadeCon(14, 0.3, 22, 1.0, su);
        if(speed>44) vol4 = fadeCon(44, 1.0, 58, 0.0, su);
        su.playSound('sound_ntsa_nt', 'train.ntsa_run3', vol4, pit4);
      }
      else{
        su.stopSound('sound_ntsa_nt', 'train.ntsa_run3');
      }
      if(speed>38&&speed<57){
        var pit6 = fadeCon(38, 0.95, 47, 1.2, su),
            vol6 = 1.0;
        if(speed<42) vol6 = fadeCon(38, 0.0, 42, 1.0, su);
        if(speed>50) vol6 = fadeCon(50, 1.0, 60, 0.0, su);
        su.playSound('sound_ntsa_nt', 'train.ntsa_run4', vol6, pit6);
      }
      else{
        su.stopSound('sound_ntsa_nt', 'train.ntsa_run4');
      }
    }
    else{
      su.stopSound('sound_ntsa_nt', 'train.ntsa_run1');
      su.stopSound('sound_ntsa_nt', 'train.ntsa_run2');
      su.stopSound('sound_ntsa_nt', 'train.ntsa_run3');
      su.stopSound('sound_ntsa_nt', 'train.ntsa_run4');
    }
      if(speed>53&&speed<95){
        var pit5 = fadeCon(41, 0.8, 130, 1.4, su),
            vol5 = 1.0;
        if(speed<51) vol5 = fadeCon(51, 0.0, 55, 0.8, su);
        if(speed>85) vol5 = fadeCon(85, 0.8, 98, 0.0, su);
        su.playSound('sound_ntsa_nt', 'train.ntsa_run5', vol5, pit5);
      }
      else{
        su.stopSound('sound_ntsa_nt', 'train.ntsa_run5');
      }
      if(speed>70&&speed<130){
        var pit7 = fadeCon(70, 0.8, 130, 1.35, su),
            vol7 = 1.0;
        if(speed<89) vol7 = fadeCon(65, 0.7, 89, 1.0, su);
        if(speed>130) vol7 = fadeCon(130, 1.0, 131, 0.0, su);
        su.playSound('sound_ntsa_nt', 'train.ntsa_run6', vol7, pit7);
      }
      else{
        su.stopSound('sound_ntsa_nt', 'train.ntsa_run6');
      }    
    } 
}
function fadeCon(speed1,fade1,speed2,fade2,su){
  var speed = su.getSpeed();
    return (((fade2-fade1)/(speed2-speed1))*(speed-speed1))+fade1;
} 