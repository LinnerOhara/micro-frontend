<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const el = ref<HTMLCanvasElement>();
const ctx = computed(() => el!.value!.getContext('2d')!);

const WIDTH = 600;
const HEIGHT = 600;

interface Point {
  x: number;
  y: number;
}

interface Branch {
  start: Point;
  length: number;
  theta: number;
}

function init() {
  ctx.value.strokeStyle = '#000';

  step({
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 40,
    theta: -Math.PI / 2,
  });
}

const paddingTasks: Function[] = [];

function step(b: Branch, depth = 0) {
  const end = getEndPoint(b);
  drawBranch(b);

  if (depth < 4 || Math.random() < 0.5) {
    paddingTasks.push(() =>
      step(
        {
          start: end,
          length: b.length + (Math.random() * 10 - 5),
          theta: b.theta - 0.3 * Math.random(),
        },
        depth + 1
      )
    );
  }

  if (depth < 4 || Math.random() < 0.5) {
    paddingTasks.push(() =>
      step(
        {
          start: end,
          length: b.length + (Math.random() * 10 - 5),
          theta: b.theta + 0.3 * Math.random(),
        },
        depth + 1
      )
    );
  }
}

function frame() {
  const tasks = [...paddingTasks];
  paddingTasks.length = 0;
  tasks.forEach((fn) => fn());
}

let framesCount = 0;
function startFrame() {
  requestAnimationFrame(() => {
    framesCount += 1;
    if (framesCount % 3 === 0) frame();
    startFrame();
  });
}

startFrame();

function lineTo(p1: Point, p2: Point) {
  ctx.value.beginPath();
  ctx.value.moveTo(p1.x, p1.y);
  ctx.value.lineTo(p2.x, p2.y);
  ctx.value.stroke();
}

function getEndPoint(b: Branch): Point {
  const { start, length, theta } = b;
  return {
    x: start.x + length * Math.cos(theta),
    y: start.y + length * Math.sin(theta),
  };
}

function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b));
}

onMounted(() => {
  init();
});
</script>

<template>
  <canvas ref="el" width="600" height="600" border />
</template>

<style scoped>
*[border] {
  border: 1px solid #000;
}
</style>
