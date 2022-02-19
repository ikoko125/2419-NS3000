package com.github.ikoko125.banetsu2419_ns3000.model

import com.github.ikoko125.banetsu2419_ns3000.LateInitOnce
import jp.ngt.rtm.render.Parts
import jp.ngt.rtm.render.VehiclePartsRenderer

object Model3000Mc {
    private val models = mutableMapOf<String, PartsRegistry>()

    @Suppress("unused")
    @JvmStatic
    fun registerObjects(renderer: VehiclePartsRenderer) {
        models[renderer.modelName] = PartsRegistry().apply {
            @Suppress("DuplicatedCode")
            listOf(
                this::body to listOf("obj1", "obj2", "shade", "panta", "panta_C1", "panta_C1_1", "panta_C1_2", "panta_C1_3", "panta_C1_4", "panta_C1_5"),
                this::rollsignOff to "rollsign_off",
                this::doorFR to "door_RF",
                this::doorFL to "door_LF",
                this::doorBR to "door_RB",
                this::doorBL to "door_LB",
                this::atsPanel to "ATS_PANEL",
                this::atsR to "R_ATS",
                this::atsB to "ATS_B",
                this::atsPA to "ATS_PA",
                this::atsNO to "NO_ATS",
                this::l0 to "L0",
                this::l15 to "L15",
                this::l25 to "L25",
                this::l35 to "L35",
                this::l45 to "L45",
                this::l55 to "L55",
                this::l65 to "L65",
                this::l75 to "L75",
                this::l85 to "L85",
                this::l95 to "L95",
                this::l100 to "L100",
                this::l110 to "L110",
                this::l120 to "L120",
                this::l130 to "L130",
                this::f to "F",
                this::b to "B",
                this::f1 to "F1",
                this::b1 to "B1",
                this::car1 to "car1",
                this::car2 to "car2",
                this::car3 to "car3",
                this::car4 to "car4",
                this::car5 to "car5",
                this::car6 to "car6",
                this::car7 to "car7",
                this::car8 to "car8",
                this::car9 to "car9",
                this::car10 to "car10",
                this::car11 to "car11",
                this::car12 to "car12",
                this::car13 to "car13",
                this::car14 to "car14",
                this::car15 to "car15"
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
        internal var atsPanel: Parts by LateInitOnce()
        internal var atsR: Parts by LateInitOnce()
        internal var atsB: Parts by LateInitOnce()
        internal var atsPA: Parts by LateInitOnce()
        internal var atsNO: Parts by LateInitOnce()
        internal var l0: Parts by LateInitOnce()
        internal var l15: Parts by LateInitOnce()
        internal var l25: Parts by LateInitOnce()
        internal var l35: Parts by LateInitOnce()
        internal var l45: Parts by LateInitOnce()
        internal var l55: Parts by LateInitOnce()
        internal var l65: Parts by LateInitOnce()
        internal var l75: Parts by LateInitOnce()
        internal var l85: Parts by LateInitOnce()
        internal var l95: Parts by LateInitOnce()
        internal var l100: Parts by LateInitOnce()
        internal var l110: Parts by LateInitOnce()
        internal var l120: Parts by LateInitOnce()
        internal var l130: Parts by LateInitOnce()
        internal var f: Parts by LateInitOnce()
        internal var b: Parts by LateInitOnce()
        internal var f1: Parts by LateInitOnce()
        internal var b1: Parts by LateInitOnce()
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
        internal var car11: Parts by LateInitOnce()
        internal var car12: Parts by LateInitOnce()
        internal var car13: Parts by LateInitOnce()
        internal var car14: Parts by LateInitOnce()
        internal var car15: Parts by LateInitOnce()
    }
}
