<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="layer4"></div>
    <div class="layer5"></div>
    <div class="title">Scss 星空</div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  background: radial-gradient(circle at bottom center,
      rgb(25, 33, 45) 0%,
      rgb(11, 11, 18) 100%
  );
  display: flex;
  transform: scale(1);
  justify-content: center;
  align-items: center;
}
.title {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to bottom,
    silver, /* 上半部分银色 */
    rgba(192, 192, 192, 0.5) /* 下半部分半透明银色，这里使用了RGBA格式控制透明度 */
  );
  font-size: 36px;
}

@function getShadows($n) {
  $shadows: '#{random(100)}vw #{random(100)}vh #fff';
  @for $i from 1 through $n {
    $shadows: '#{$shadows}, #{random(100)}vw #{random(100)}vh #fff';
  }
  @return unquote($shadows);
}

$duration: 1000s;
$content: 1000;
@for $i from 1 through 5 {
  $duration: calc($duration / 2);
  $content: floor(calc($content / 2));
  .layer#{$i} {
    $size: #{$i}px;
    position: fixed;
    width: $size;
    height: $size;
    border-radius: 50%;
    left: 0;
    top: 0;
    box-shadow: getShadows($content);
    animation: moveUp $duration linear infinite;
    &::after {
      content: '';
      position: fixed;
      left: 0;
      top: 100vh;
      border-radius: inherit;
      height: inherit;
      width: inherit;
      box-shadow: inherit;
    }
  }
}

@keyframes moveUp {
  to {
    transform: translateY(-100vh);
  }
}
</style>