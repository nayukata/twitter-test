<template>
  <div class="posts" style="width: 95%;">
    <div v-for="post in posts" :key="post.uid" class="container">
      <div class="row" style="display: flex; position: relative">
        <div class="tweet-content row-10">
          {{ post.content }}
        </div>
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
    return {}
  },
  computed: {},
  methods: {
    async deleteTweet(postId) {
      await db
        .collection('posts')
        .doc(postId)
        .delete()
        .then(function() {
          console.log('Document successfuly deleted')
        })
      this.$emit('post-deleted', postId)
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
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
