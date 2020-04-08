<template>
  <div class="container">
    <div class="row">
      <textarea
        v-model="post.content"
        class="tweet-form col-9"
        rows="4"
        cols="40"
        type="text"
      />
      <v-btn
        color="primary"
        style="height: 4rem;"
        class="form-button col-2 my-auto"
        @click="submit"
        >投稿する
      </v-btn>
    </div>
  </div>
</template>

<script>
import { db } from '~/utils/firebase.js'

export default {
  data() {
    return {
      post: {
        content: '',
        created_at: new Date()
      }
    }
  },
  methods: {
    async submit() {
      await db
        .collection('posts')
        .doc()
        .set(this.getPost())

      console.log('Form.vue' + this.post)

      this.$emit('add-post-to-array', this.post)
      this.post.content = ''
      this.post.created_at = ''
    },
    getPost() {
      this.post.created_at = new Date()
      return this.post
    }
  }
}
</script>
<style scoped>
.tweet-form {
  padding: 5px;
  margin-left: 1rem;
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
