<template>
  <input
    ref="input"
    v-model.trim="val"
    @input="onInput"
    @keydown="onKeydown"
    class="input"
    type="number"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    prev: {
      type: String,
      default: undefined
    },
    next: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      val: this.value
    }
  },
  watch: {
    value(v) {
      this.val = v
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', this.val)
      if (this.val.length === 1 && /\S/.test(this.val.length)) {
        this.$emit('next', this.next)
      }
    },
    onKeydown(e) {
      if (e.keyCode === 8 && this.val === '') {
        this.$emit('prev', this.prev)
      }
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss">
.input {
  width: 42px;
  height: 50px;
  padding: 6px;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  border: 0;
  border-bottom: 1px solid #ddd;
  outline: none;
}
</style>
