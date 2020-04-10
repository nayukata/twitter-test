<template>
  <div class="hello" style="background:grey;">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <hr />
    <button @click="doAction">
      {{ btn }}
    </button>
    <transition
      name="transit"
      @before-enter="startAction"
      @before-leave="startAction"
      @after-enter="endAction"
      @after-leave="endAction"
    >
      <p v-if="flg" class="trans">Transition!</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String
  },
  data() {
    return {
      message: 'Transition Sumnple',
      flg: true,
      btn: 'Show/Hide'
    }
  },
  methods: {
    doAction() {
      this.flg = !this.flg
    },
    startAction() {
      if (this.flg) {
        this.message = '現れます・・・・・'
      } else {
        this.message = '消えます・・・・・'
      }
    },
    endAction() {
      if (this.flg) {
        this.btn = 'Hide'
        this.message = '現われました。'
      } else {
        this.btn = 'Show'
        this.message = '消えました。'
      }
    }
  }
}
</script>

<style>
.trans {
  background-color: #ddf;
  padding: 10px;
  font-size: 20px;
}

.transit-enter-active {
  transition: opacity 0.5s;
}
.transit-leave-active {
  transition: opacity 5s;
}
.transit-enter {
  opacity: 0;
}
.transit-enter-to {
  opacity: 1;
}
.transit-leave {
  opacity: 1;
}
.transit-leave-to {
  opacity: 0;
}
</style>
