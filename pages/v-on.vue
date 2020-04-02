<template>
  <div>
    <v-btn @mousemove.stop="changeMousePosition">マウスを乗せてください</v-btn>
    <span @mousemove.stop>ここから反応すなー</span>
    <p>X: {{ x }}, Y: {{ y }}</p>
    <input
      type="text"
      style="background: white; color: black"
      @keyup.enter="myAlert"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {
    changeMousePosition(event) {
      this.x = event.clientX
      this.y = event.clientY
      console.log(this.x, this.y)
    },
    noEvent(event) {
      event.stopPropagation()
    },
    myAlert() {
      alert('そこまでだ。')
    }
  }
}
</script>
