<script setup lang="ts">

</script>

<template>
  <div class="container">
    <h2 class="title">
      <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci assumenda commodi id iste nam nemo quod reiciendis sapiente temporibus veniam! Corporis cum ducimus eaque eos eum modi obcaecati officiis quae.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, iste, reiciendis? Adipisci aliquam blanditiis, consectetur eius et impedit magnam perferendis quam quidem tempore. Accusamus animi assumenda consequuntur corporis cum dolor dolore ducimus eius eligendi expedita fugit illum, inventore ipsa labore molestiae necessitatibus nesciunt nobis non quibusdam, recusandae sapiente sequi veniam?
      </span>
    </h2>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
}
.title {
  color: #333;
  line-height: 2;

  span {
    background: linear-gradient(to right, #7e2f2b, #146420) no-repeat right bottom;
    background-size: 0 2px ;
    transition: background-size 1s ease-in-out;

    &:hover {
      background-position: left bottom;
      background-size: 100% 2px;
    }
  }
}
</style>