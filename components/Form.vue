<template>
  <div class="container">
    <div class="row">
      <textarea
        v-model="content"
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
      content: ''
    }
  },
  methods: {
    async submit() {
      const ref = db.collection('post').doc()

      const id = ref.id
      const post = {
        content: this.content,
        created_at: new Date(),
        updated_at: new Date()
      }
      await ref.set(post)

      this.$emit('add-post-to-array', { ...post, uid: id })
      this.content = ''
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
