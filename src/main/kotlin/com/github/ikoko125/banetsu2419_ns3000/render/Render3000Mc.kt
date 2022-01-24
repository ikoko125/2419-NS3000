package com.github.ikoko125.banetsu2419_ns3000.render

import com.github.ikoko125.banetsu2419_ns3000.model.Model3000Mc
import jp.ngt.ngtlib.math.NGTMath
import jp.ngt.rtm.entity.train.EntityTrainBase
import jp.ngt.rtm.entity.train.util.TrainState
import jp.ngt.rtm.render.VehiclePartsRenderer
import org.lwjgl.opengl.GL11
import org.lwjgl.util.vector.Vector2f
import org.lwjgl.util.vector.Vector3f
import kotlin.math.ceil

@Suppress("unused")
object Render3000Mc {
    @JvmStatic
    fun render(renderer: VehiclePartsRenderer, entity: EntityTrainBase?, pass: Int) {
        val model = Model3000Mc.getModel(renderer.modelName)!!

        model.body.render(renderer)
        if (entity == null) {
            model.f1.render(renderer)
            model.b1.render(renderer)
            model.doorFR.render(renderer)
            model.doorFL.render(renderer)
            model.doorBR.render(renderer)
            model.doorBL.render(renderer)
            return
        }

        if (pass !in 0..4) return
        hideRollsign(renderer, entity)
        renderLights(renderer, entity)
        renderDoor(renderer, entity)
        renderRollsign(renderer, entity)
        renderCar(renderer, entity)
    }

    private fun hideRollsign(renderer: VehiclePartsRenderer, entity: EntityTrainBase) {
        if (ceil(entity.speed * 72) < 60) return

        GL11.glPushMatrix()
        Model3000Mc.getModel(renderer.modelName)!!.rollsignOff.render(renderer)
        GL11.glPopMatrix()
    }

    private fun renderLights(renderer: VehiclePartsRenderer, entity: EntityTrainBase) {
        val reverser = entity.getVehicleState(TrainState.TrainStateType.Role).toInt()
        val model = Model3000Mc.getModel(renderer.modelName)!!

        when (reverser) {
            0 -> {
                model.f.render(renderer)
                model.b1.render(renderer)
            }
            2 -> {
                model.b.render(renderer)
                model.f1.render(renderer)
            }
            else -> {
                model.f1.render(renderer)
                model.b1.render(renderer)
            }
        }
    }

    private fun renderDoor(renderer: VehiclePartsRenderer, entity: EntityTrainBase) {
        val moveR = renderer.getDoorMovementR(entity)
        val moveL = renderer.getDoorMovementL(entity)
        val model = Model3000Mc.getModel(renderer.modelName)!!

        GL11.glPushMatrix()
        GL11.glTranslated(0.0, 0.0, 0.64 * getMultiplier(MovementType.LINEAR, moveR))
        model.doorFR.render(renderer)
        GL11.glPopMatrix()

        GL11.glPushMatrix()
        GL11.glTranslated(0.0, 0.0, 0.64 * getMultiplier(MovementType.LINEAR, moveL))
        model.doorFL.render(renderer)
        GL11.glPopMatrix()

        GL11.glPushMatrix()
        GL11.glTranslated(0.0, 0.0, -0.64 * getMultiplier(MovementType.LINEAR, moveR))
        model.doorBR.render(renderer)
        GL11.glPopMatrix()

        GL11.glPushMatrix()
        GL11.glTranslated(0.0, 0.0, -0.64 * getMultiplier(MovementType.LINEAR, moveL))
        model.doorBL.render(renderer)
        GL11.glPopMatrix()
    }

