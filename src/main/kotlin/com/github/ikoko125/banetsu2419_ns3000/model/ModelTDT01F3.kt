package com.github.ikoko125.banetsu2419_ns3000.model

import com.github.ikoko125.banetsu2419_ns3000.LateInitOnce
import jp.ngt.rtm.render.Parts
import jp.ngt.rtm.render.VehiclePartsRenderer

object ModelTDT01F3 {
    private val models = mutableMapOf<String,PartsRegistry>()

    @Suppress("unused")
    @JvmStatic
    fun registerObjects(renderer: VehiclePartsRenderer) {
        models[renderer.modelName] = PartsRegistry().apply {
            listOf(
                this::body to "body",
                this::wheel1 to "wheel1",
                this::wheel2 to "wheel2"
            ).forEach {
                it.first.set(renderer.registerParts(Parts(it.second)))
            }
        }
    }

    internal fun getModel(modelName: String) = models[modelName]

    internal class PartsRegistry {
        internal var body: Parts by LateInitOnce()
        internal var wheel1: Parts by LateInitOnce()
        internal var wheel2: Parts by LateInitOnce()
    }
}
