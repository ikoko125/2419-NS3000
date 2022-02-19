package com.github.ikoko125.banetsu2419_ns3000.render

import jp.ngt.ngtlib.renderer.NGTTessellator
import org.lwjgl.opengl.GL11
import org.lwjgl.util.vector.Vector2f
import org.lwjgl.util.vector.Vector3f

object RenderUtil {
    fun renderVertexListWithUV(vertices: List<Pair<Vector3f, Vector3f>>, uv: Pair<Vector2f, Vector2f>) {
        GL11.glPushMatrix()
        NGTTessellator.instance.apply {
            vertices.forEach {
                startDrawingQuads()
                addVertexWithUV(it.first.x, it.first.y, it.first.z, uv.first.x, uv.first.y)
                addVertexWithUV(it.first.x, it.second.y, it.first.z, uv.first.x, uv.second.y)
                addVertexWithUV(it.second.x, it.second.y, it.second.z, uv.second.x, uv.second.y)
                addVertexWithUV(it.second.x, it.first.y, it.second.z, uv.second.x, uv.first.y)
                draw()
            }
        }
        GL11.glPopMatrix()
    }
}
