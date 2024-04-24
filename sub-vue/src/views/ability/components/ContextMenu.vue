<script setup lang="ts">
import {computed, ref} from "vue";
import useContextMenu from './useContextMenu.ts'
import useViewport from "./useViewport.ts";

const props = defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select'])
const containerRef = ref<HTMLElement | null>(null)
const { x, y, showMenu } = useContextMenu(containerRef);
const { vw, vh } = useViewport()
const w = ref(0)
const h = ref(0)

function handleSizeChange(e) {
  w.value = e.width
  h.value = e.height
}
const pos = computed(() => {
  let posX = x.value;
  let posY = y.value;
  if (x.value > vw.value - w.value) {
    posX = x.value - w.value;
  }
  if (y.value > vh.value - h.value) {
    posY = vh.value - h.value;
  }
  return {
    posX,
    posY
  }
})

function handleClick(item) {
  showMenu.value = false;
  emit('select', item)
}
</script>

<template>
  <div>
    <Teleport>
      <div>

        <div v-size-ob="handleSizeChange" class="menu-list">
          <div class="menu-item"
            v-for="item in menu"
            :key="item.label"
            @click="handleClick(item)">
            {{item.label}}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  background: #eee;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.2);
}
</style>