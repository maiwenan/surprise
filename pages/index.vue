<template>
  <div class="container">
    <h3>需要验证</h3>
    <p class="sub-title">私密空间，需要验证才可以访问</p>
    <div class="input-box">
      <c-input ref="a" v-model="vals[0]" @next="onNext" next="b" />
      <c-input ref="b" v-model="vals[1]" @next="onNext" next="c" />
      <c-input ref="c" v-model="vals[2]" @next="onNext" next="d" />
      <c-input ref="d" v-model="vals[3]" @next="onNext" next="e" />
      <c-input ref="e" v-model="vals[4]" @next="onNext" next="f" />
      <c-input ref="f" v-model="vals[5]" />
    </div>

    <a @click="onSubmit" class="btn">确定</a>
  </div>
</template>

<script>
import Input from '~/components/Input.vue'

export default {
  components: {
    'c-input': Input
  },
  data() {
    return {
      vals: ['', '', '', '', '', '']
    }
  },
  methods: {
    onNext(next) {
      this.$refs[next].focus()
    },
    onSubmit() {
      console.log(this.vals.join(''), this.$router)
      this.$router.push('/surprise')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  padding: 40px 20px;
  background-color: #f5f5f9;
}

.sub-title {
  margin-top: 10px;
  color: #999;
}
/* ed7d31 */
.input-box {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn {
  display: block;
  height: 48px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 17px;
  line-height: 48px;
  color: #fff;
  text-align: center;
  background-color: #ed7d31;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:active {
    background-color: darken($color: #ed7d31, $amount: 10%);
  }
}
</style>
