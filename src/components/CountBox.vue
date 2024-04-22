<template>
  <div class="CountBox">
    <Button @click="handelSub" class="sub">-</Button>
    <input class="inp" @change="handelChange" type="text" :value="value">
    <Button @click="handelAdd" class="add">+</Button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 商品数量-1
    handelSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    // 商品数量+1
    handelAdd () {
      this.$emit('input', this.value + 1)
    },
    handelChange (e) {
      const num = e.target.value
      // 处理输入不合理的值
      if (isNaN(num) || num < 0) {
        e.target.value = this.value
        return
      }
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="less" scoped>
  .CountBox {
    width: 110px;
    height: 30px;
    display: flex;
    .sub,
    .add {
      width: 30px;
      height: 30px;
      text-align: center;
      background-color: #ebebeb;
      outline: none;
      border: none;
    }
    .inp {
      width: 40px;
      height: 30px;
      text-align: center;
      margin: auto 5px;
      background-color: #ebebeb;
      outline: none;
      border: none;
    }
  }
</style>
