<script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref } from 'vue'

  const useSize = () =>
  {
    const width = ref( 0 )
    const height = ref( 0 )
    const innerWidth = ref(window.innerWidth)

    const update = () =>
    {
      width.value = Math.max( window.innerWidth * .20, 275 );
      height.value = window.innerHeight * .5;
      innerWidth.value = window.innerWidth
    }

    onMounted( () =>
    {
      update()
      window.addEventListener( 'resize', update )
    } )

    onUnmounted( () =>
    {
      window.removeEventListener( 'resize', update )
    } )

    return {
      width,
      height,
      innerWidth
    }
  }

  const images = import.meta.glob( './images/carousel/*.png', { eager: true } );
  const imageArray = Object.values( images );
  const currentIndex = ref(0)
  const timeList = reactive( imageArray.reverse().map( (item: any, index ) => {
    return {
      year: new Date().getFullYear() - index,
      desc: `In the year ${new Date().getFullYear() - index}`,
      image: item.default
    }
  } ).reverse() )
  const { width, height, innerWidth } = useSize()

  const move = ( index: number ) =>
  {
    if (index < 0) index = timeList.length - 1;
    if (index >= timeList.length) index = 0;
    currentIndex.value = index
  }

  let interval = -1
  const timer = () =>
  {
    // 定时器，自动切换shell
    clearInterval(interval);
    interval = setInterval(() => {
      move(++currentIndex.value);
    }, 3000);
  }

  onMounted( () =>
  {
    move( Math.floor( timeList.length / 2 ) )
    timer()
  } )
</script>

<template>
  <div class="container" :style=" {
    backgroundImage: `url('${timeList[currentIndex].image}')`
  }">
    <div class="shell">
      <div class="shell_body">
        <div class="button">
          <div class="prev">

          </div>
          <div class="next">

          </div>
        </div>
        <div class="shell_slider" :style=" {
          width: `${ width * timeList.length }px`,
          transform: `translate3d(${((currentIndex + 1) * -width) + (width / 2) + innerWidth / 2}px, 0, 0)`,
          '--cur-index': currentIndex
        }">
          <template v-for="(item, index) in timeList">
            <div class="item" :style=" {
              width: `${width}px`,
              height: `${height}px`
            }">
              <div class="frame" :style=" {
                '--bg-image': `url('${ item.image }')`,
                '--cur-transform': index === currentIndex ? 'perspective(1200px)' : `'perspective(1200px) rotateY(${index < (currentIndex - 1) ? 40 : -40}deg)'`
              }">
                <div class="box front">
                  <h1>{{ item.year }}</h1>
                  <span>{{ item.desc }}</span>
                </div>
                <div class="box left"></div>
                <div class="box right"> </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  transition: background-image .7s ease-in-out;

  .shell {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: rgba(99, 99, 99, 0.8);
    flex-wrap: nowrap;

    .shell_body {
      width: 100%;
      transform: scale(.8);
      padding: 20px 0 150px 0;

      .button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 380px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -80px;

        .prev,
        .next {
          transition: transform 0.25s ease;
          z-index: 99999;
          bottom: 5px;
          
          i {
            font-size: 90px;
            color: #fff;
            cursor: pointer;
            text-shadow: 0 0 10px #ffffff;
          }
        }
      }
    }

    .shell_slider {
      position: relative;
      transition: transform 1s ease-in-out;
      background: transparent;

      .item {
        position: relative;
        float: left;
        margin: 0 20px;

        .frame {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 1s ease-in-out;
          transform-style: preserve-3d;

          :after {
            content: "";
            position: absolute;
            bottom: -16%;
            width: 100%;
            height: 60px;
            background: #ffffff1c;
            box-shadow: 0px 0px 15px 5px #ffffff1c;
            transform: rotateX(90deg) translate3d(0px, -20px, 0px);
          }

          .box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 100%;
            height: 100%;
            border: 4px solid #fff;
            perspective: 1000px;
            transform-style: preserve-3d;
            transform: var(--cur-transform);

            h1,
            span {
              color: #fff;
              transform: translateZ(20px);
            }

            h1 {
              text-shadow: 0 0 30px #1f05b4;
              font-size: 100px; 
            }

            span {
              position: absolute;
              bottom: 20px;
              padding: 0 25px;
              text-shadow: 0 0 10px #1f05b4;
            }
          }

          .front,
          .left,
          .right {
            box-shadow: 0 0 50px #ffffff;
            background-size: cover;
            background-image: var(--bg-image);
          }

          .right,
          .left {
            top: 0;
            width: 60px;
            backface-visibility: hidden;
          }

          .left {
            left: 0;
            border-left-width: 5px;
            transform: translate3d(1px, 0, -60px) rotateY(-90deg);
            transform-origin: 0%;
          }

          .right {
            right: 0;
            border-right-width: 5px;
            transform: translate3d(-1px, 0, -60px) rotateY(90deg);
            transform-origin: 100%;
          } 
        }
      }
    }
  }
}
</style>