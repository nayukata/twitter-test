<template>
  <div class="posts" style="width: 95%;">
    <div v-for="post in posts" :key="post.uid" class="container">
      <div class="row" style="position: relative">
        <div class="tweet-content row-10">
          <p v-if="post.isActive !== true">
            {{ post.content }}
          </p>
          <textarea
            v-else
            v-model="content"
            cols="30"
            rows="3"
            @change="updated(post)"
          >
          </textarea>
          <p color="white">{{ content }}</p>
        </div>
        <v-btn class="edit-button" @click="activate(post)"
          ><v-icon small color="white">mdi-square-edit-outline</v-icon> 編集
        </v-btn>
        <v-btn class="delete-button" @click="deleteTweet(post.uid)"
          ><v-icon small color="white">mdi-delete-outline</v-icon> 削除
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/utils/firebase.js'

export default {
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => ({
        content: 'now loading'
      })
    }
  },

  data() {
    return {
      content: '',
      isActive: false
    }
  },
  computed: {},
  methods: {
    activate(post) {
      this.content = post.content
      this.$emit('edit-post', post.uid)
    },
    async deleteTweet(postId) {
      await db
        .collection('post')
        .doc(postId)
        .delete()
        .then(function() {
          console.log('Document successfuly deleted')
        })
      this.$emit('post-deleted', postId, this.isActive)
    },
    updated(post) {
      post.content = this.content
      console.log('updated')
      const ref = db.collection('post').doc(post.uid)
      ref.set({
        content: post.content,
        created_at: post.created_at,
        updated_at: new Date()
      })
      this.$emit('updated-post', post)
    }
  }
}
</script>

<style scoped>
.tweet-content {
  width: 40rem;
  padding: 20px 30px;
  font-size: 18px;
  border-bottom: groove 1px white;
}
.delete-button {
  width: 24px;
  position: absolute;
  bottom: 2px;
  right: 0;
}
.edit-button {
  width: 24px;
  position: absolute;
  bottom: 2px;
  right: 65px;
}
</style>
