package com.github.ikoko125.banetsu2419_ns3000.render

import com.github.ikoko125.banetsu2419_ns3000.model.ModelART500T
import jp.ngt.ngtlib.math.NGTMath
import jp.ngt.rtm.entity.train.EntityTrainBase
import jp.ngt.rtm.render.VehiclePartsRenderer
import org.lwjgl.opengl.GL11

@Suppress("unused")
object RenderART500T {
    @JvmStatic
    fun render(renderer: VehiclePartsRenderer, entity: EntityTrainBase?, pass: Int) {
        val model = ModelART500T.getModel(renderer.modelName)!!

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
    }

    private fun renderDoor(renderer: VehiclePartsRenderer, entity: EntityTrainBase?) {
        val moveL = if (entity != null) NGTMath.sigmoid(entity.doorMoveL / 5.0, 5.0).toFloat() else 0.0f
        val moveR = if (entity != null) NGTMath.sigmoid(entity.doorMoveR / 5.0, 5.0).toFloat() else 0.0f
        val doorMoveL = renderer.getDoorMovementL(entity)
        val doorMoveR = renderer.getDoorMovementR(entity)
        val time = renderer.mcTime
        val model = ModelART500T.getModel(renderer.modelName)!!

        @Suppress("DuplicatedCode")
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
        ModelART500T.getModel(renderer.modelName)!!.nightWindow.render(renderer)
    }
}
