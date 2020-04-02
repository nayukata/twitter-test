<template>
  <div>
    <input v-model="message" type="text" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  }
}
</script>
