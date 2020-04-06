<template>
  <div class="container">
    <div class="row">
      <textarea
        v-model="tweet"
        class="tweet-form col-10"
        rows="4"
        cols="40"
        type="text"
      />
      <v-btn
        color="primary"
        style="height: 4rem;"
        class="form-button col-2 my-auto"
        @click="postTweet"
        >投稿する
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweet: ''
    }
  },
  methods: {
    postTweet() {
      this.$emit('posted', this.tweet)
      this.message = ''
    }
  }
}
</script>
<style scoped>
.tweet-form {
  padding: 5px;
  width: 85%;
  height: 5rem;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.301);
  display: inline-block;
}

.form-button {
  width: 20%;
  height: 8rem;
  margin-left: 15px;
}

textarea {
  flex: 1;
  background: transparent;
  color: white;
  appearance: none;
  height: 100%;
  padding: 10px;
  font-size: 14px;
  resize: none;
}
</style>
