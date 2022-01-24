package com.github.ikoko125.banetsu2419_ns3000.render

import com.github.ikoko125.banetsu2419_ns3000.model.Model3000M
import jp.ngt.rtm.entity.train.EntityTrainBase
import jp.ngt.rtm.entity.train.util.TrainState
import jp.ngt.rtm.render.VehiclePartsRenderer
import org.lwjgl.opengl.GL11
import org.lwjgl.util.vector.Vector2f
import org.lwjgl.util.vector.Vector3f
import kotlin.math.ceil

@Suppress("unused")
object Render3000M {
    @JvmStatic
    fun render(renderer: VehiclePartsRenderer, entity: EntityTrainBase?, pass: Int) {
        if (pass in 0..4) {
            GL11.glPushMatrix()
            Model3000M.getModel(renderer.modelName)!!.body.render(renderer)
            hideRollsign(renderer, entity)
            renderDoor(renderer, entity)
            GL11.glPopMatrix()
        }

        if (entity == null || pass > 4) return
        renderRollsign(renderer, entity)
    }

    private fun hideRollsign(renderer: VehiclePartsRenderer, entity: EntityTrainBase?) {
        if (entity == null || ceil(entity.speed * 72) < 60) return

        GL11.glPushMatrix()
        Model3000M.getModel(renderer.modelName)!!.rollsignOff.render(renderer)
        GL11.glPushMatrix()
    }

    @Suppress("DuplicatedCode")
    private fun renderDoor(renderer: VehiclePartsRenderer, entity: EntityTrainBase?) {
        val doorMoveL = renderer.getDoorMovementL(entity)
        val doorMoveR = renderer.getDoorMovementR(entity)
        val model = Model3000M.getModel(renderer.modelName)!!

        GL11.glPushMatrix()
        GL11.glTranslated(0.0, 0.0, doorMoveL * 0.7)
        model.doorFL.render(renderer)
        GL11.glPopMatrix()

        GL11.glPushMatrix()
        GL11.glTranslated(0.0, 0.0, -doorMoveL * 0.7)
        model.doorBL.render(renderer)
        GL11.glPopMatrix()

        GL11.glPushMatrix()
        GL11.glTranslated(0.0, 0.0, doorMoveR * 0.7)
        model.doorFR.render(renderer)
        GL11.glPopMatrix()

        GL11.glPushMatrix()
        GL11.glTranslated(0.0, 0.0, -doorMoveR * 0.7)
        model.doorBR.render(renderer)
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
            val offset = uv.second.y * (if (id in 1..23) id.toInt() else if (id in 24..74) (id - 7) % 17 + 7 else 0)

            RenderUtil.renderVertexListWithUV(
                listOf(
                    Vector3f(1.375f, 2.2650f, 5f) to Vector3f(1.375f, 2.1150f, 4.4750f),
                    Vector3f(-1.375f, 2.2650f, 4.7f) to Vector3f(-1.375f, 2.1150f, 5.225f)
                ),
                Vector2f(uv.first.x, uv.first.y + offset) to Vector2f(uv.second.x, uv.second.y + offset)
            )
        }
    }
}
