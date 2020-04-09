<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div>
        {{ message }}
      </div>
      <v-btn @click="getPosts">テスト</v-btn>
      <v-card>
        <v-card-title class="headline">
          Comatter
        </v-card-title>
        <Form class="mx-3" @add-post-to-array="addPost" />
        <hr class="my-3" />
        <v-card-text>
          <Tweets
            :posts="posts"
            @edit-post="editPost"
            @updated-post="updatePosts"
            @post-deleted="deletePost"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Tweets from '~/components/Tweets.vue'
import Form from '~/components/Form.vue'
import { db } from '~/utils/firebase.js'

export default {
  components: {
    Tweets,
    Form
  },
  // async asyncData() {
  //   const posts = await db
  //     .collection('posts')
  //     .orderBy('created_at', 'asc')
  //     .get()
  //   return { posts }
  // },
  data() {
    return {
      message: '',
      posts: []
    }
  },
  async mounted() {
    this.posts = await this.getPosts()
  },
  methods: {
    // データを全件取得
    async getPosts() {
      const collection = await db
        .collection('post')
        .orderBy('created_at', 'desc')
        .get()
      // ↑これはコレクション型
      const docs = collection.docs // ドキュメント型の配列
      // const doc = docs[0] // 配列の中の先頭のドキュメント1
      // 全てのドキュメントで.data()を行い配列で返す
      const data = docs.map((doc) => {
        return { ...doc.data(), uid: doc.id, isActive: false }
      })
      // データを取得するときはドキュメント型に対して、.data()を行う必要がある
      // コレクション型.docs←これはドキュメント型の配列
      console.log(data)
      return data
    },
    addPost(post) {
      console.log('Post successfuly added')
      console.log('addPost', post)
      this.posts.unshift(post)
    },
    editPost(postId) {
      console.log('----- EditPost -----')
      console.log(this.posts)
      console.log('target:', postId)
      console.log('target:', typeof postId)
      this.posts.forEach((post) => {
        if (post.uid === postId) {
          post.isActive = !post.isActive
        }
      })
      // const index = this.posts.indexOf((post) => post.uid === postId)
      // console.log(index)
      // if (index >= 0) {
      //   console.log('true')
      //   this.posts[index].isActive = true
      // } else {
      //   console.log('oops! unkown post')
      // }
    },
    updatePosts(newPost) {
      this.posts.forEach((post) => {
        if (post.uid === newPost.uid) {
          post.isActive = false
          post = newPost
        }
      })
    },
    deletePost(postId) {
      const newPosts = this.posts.filter((post) => post.uid !== postId)
      this.posts = newPosts
    }
  }
}
</script>