    @Suppress("DuplicatedCode")
    private fun renderRollsign(renderer: VehiclePartsRenderer, entity: EntityTrainBase) {
        if (renderer.currentMatId != 0) return

        val time = System.currentTimeMillis() * 20 % 600
        val id = entity.getVehicleState(TrainState.TrainStateType.Destination)

        //路線表示
        if (time >= 400 && id !in 0..50) {
            RenderUtil.renderVertexListWithUV(
                listOf(
                    Vector3f(1.3590f, 2.2621f, 0.2653f) to Vector3f(1.3590f, 2.0891f, -0.3747f),
                    Vector3f(-1.3590f, 2.2621f, -0.3747f) to Vector3f(-1.3590f, 2.0891f, 0.2653f)
                ),
                if (time % 200 >= 100)
                    Vector2f(383 / 1024f, 0f) to Vector2f(509 / 1024f, 32f / 1024f)
                else
                    Vector2f(256 / 1024f, 0f) to Vector2f(382 / 1024f, 32f / 1024f)
            )
        }

        //種別
        run {
            val uv =
                if (time % 200 >= 100)
                    Vector2f(50 / 1024f, 0f) to Vector2f(97 / 1024f, 32 / 1024f)
                else
                    Vector2f(0f, 0f) to Vector2f(48 / 1024f, 32 / 1024f)
            val offset = uv.second.y * (if (id !in 6..73) id.toInt() else (id - 6 - ((id - 6) / 16)) / 16 + 6)

            RenderUtil.renderVertexListWithUV(
                listOf(
                    Vector3f(-0.475f, 2.4188f, 9.67f) to Vector3f(-0.19f, 2.1813f, 9.67f),
                    Vector3f(1.375f, 2.2650f, 5.225f) to Vector3f(1.375f, 2.1150f, 5f),
                    Vector3f(-1.375f, 2.2650f, 4.4750f) to Vector3f(-1.375f, 2.1150f, 4.7f)
                ),
                Vector2f(uv.first.x, uv.first.y + offset) to Vector2f(uv.second.x, uv.second.y + offset)
            )
        }

        //行先
        run {
            val uv =
                if (time % 200 >= 100)
                    Vector2f(212 / 1024f, 0f) to Vector2f(323 / 1024f, 32 / 1024f)
                else
                    Vector2f(99 / 1024f, 0f) to Vector2f(210 / 1024f, 32 / 1024f)
            val offset = uv.second.y * (if (id >= 24) (id - 7) % 17 + 7 else id.toInt())

            RenderUtil.renderVertexListWithUV(
                listOf(
                    Vector3f(-0.19f, 2.4188f, 9.67f) to Vector3f(0.475f, 2.1813f, 9.67f),
                    Vector3f(1.375f, 2.2650f, 5f) to Vector3f(1.375f, 2.1150f, 4.4750f),
                    Vector3f(-1.375f, 2.2650f, 4.7f) to Vector3f(-1.375f, 2.1150f, 5.225f)
                ),
                Vector2f(uv.first.x, uv.first.y + offset) to Vector2f(uv.second.x, uv.second.y + offset)
            )
        }
    }

    private fun renderCar(renderer: VehiclePartsRenderer, entity: EntityTrainBase) {
        val formation = entity.formation.getEntry(entity).entryId + 1

        if (formation !in 1..15) return

        val model = Model3000Mc.getModel(renderer.modelName)!!

        GL11.glPushMatrix()
        when (formation) {
            1 -> model.car1.render(renderer)
            2 -> model.car2.render(renderer)
            3 -> model.car3.render(renderer)
            4 -> model.car4.render(renderer)
            5 -> model.car5.render(renderer)
            6 -> model.car6.render(renderer)
            7 -> model.car7.render(renderer)
            8 -> model.car8.render(renderer)
            9 -> model.car9.render(renderer)
            10 -> model.car10.render(renderer)
            11 -> model.car11.render(renderer)
            12 -> model.car12.render(renderer)
            13 -> model.car13.render(renderer)
            14 -> model.car14.render(renderer)
            15 -> model.car15.render(renderer)
        }
        GL11.glPopMatrix()
    }

    @Suppress("SameParameterValue")
    private fun getMultiplier(movementType: MovementType, doorMovement: Float): Float {
        return when (movementType) {
            MovementType.LINEAR -> {
                if (doorMovement == 0f || doorMovement == 1f) doorMovement
                else if(doorMovement > 0.0 && doorMovement < 0.3) doorMovement * 0.66666f
                else if (doorMovement in 0.3..0.8) doorMovement * 1.4f - 0.22f
                else doorMovement * 0.5f + 0.5f
            }
            MovementType.NORMAL -> NGTMath.sigmoid(doorMovement.toDouble(), 5.0).toFloat()
        }
    }

    enum class MovementType {
        LINEAR,
        NORMAL
    }
}
