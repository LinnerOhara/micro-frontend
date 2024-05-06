import {DirectiveBinding} from 'vue'

export type HandlerParams = {
  width: number;
  height: number;
}

const map: WeakMap<Element, (size: HandlerParams) => void> = new WeakMap();
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target);
    if (handler) {
      const box = entry.borderBoxSize[0]
      handler({
        width: box.inlineSize,
        height: box.blockSize,
      })
    }
  }
})

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    ob.observe(el)
    map.set(el, binding.value);
  },
  unmounted(el: HTMLElement) {
    map.delete(el);
  }
}