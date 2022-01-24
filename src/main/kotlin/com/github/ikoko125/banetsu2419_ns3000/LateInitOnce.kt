@file:Suppress("PackageName")

package com.github.ikoko125.banetsu2419_ns3000

import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

class LateInitOnce<T> : ReadWriteProperty<Any, T> {
    private object EMPTY

    private var value: Any? = EMPTY

    override fun getValue(thisRef: Any, property: KProperty<*>): T {
        if (value == EMPTY) throw IllegalStateException("The value isn't initialized")
        @Suppress("UNCHECKED_CAST")
        return value as T
    }

    override fun setValue(thisRef: Any, property: KProperty<*>, value: T) {
        if (this.value != EMPTY) throw IllegalStateException("The value is initialized")
        this.value = value
    }

}
