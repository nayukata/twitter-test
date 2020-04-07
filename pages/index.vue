<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <div>
        {{ message }}
      </div>
      <v-btn @click="getPosts">テスト</v-btn>
      <!-- <v-card>
        <v-card-title class="headline">
          Comatter
        </v-card-title>
        <v-card-text>
          <Tweets :posts="posts" />
          <hr class="my-3" />
          <Form @posted="addTweet" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card> -->
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
// import Tweets from '~/components/Tweets.vue'
// import Form from '~/components/Form.vue'
import { db } from '~/utils/firebase.js'

export default {
  components: {
    Logo
    // Tweets,
    // Form
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
      message: "it's over"
    }
  },
  methods: {
    // データを全件取得
    getPosts() {
      const data = db
        .collection('posts')
        .orderBy('created_at', 'asc')
        .get()
      console.log(data)
    },
    addTweet(newTweet) {
      this.posts.push(newTweet)
    }
  }
}
</script>
