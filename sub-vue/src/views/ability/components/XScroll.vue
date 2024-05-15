<script setup lang="ts">
import {reactive} from "vue";
import { default as vSizeOb, type HandlerParams } from '../directives/sizeDirect.ts';

const size = reactive({
  w: 0,
  h: 0
})
function handleSizeChange({ width, height }: HandlerParams) {
  size.h = height;
  size.w = width;
}
</script>

<template>
  <div v-size-ob="handleSizeChange" class="scroll-container">
    <div class="v-scroll">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-container {
  width: 100%;
  height: 100%;

  .v-scroll {
    --w: v-bind(size.w);
    --h: v-bind(size.h);
    width: calc(var(--h) * 1px);
    height: calc(var(--w) * 1px);
    position: relative;
    overflow: auto;
    transform-origin: left top;
    transform: translateY(calc(var(--h) * 1px)) rotate(-90deg);

    &::-webkit-scrollbar {
      display: none;
    }

    .content {
      position: absolute;
      width: calc(var(--w) * 1px);
      height: calc(var(--h) * 1px);
      top: 0;
      left: calc(var(--h) * 1px);
      transform-origin: left top;
      transform: rotate(90deg);
    }
  }
}
</style>