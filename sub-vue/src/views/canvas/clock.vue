<script setup lang="ts">
  import { ref, computed, onMounted, nextTick } from 'vue'

  const canvas = ref<HTMLCanvasElement>()
  const ctx = computed( () => canvas!.value!.getContext( '2d', {
    willReadFrequently: true
  } )! );
  const particles = ref<Particle[]>( [] );
  let text = ''

  function getRandom ( min: number, max: number ): number
  {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function clearCanvas ()
  {
    ctx.value.clearRect( 0, 0, canvas.value?.width ?? 0, canvas.value?.height ?? 0 );
  }

  function getText ()
  {
    return new Date().toTimeString().substring(0, 8)
  }

  function update ()
  {
    const newText = getText()
    if ( newText === text )
    {
      return void 0
    }
    clearCanvas()
    text = newText
    ctx.value.fillStyle = '#000'
    ctx.value.textBaseline = 'middle'
    ctx.value.font = `${ devicePixelRatio * 140 }px 'DS-Digital', sans-serif`
    const {width} = ctx.value.measureText( text )
    ctx.value.fillText( text, ( canvas.value!.width - width ) / 2, canvas.value!.height / 2 );
    const points = getPoints()
    clearCanvas()
    points.forEach((point, index) =>
    {
      let particle = particles.value[ index ]
      if ( !particle )
      {
        particle = new Particle()
        particles.value.push(particle)
      }
      const [x, y] = point
      particle.moveTo( x, y )
    } )
    if ( points.length < particles.value.length )
    {
      particles.value.splice( points.length )
    }
  }

  function getPoints ()
  {
    const { width, height, data} = ctx.value.getImageData( 0, 0, canvas.value!.width, canvas.value!.height )
    const points = []
    const gap = 6

    for ( let i = 0; i < width; i+=gap )
    {
      for ( let j = 0; j < height; j+=gap )
      {
        const index = ( i + j * width ) * 4
        const r = data[ index ]
        const g = data[ index + 1 ]
        const b = data[ index + 2 ]
        const a = data[ index + 3 ]
        if ( r === 0 && g === 0 && b === 0 && a === 255 )
        {
          points.push([i, j])
        }
      }
    }
    return points
  }

  function draw ()
  {
    update()
    particles.value.forEach(particle => particle.draw())
    requestAnimationFrame( draw );
  }

  class Particle
  {
    x: number
    y: number
    size: number
    constructor ( )
    {
      const r = Math.min( canvas!.value!.width, canvas!.value!.height ) / 2;
      const cx = canvas!.value!.width / 2;
      const cy = canvas!.value!.height / 2;
      const rad = getRandom( 0, 360 ) * Math.PI / 180;
      this.x = cx + r * Math.cos( rad );
      this.y = cy + r * Math.sin( rad );
      this.size = getRandom( 4 * devicePixelRatio, 5 * devicePixelRatio )
    }

    draw ()
    {
      ctx.value.beginPath()
      ctx.value.fillStyle = '#544554'
      ctx.value.arc( this.x, this.y, this.size, 0, 2 * Math.PI )
      ctx.value.fill()
    }

    moveTo ( tx: number, ty: number )
    {
      const duration = 500
      const sx = this.x,
        sy = this.y
      const xSpeed = ( tx - sx ) / duration
      const ySpeed = ( ty - sy ) / duration
      const startTime = Date.now()
      const _move = () =>
      {
        const t = Date.now() - startTime
        const x = sx + xSpeed * t
        const y = sy + ySpeed * t
        this.x = x
        this.y = y
        if ( t >= duration )
        {
          this.x = tx
          this.y = ty
          return
        }
        requestAnimationFrame(_move)
      }
      _move()
    }
  }

  onMounted( () =>
  {
    canvas.value!.width = window.innerWidth * devicePixelRatio;
    canvas.value!.height = window.innerHeight * devicePixelRatio;
    nextTick( () =>
    {
      draw()
    })
  })
</script>

<template>
  <canvas ref="canvas" />
</template>

<style scoped lang="scss">
canvas {
  background: radial-gradient(#fff, #8c738c);
  display: block;
  width: 100%;
  height: 100%;
}
</style>