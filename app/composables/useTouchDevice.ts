/**
 * True on coarse-pointer devices (phones, tablets): the HUD swaps keyboard
 * affordances for touch ones. Shared so every consumer flips together.
 */
const touch = ref(false)
let bound = false

export function useTouchDevice() {
  onMounted(() => {
    if (bound) return
    bound = true
    const query = window.matchMedia('(pointer: coarse)')
    touch.value = query.matches
    // Tablets with a mouse plugged in, DevTools emulation: keep it live.
    query.addEventListener('change', event => touch.value = event.matches)
  })
  return touch
}
