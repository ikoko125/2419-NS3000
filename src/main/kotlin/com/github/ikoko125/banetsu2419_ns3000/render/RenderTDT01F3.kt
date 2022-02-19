package com.github.ikoko125.banetsu2419_ns3000.render

import com.github.ikoko125.banetsu2419_ns3000.model.ModelTDT01F3
import jp.ngt.rtm.entity.train.EntityBogie
import jp.ngt.rtm.render.VehiclePartsRenderer
import org.lwjgl.opengl.GL11

@Suppress("unused")
object RenderTDT01F3 {
    @JvmStatic
    fun render(renderer: VehiclePartsRenderer, entity: EntityBogie?, pass: Int) {
        if (pass != 0) return

        val model = ModelTDT01F3.getModel(renderer.modelName)!!
        val wheelRotation = renderer.getWheelRotationR(entity)

        GL11.glPushMatrix()
        model.body.render(renderer)

        GL11.glPushMatrix()
        renderer.rotate(wheelRotation, 'X', 0f, -0.54f, 1.05f)
        model.wheel1.render(renderer)
        GL11.glPopMatrix()

        GL11.glPushMatrix()
        renderer.rotate(wheelRotation, 'X', 0f, -0.54f, -1.05f)
        model.wheel2.render(renderer)
        GL11.glPopMatrix()

        GL11.glPopMatrix()
    }
}
