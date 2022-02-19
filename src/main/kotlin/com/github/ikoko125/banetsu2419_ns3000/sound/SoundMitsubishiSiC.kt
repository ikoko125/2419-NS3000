package com.github.ikoko125.banetsu2419_ns3000.sound

import jp.ngt.rtm.entity.train.util.TrainState
import jp.ngt.rtm.sound.SoundUpdaterTrain

@Suppress("DEPRECATION", "unused") //Why did RTM deprecate to playSound and stopSound???
object SoundMitsubishiSiC {
    private var prevDoorStateId = 1

    @JvmStatic
    fun onUpdate(soundUpdater: SoundUpdaterTrain) {
        playBlindBell(soundUpdater)

        if (soundUpdater.speed <= 0.1) return

        playMotorSound(soundUpdater)
    }

    private fun playBlindBell(soundUpdater: SoundUpdaterTrain) {
        val entity = soundUpdater.entity

        with(
            entity.getVehicleState(TrainState.TrainStateType.Door).toInt()
                    to entity.resourceState.dataMap.getDouble("SU${entity.entityId.shl(prevDoorStateId)}").toInt()
        ) {
            if (first == 1 && second == 0 || first == 3 && second == 2) {
                soundUpdater.playSound("sound_iwsmlib", "RTMLib.sound.blindbell50000", 1.0f, 1.0f)
            } else if (first == 0 && second == 1 || first == 2 && second == 3) {
                soundUpdater.stopSound("sound_iwsmlib", "RTMLib.sound.blindbell50000")
            } else if (first == 2 && second == 0 || first == 3 && second == 1) {
                soundUpdater.playSound("sound_iwsmlib", "RTMLib.sound.blindbell50000", 1.0f, 1.0f)
            } else if (first == 0 && second == 2 || first == 1 && second == 3) {
                soundUpdater.stopSound("sound_iwsmlib", "RTMLib.sound.blindbell50000")
            }
            soundUpdater.entity.resourceState.dataMap.setDouble("SU${entity.entityId.shl(prevDoorStateId)}", first.toDouble(), 0)
        }
    }

    private fun playMotorSound(soundUpdater: SoundUpdaterTrain) {
        val speed = soundUpdater.speed
        
        if (speed > 53 && speed < 95) {
            soundUpdater.playSound(
                "sound_ntsa_nt", 
                "train.ntsa_run5",
                if (speed > 85) calcFade(85.0f to 98.0f, 0.8f to 0.0f, speed) else 1.0f,
                calcFade(41.0f to 130.0f, 0.8f to 1.4f, speed))
        } else soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run5")

        if (speed > 70 && speed < 130) {

            soundUpdater.playSound(
                "sound_ntsa_nt",
                "train.ntsa_run6",
                if (speed < 89) calcFade(65.0f to 89.0f, 0.7f to 1.0f, speed) else 1.0f,
                calcFade(65.0f to 89.0f, 0.8f to 1.35f, speed)
            )
        } else soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run6")
        
        if (soundUpdater.notch == 0) {
            soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run1")
            soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run2")
            soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run3")
            soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run4")
            return
        }

        if (speed < 41) {
            soundUpdater.playSound(
                "sound_ntsa_nt",
                "train.ntsa_run1",
                if (speed < 6) calcFade(0.0f to 6.0f, 0.0f to 0.8f, speed)
                else if (speed > 40) calcFade(40.0f to 42.0f, 0.8f to 0.0f, speed)
                else 1.0f,
                1.0f
            )
        } else soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run1")
        
        if (speed > 21 && speed < 28) {
            soundUpdater.playSound(
                "sound_ntsa_nt",
                "train.ntsa_run2",
                if (speed < 22) calcFade(15.0f to 22.0f, 0.0f to 1.0f, speed) else 1.0f,
                calcFade(21.0f to 34.0f, 1.0f to 1.6f, speed)
            )
        } else soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run2")
        
        if (speed > 19 && speed < 41) {
            soundUpdater.playSound(
                "sound_ntsa_nt",
                "train.ntsa_run3",
                if (speed < 22) calcFade(14.0f to 22.0f, 0.3f to 1.0f, speed) else 1.0f,
                calcFade(19.0f to 45.0f, 0.88f to 1.5f, speed)
            )
        } else soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run3")

        if (speed > 38 && speed < 57) {
            soundUpdater.playSound(
                "sound_ntsa_nt",
                "train.ntsa_run4",
                if (speed < 42) calcFade(38.0f to 42.0f, 0.0f to 1.0f, speed)
                else if (speed > 50) calcFade(50.0f to 60.0f, 1.0f to 0.0f, speed)
                else 1.0f,
                calcFade(38.0f to 47.0f, 0.95f to 1.2f, speed)
            )
        } else soundUpdater.stopSound("sound_ntsa_nt", "train.ntsa_run4")
    }

    private fun calcFade(speed: Pair<Float, Float>, fade: Pair<Float, Float>, currentSpeed: Float) =
        (fade.second - fade.first) / (speed.second - speed.first) * (currentSpeed - speed.first) + fade.first
}
