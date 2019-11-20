export default class Npc {
  constructor(ctx, el, x, y, ratio) {
    this.width = el.width = el.width * ratio
    this.height = el.height = el.height * ratio
    this.ctx = ctx
    this.el = el
    this.x = x * ratio
    this.y = y * ratio
    this.visible = false
    this.progress = 0
    this.speed = 0.02
  }

  in() {
    this.progress += this.speed
  }

  out() {
    this.progress -= this.speed
  }

  render() {
    const { ctx, el, x, y, width, height } = this

    ctx.drawImage(el, x, y, width, height)
  }
}
