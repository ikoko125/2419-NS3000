package com.github.ikoko125.banetsu2419_ns3000.model

import com.github.ikoko125.banetsu2419_ns3000.LateInitOnce
import jp.ngt.rtm.render.Parts
import jp.ngt.rtm.render.VehiclePartsRenderer

object ModelART500M {
    private val models = mutableMapOf<String, PartsRegistry>()

    @Suppress("unused")
    @JvmStatic
    fun registerObjects(renderer: VehiclePartsRenderer) {
        models[renderer.modelName] = PartsRegistry().apply {
            @Suppress("DuplicatedCode")
            listOf(
                this::body to listOf("InFace", "ExFace", "obj1", "obj2", "obj3"),
                this::doorFR to "doorRF",
                this::doorFL to "doorLF",
                this::doorBR to "doorRB",
                this::doorBL to "doorLB",
                this::doorFR1 to "doorRF1",
                this::doorFL1 to "doorLF1",
                this::doorBR1 to "doorRB1",
                this::doorBL1 to "doorLB1",
                this::panta1 to "panta1",
                this::panta2 to "panta2",
                this::panta3 to "panta3",
                this::panta4 to "panta4",
                this::car1 to "1car",
                this::car2 to "2car",
                this::car3 to "3car",
                this::car4 to "4",
                this::car5 to "5",
                this::car6 to "6",
                this::car7 to "7",
                this::car8 to "8",
                this::car9 to "9",
                this::car10 to "10",
                this::nightWindow to "Nightwindow"
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
        internal var doorFR: Parts by LateInitOnce()
        internal var doorFL: Parts by LateInitOnce()
        internal var doorBR: Parts by LateInitOnce()
        internal var doorBL: Parts by LateInitOnce()
        internal var doorFR1: Parts by LateInitOnce()
        internal var doorFL1: Parts by LateInitOnce()
        internal var doorBR1: Parts by LateInitOnce()
        internal var doorBL1: Parts by LateInitOnce()
        internal var panta1: Parts by LateInitOnce()
        internal var panta2: Parts by LateInitOnce()
        internal var panta3: Parts by LateInitOnce()
        internal var panta4: Parts by LateInitOnce()
        internal var car1: Parts by LateInitOnce()
        internal var car2: Parts by LateInitOnce()
        internal var car3: Parts by LateInitOnce()
        internal var car4: Parts by LateInitOnce()
        internal var car5: Parts by LateInitOnce()
        internal var car6: Parts by LateInitOnce()
        internal var car7: Parts by LateInitOnce()
        internal var car8: Parts by LateInitOnce()
        internal var car9: Parts by LateInitOnce()
        internal var car10: Parts by LateInitOnce()
        internal var nightWindow: Parts by LateInitOnce()
    }
}
