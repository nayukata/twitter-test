<template>
  <v-layout fluid>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="10">
            <v-textarea
              v-model="content"
              auto-grow
              filled
              :rules="[contentRules.required]"
              label="メッセージを送信"
              outlined
              shaped
              rows="3"
              row-height="8"
            ></v-textarea>
          </v-col>
          <v-col cols="2">
            <v-btn
              :disabled="!valid"
              color="primary"
              style="height: 4rem;"
              class="form-button col-2 my-auto"
              @click="submit"
              >投稿する
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-layout>
</template>

<script>
import { db } from '~/utils/firebase.js'

export default {
  data() {
    return {
      valid: false,
      content: '',
      contentRules: {
        required: (v) => !!v || false
      }
    }
  },
  mounted() {
    // エラーをリセット
    this.$refs.form.resetValidation()
  },
  methods: {
    async submit() {
      // エラーがなければ送信
      if (this.$refs.form.validate()) {
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
        this.$refs.form.resetValidation()
      }
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
.container {
  width: 50rem;
}
</style>
