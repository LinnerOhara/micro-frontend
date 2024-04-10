<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="btn">
      <span>hover me</span>
      <div class="detail">
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
      height: auto;
      padding: 20px;
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
  }
}
</style>