package com.github.ikoko125.banetsu2419_ns3000.model

import com.github.ikoko125.banetsu2419_ns3000.LateInitOnce
import jp.ngt.rtm.render.Parts
import jp.ngt.rtm.render.VehiclePartsRenderer

object Model3000M {
    private val models = mutableMapOf<String, PartsRegistry>()

    @Suppress("unused")
    @JvmStatic
    fun registerObjects(renderer: VehiclePartsRenderer) {
        models[renderer.modelName] = PartsRegistry().apply {
            @Suppress("DuplicatedCode")
            listOf(
                this::body to listOf("obj1", "obj2", "panta", "panta_D2", "panta_D2_1", "panta_D2_2", "panta_D2_3", "panta_D2_4", "panta_D2_5"),
                this::rollsignOff to "rollsign_off",
                this::doorFR to "door_RF",
                this::doorFL to "door_LF",
                this::doorBR to "door_RB",
                this::doorBL to "door_LB"
            ).forEach {
                if (it.second is String) {
                    it.first.set(renderer.registerParts(Parts(it.second as String)))
                } else {
                    @Suppress("UNCHECKED_CAST")
                    it.first.set(renderer.registerParts(Parts(*(it.second as List<String>).toTypedArray())))
                }
            }
        }
    }

    internal fun getModel(modelName: String) = models[modelName]

    internal class PartsRegistry {
        internal var body: Parts by LateInitOnce()
        internal var rollsignOff: Parts by LateInitOnce()
        internal var doorFR: Parts by LateInitOnce()
        internal var doorFL: Parts by LateInitOnce()
        internal var doorBR: Parts by LateInitOnce()
        internal var doorBL: Parts by LateInitOnce()
    }
}
