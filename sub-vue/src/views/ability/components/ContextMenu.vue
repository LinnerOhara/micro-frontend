<script setup lang="ts">
import {computed, ref} from "vue";
import useContextMenu from './useContextMenu.ts'
import useViewport from "./useViewport.ts";
import { default as vSizeOb, type HandlerParams } from '../directives/sizeDirect.ts';

type MenuItem = {
  item: string
  label: string
}

const props = defineProps<{
  menu: MenuItem[]
}>()

const emit = defineEmits(['select'])
const containerRef = ref<HTMLElement | null>(null)
const { x, y, showMenu } = useContextMenu(containerRef);
const { vw, vh } = useViewport()
const w = ref(0)
const h = ref(0)

function handleSizeChange(e: HandlerParams) {
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

function handleClick(item: MenuItem) {
  showMenu.value = false;
  emit('select', item)
}
</script>

<template>
  <div ref="containerRef">
    <Teleport to="body">
      <div
        v-if="showMenu"
        class="context-menu"
        :style="{
          left: pos.posX + 'px',
          top: pos.posY + 'px'
        }">
        <div v-size-ob="handleSizeChange" class="menu-list">
          <div class="menu-item"
            v-for="item in props.menu"
            :key="item.label"
            @click="handleClick(item)">
            {{item.label}}
          </div>
        </div>
      </div>
    </Teleport>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  background: #eee;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1),  1px 1px 2px rgba(0, 0, 0, 0.2);
  min-width: 100px;
  border-radius: 5px;
  font-size: 12px;
  color: #1d1d1f;
  line-height: 1.8;
}
</style>