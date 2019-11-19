<template>
  <div class="container">
    <!-- <img src="~assets/images/bg.png" width="100%" alt="" /> -->
    <canvas ref="canvas" class="canvas" />
  </div>
</template>

<script>
import bgUrl from '~/assets/images/bg.png'
import titleUrl from '~/assets/images/title.png'
import txUrl from '~/assets/images/tx.png'
import cakeUrl from '~/assets/images/cake.png'
import couchUrl from '~/assets/images/couch.png'
import childUrl from '~/assets/images/child.png'
import addrUrl from '~/assets/images/addr.png'
import footUrl1 from '~/assets/images/foot1.png'
import footUrl2 from '~/assets/images/foot2.png'
import footUrl3 from '~/assets/images/foot3.png'
import footUrl4 from '~/assets/images/foot4.png'
import footUrl5 from '~/assets/images/foot5.png'
import footUrl6 from '~/assets/images/foot6.png'

export default {
  middleware: 'auth',
  async mounted() {
    const canvas = this.$refs.canvas
    const { width } = window.document.body.getBoundingClientRect()

    this.ctx = canvas.getContext('2d')
    this.images = await Promise.all([
      await this.loadImage(bgUrl),
      await this.loadImage(titleUrl),
      await this.loadImage(txUrl),
      await this.loadImage(cakeUrl),
      await this.loadImage(couchUrl),
      await this.loadImage(childUrl),
      await this.loadImage(addrUrl),
      await this.loadImage(footUrl1),
      await this.loadImage(footUrl2),
      await this.loadImage(footUrl3),
      await this.loadImage(footUrl4),
      await this.loadImage(footUrl5),
      await this.loadImage(footUrl6)
    ])

    const bgImg = this.images[0]
    const radio = width / bgImg.width

    canvas.height = radio * bgImg.height
    canvas.width = width
    this.radio = radio
    this.images.forEach(img => {
      img.width = img.width * radio
      img.height = img.height * radio
    })

    this.renderScene()
  },
  methods: {
    loadImage(url) {
      const img = new Image()

      img.src = url
      return new Promise((resolve) => {
        img.onload = () => {
          resolve(img)
        }
      })
    },
    renderScene() {
      const { ctx, images, radio } = this
      const bgImg = images[0]
      const titleImg = images[1]

      ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height)
      ctx.save()
      this.fadeIn(titleImg, 751, 787)
    },
    fadeIn(ele, x, y) {
      const { ctx, radio } = this
      let start = 0
      let lastX = 0
      let lastY = 0
      let lastWidth = 0
      let lastHeight = 0
      const fade = () => {
        ctx.restore()
        start += 0.05
        // ctx.scale(start, start)
        lastWidth = ele.width * start
        lastHeight = ele.height * start
        lastX = x * radio - lastWidth / 2
        lastY = y * radio - lastHeight / 2
        // ctx.scale(start, start)
        ctx.drawImage(ele, lastX, lastY, lastWidth, lastHeight)
        ctx.save()
        if (start < 1) {
          window.requestAnimationFrame(fade)
        }
      }

      window.requestAnimationFrame(fade)
    }

  }
}
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
}
</style>
