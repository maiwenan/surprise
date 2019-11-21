<template>
  <div class="container">
    <audio ref="audio" src="http://static.tednews.cn/happybirthday.mp3" loop autoplay></audio>
    <a ref="toggle" :class="['music-icon', playing ? 'active' : '']" @click="toggle">
      <img src="http://res.maka.im/cdn/maka/release/music_icon.png?32fb85122f139626cd4982d113498ac8" />
    </a>
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
import Npc from '~/utils/Npc'
import ScaleNpc from '~/utils/ScaleNpc'
import FadeNpc from '~/utils/FadeNpc'
import AddrNpc from '~/utils/AddrNpc'

export default {
  middleware: 'auth',
  data() {
    return {
      playing: false
    }
  },
  async mounted() {
    const canvas = this.$refs.canvas
    const { width } = window.document.body.getBoundingClientRect()
    const images = await Promise.all([
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
    const ratio = width / images[0].width
    const npcSet = {}
    canvas.height = ratio * images[0].height
    canvas.width = width
    const ctx = canvas.getContext('2d')

    this.ratio = ratio
    this.ctx = ctx
    this.npcSet = npcSet

    npcSet.bgNpc = new Npc(ctx, images[0], 0, 0, ratio)
    npcSet.titleNpc = new ScaleNpc(ctx, images[1], 272, 564, ratio)
    npcSet.txNpc = new ScaleNpc(ctx, images[2], 618, 1758, ratio)
    npcSet.cakeNpc = new ScaleNpc(ctx, images[3], 238, 2428, ratio)
    npcSet.couchNpc = new ScaleNpc(ctx, images[4], 552, 3014, ratio)
    npcSet.childNpc = new ScaleNpc(ctx, images[5], 246, 3722, ratio)
    npcSet.addrNpc = new AddrNpc(ctx, images[6], 1014, 2598, ratio)
    npcSet.footNpc1 = new FadeNpc(ctx, images[7], 312, 1956, ratio)
    npcSet.footNpc2 = new FadeNpc(ctx, images[8], 312, 2124, ratio)
    npcSet.footNpc3 = new FadeNpc(ctx, images[9], 454, 2254, ratio)
    npcSet.footNpc4 = new FadeNpc(ctx, images[10], 578, 2386, ratio)
    npcSet.footNpc5 = new FadeNpc(ctx, images[11], 772, 2438, ratio)
    npcSet.footNpc6 = new FadeNpc(ctx, images[12], 912, 2544, ratio)

    this.renderFrame()
    this.run()

    window.addEventListener('touchstart', this.play)
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
    renderFrame() {
      const { npcSet } = this

      Object.keys(npcSet).forEach(name => {
        npcSet[name].render()
      })
    },
    run() {
      const { npcSet } = this
      const {
        titleNpc,
        txNpc,
        addrNpc,
        footNpc1,
        footNpc2,
        footNpc3,
        footNpc4,
        footNpc5,
        footNpc6,
        cakeNpc,
        couchNpc,
        childNpc
      } = npcSet
      const run = () => {
        if (addrNpc.progress >= 1) {
          addrNpc.direction = 1
        }
        if (addrNpc.progress < 0.5) {
          addrNpc.direction = 0
        }
        if (addrNpc.direction === 0) {
          addrNpc.in()
        } else {
          addrNpc.out()
        }

        if (titleNpc.progress >= 1) {
          titleNpc.direction = 1
        }
        if (titleNpc.progress < 0.5) {
          titleNpc.direction = 0
        }
        if (titleNpc.direction === 0) {
          titleNpc.in()
        } else {
          titleNpc.out()
        }

        if (txNpc.progress < 1) {
          txNpc.in()
        } else if (footNpc1.progress < 1) {
          footNpc1.in()
        } else if (footNpc2.progress < 1) {
          footNpc2.in()
        } else if (footNpc3.progress < 1) {
          footNpc3.in()
        } else if (footNpc4.progress < 1) {
          footNpc4.in()
        } else if (footNpc5.progress < 1) {
          footNpc5.in()
        } else if (footNpc6.progress < 1) {
          footNpc6.in()
        } else if (cakeNpc.progress < 1) {
          cakeNpc.in()
        } else if (couchNpc.progress < 1) {
          couchNpc.in()
        } else if (childNpc.progress < 1) {
          childNpc.in()
        }

        this.renderFrame()
        window.requestAnimationFrame(run)
      }

      window.requestAnimationFrame(run)
    },
    runNpc(npc) {
      return new Promise(resolve => {
        const run = () => {
          npc.in()
          this.renderFrame()
          if (npc.progress < 1) {
            window.requestAnimationFrame(run)
          } else {
            resolve()
          }
        }

        window.requestAnimationFrame(run)
      })
    },
    play() {
      this.$refs.audio.play()
      this.playing = true
    },
    toggle() {
      if (this.playing) {
        this.$refs.audio.pause()
        this.playing = false
      } else {
        this.play()
      }
      window.removeEventListener('touchstart', this.play)
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}

.container {
  position: relative;
  display: flex;
}

.music-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;

  &.active {
    animation: rotate 3s linear infinite;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.canvas {
  width: 100%;
}
</style>
