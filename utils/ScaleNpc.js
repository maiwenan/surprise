import Npc from '~/utils/Npc'

export default class ScaleNpc extends Npc {
  constructor(ctx, el, x, y, ratio) {
    super(ctx, el, x, y, ratio)
    this.rx = this.x + this.width / 2
    this.ry = this.y + this.height / 2
    this.speed = 0.02
  }

  render() {
    const { ctx, el, rx, ry, progress, width, height } = this
    const dWidth = width * progress
    const dHeight = height * progress
    const dx = rx - dWidth / 2
    const dy = ry - dHeight / 2

    ctx.drawImage(el, dx, dy, dWidth, dHeight)
  }
}
