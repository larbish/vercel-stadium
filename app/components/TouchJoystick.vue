<script setup lang="ts">
/**
 * Virtual thumbstick for touch devices. Emits the knob offset as a vector in
 * [-1, 1] on every move and zero on release; the input layer maps it to the
 * boolean `MoveInput` the server understands, so the protocol stays untouched.
 */

const emit = defineEmits<{ move: [x: number, y: number] }>()

/** Knob travel radius in px, half the base minus the knob's own radius. */
const RADIUS = 40

const base = useTemplateRef('base')
const knob = reactive({ x: 0, y: 0 })
const active = ref(false)
let pointerId: number | null = null

function update(event: PointerEvent) {
  const rect = base.value?.getBoundingClientRect()
  if (!rect) return
  let dx = event.clientX - (rect.left + rect.width / 2)
  let dy = event.clientY - (rect.top + rect.height / 2)
  const length = Math.hypot(dx, dy)
  if (length > RADIUS) {
    dx *= RADIUS / length
    dy *= RADIUS / length
  }
  knob.x = dx
  knob.y = dy
  emit('move', dx / RADIUS, dy / RADIUS)
}

function onPointerDown(event: PointerEvent) {
  if (pointerId !== null) return
  pointerId = event.pointerId
  active.value = true
  // Keep this finger's moves even when it slides off the base.
  base.value?.setPointerCapture(event.pointerId)
  // Not a look-drag: the scene listens on the parent.
  event.stopPropagation()
  update(event)
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerId !== pointerId) return
  event.stopPropagation()
  update(event)
}

function onPointerUp(event: PointerEvent) {
  if (event.pointerId !== pointerId) return
  event.stopPropagation()
  pointerId = null
  active.value = false
  knob.x = knob.y = 0
  emit('move', 0, 0)
}
</script>

<template>
  <div
    ref="base"
    class="touch-none select-none rounded-full bg-white/10 ring ring-white/15 backdrop-blur-sm transition-colors size-28"
    :class="active && 'bg-white/15'"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @click.stop
  >
    <div
      class="relative left-1/2 top-1/2 size-12 rounded-full bg-white/70 shadow-lg"
      :style="{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }"
    />
  </div>
</template>
