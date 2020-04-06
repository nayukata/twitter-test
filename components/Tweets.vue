<template>
  <div class="posts" style="width: 95%;">
    <div v-for="post in posts" :key="post" class="container">
      <div class="row" style="display: flex; position: relative">
        <div class="tweet-content row-10">
          {{ post }}
        </div>
        <v-btn class="delete-button" @click="deleteTweet(key)">削除</v-btn>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    posts: Array
  },
  data() {
    return {
      editId: false
    }
  },
  computed: {},
  methods: {
    deleteTweet(key) {
      this.$emit('deleted', key)
    }
  }
}
</script>

<style>
.tweet-content {
  width: 40rem;
  padding: 20px 30px;
  font-size: 18px;
  border-bottom: groove 1px white;
}
.delete-button {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
