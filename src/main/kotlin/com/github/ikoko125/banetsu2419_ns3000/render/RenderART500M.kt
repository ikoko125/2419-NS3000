package com.github.ikoko125.banetsu2419_ns3000.render

import com.github.ikoko125.banetsu2419_ns3000.model.ModelART500M
import jp.ngt.ngtlib.math.NGTMath
import jp.ngt.rtm.entity.train.EntityTrainBase
import jp.ngt.rtm.render.VehiclePartsRenderer
import org.lwjgl.opengl.GL11

@Suppress("unused")
object RenderART500M {
    @Suppress("DuplicatedCode")
    @JvmStatic
    fun render(renderer: VehiclePartsRenderer, entity: EntityTrainBase?, pass: Int) {
        val model = ModelART500M.getModel(renderer.modelName)!!

        model.body.render(renderer)
        renderDoor(renderer, entity)
        if (pass in 1..4) renderRandomCurtain(renderer)

        if (entity == null) return

        if (pass in 0..4) {
            GL11.glPushMatrix()

            when (entity.formation.getEntry(entity).entryId + 1) {
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
            }

            GL11.glPopMatrix()
        }

        if (pass != 0) return

        val pantoRotate1 = (NGTMath.sigmoid(entity.pantograph_F / 60.0, 5.0) * 1.2 * 30).toFloat()
        val pantoRotate2 = (NGTMath.sigmoid(entity.pantograph_F / 60.0, 5.0) * 1.2 * 56).toFloat()
        val pantoRotate4 = (NGTMath.sigmoid(entity.pantograph_F / 60.0, 5.0) * 1.2 * 66).toFloat()

        GL11.glPushMatrix()

        renderer.rotate(pantoRotate1, 'X', 0.0f, 2.2085f, 2.3091f)
        model.panta1.render(renderer)

        renderer.rotate(-pantoRotate2, 'X', 0.0f, 3.0606f, 3.8144f)
        model.panta2.render(renderer)

        renderer.rotate(pantoRotate1, 'X', -0.032f, 4.0304f, 2.3787f)
        model.panta3.render(renderer)

        GL11.glPopMatrix()

        GL11.glPushMatrix()
        renderer.rotate(pantoRotate1, 'X', 0.0f, 2.2085f, 2.3091f)
        renderer.rotate(-pantoRotate2, 'X', 0.0f, 3.0606f, 3.8144f)
        renderer.rotate(pantoRotate4, 'X', 0.0f, 2.22f, 3.0478f)
        model.panta4.render(renderer)
        GL11.glPopMatrix()
    }

    @Suppress("DuplicatedCode")
    private fun renderDoor(renderer: VehiclePartsRenderer, entity: EntityTrainBase?) {
        val moveL = if (entity != null) NGTMath.sigmoid(entity.doorMoveL / 5.0, 5.0).toFloat() else 0.0f
        val moveR = if (entity != null) NGTMath.sigmoid(entity.doorMoveR / 5.0, 5.0).toFloat() else 0.0f
        val doorMoveL = renderer.getDoorMovementL(entity)
        val doorMoveR = renderer.getDoorMovementR(entity)
        val time = renderer.mcTime
        val model = ModelART500M.getModel(renderer.modelName)!!

        if (time !in 401..12999) {
            GL11.glPushMatrix()
            GL11.glTranslatef(moveL * 0.07f, 0.0f, doorMoveL * 0.7f)
            model.doorFL1.render(renderer)
            GL11.glPopMatrix()

            GL11.glPushMatrix()
            GL11.glTranslatef(moveL * 0.07f, 0.0f, -doorMoveL * 0.7f)
            model.doorBL1.render(renderer)
            GL11.glPopMatrix()

            GL11.glPushMatrix()
            GL11.glTranslatef(-moveR * 0.07f, 0.0f, doorMoveR * 0.7f)
            model.doorFR1.render(renderer)
            GL11.glPopMatrix()

            GL11.glPushMatrix()
            GL11.glTranslatef(-moveR * 0.07f, 0.0f, -doorMoveR * 0.7f)
            model.doorBR1.render(renderer)
            GL11.glPopMatrix()
        } else {
            GL11.glPushMatrix()
            GL11.glTranslatef(moveL * 0.07f, 0.0f, doorMoveL * 0.7f)
            model.doorFL.render(renderer)
            GL11.glPopMatrix()

            GL11.glPushMatrix()
            GL11.glTranslatef(moveL * 0.07f, 0.0f, -doorMoveL * 0.7f)
            model.doorBL.render(renderer)
            GL11.glPopMatrix()

            GL11.glPushMatrix()
            GL11.glTranslatef(-moveR * 0.07f, 0.0f, doorMoveR * 0.7f)
            model.doorFR.render(renderer)
            GL11.glPopMatrix()

            GL11.glPushMatrix()
            GL11.glTranslatef(-moveR * 0.07f, 0.0f, -doorMoveR * 0.7f)
            model.doorBR.render(renderer)
            GL11.glPopMatrix()
        }
    }

    @Suppress("DuplicatedCode")
    private fun renderRandomCurtain(renderer: VehiclePartsRenderer) {
        if (renderer.mcTime in 401..12999) return
        ModelART500M.getModel(renderer.modelName)!!.nightWindow.render(renderer)
    }
}
