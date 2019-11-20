<template>
  <input
    ref="input"
    v-model.trim="val"
    @input="onInput"
    class="input"
    type="password"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
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
  font-size: 28px;
  line-height: 50px;
  text-align: center;
  border: 0;
  border-bottom: 1px solid #ddd;
  outline: none;
}
</style>
