<script setup lang="ts">
import {ref} from "vue";

const btnRef = ref<HTMLDivElement>()
const detailRef = ref<HTMLDivElement>()

const btnMouseEnter = () => {
  // 造成回流，但没绘制
  detailRef.value!.style.height = 'auto'
  const { height } = detailRef.value!.getBoundingClientRect();
  detailRef.value!.style.height = '0'
  detailRef.value!.style.transition = 'height 0.5s'
  // detailRef.value?.offsetHeight; // 强制回流
  // 或者使用 requestAnimationFrame 让它在下一步绘制
  console.log(detailRef.value)
  requestAnimationFrame(() => {
    detailRef.value!.style.height = height + 'px';
  })
}

const btnMouseLeave = () => {
  detailRef.value!.style.height = '0'
}

</script>

<template>
  <div class="container">
    <div class="btn" ref="btnRef" @mouseenter="btnMouseEnter" @mouseleave="btnMouseLeave">
      <span>hover me</span>
      <div class="detail" ref="detailRef">
        <div class="content">
          <div class="inner">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aut autem, cum debitis delectus expedita facere fuga itaque laboriosam laudantium praesentium reiciendis repudiandae temporibus unde veniam. Aperiam dolorem magni ut.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores assumenda commodi consectetur cum dolor eligendi harum illo, ipsam labore minus molestiae molestias nam placeat praesentium reiciendis repellat, sequi similique.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae debitis dignissimos, dolorem doloremque, doloribus dolorum, ipsa iusto laborum molestias perspiciatis quo quos repudiandae? Assumenda deserunt incidunt magnam omnis rerum!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {

}
.btn {
  background: dodgerblue;
  color: #fff;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 6px;
  position: relative;
  width: fit-content;

  &:hover {
    background: cornflowerblue;

    .detail {
      //height: auto;
      //padding: 20px;
      // 通过高度实现
      //max-height: 99999999999999px;
      // 通过缩放实现
      //transform: scale(1);
      // 通过网格布局实现
      //grid-template-rows: 1fr;
    }
  }

  .detail {
    position: absolute;
    border-radius: 6px;
    top: 95%;
    left: 0;
    width: max-content;
    max-width: 300%;
    background: dodgerblue;
    height: 0;
    padding: 0;
    overflow: hidden;

    .inner {
      margin: 20px;
    }
    //transition: 0.5s;
    // 通过高度实现
    //max-height: 0;
    // 通过缩放实现
    //transform: scale(0);
    // 通过网格布局实现
    //display: grid;
    //grid-template-rows: 0fr;
  }
}
</style>