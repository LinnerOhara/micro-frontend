const map = new WeakMap();
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
  mounted(el, bingding) {
    ob.observe(el)
    map.set(el, bingding.value);
  },
}