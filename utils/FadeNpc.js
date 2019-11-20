import Npc from '~/utils/Npc'

export default class FadeNpc extends Npc {
  constructor(ctx, el, x, y, ratio) {
    super(ctx, el, x, y, ratio)
  }

  render() {
    const { ctx, el, x, y, width, height } = this

    ctx.globalAlpha = this.progress
    ctx.drawImage(el, x, y, width, height)
    ctx.globalAlpha = 1
  }
}
