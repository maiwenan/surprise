import ScaleNpc from '~/utils/ScaleNpc'

export default class AddrNpc extends ScaleNpc {
  constructor(ctx, el, x, y, ratio) {
    super(ctx, el, x, y, ratio)
  }

  render() {
    const { ctx, el, rx, ry, progress, width, height } = this
    const dWidth = width * progress
    const dHeight = height * progress
    const dx = rx - dWidth / 2
    const dy = ry - dHeight / 2 + (height - dHeight) / 2

    ctx.drawImage(el, dx, dy, dWidth, dHeight)
  }
}
