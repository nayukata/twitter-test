<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <div>
        {{ message }}
      </div>
      <v-card>
        <v-card-title class="headline">
          Comatter
        </v-card-title>
        <v-card-text>
          <Tweets :posts="getPosts" />
          <hr class="my-3" />
          <Form @posted="addTweet" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Tweets from '~/components/Tweets.vue'
import Form from '~/components/Form.vue'
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()
db.setting({ timestampsInSnapshots: true })

export default {
  components: {
    Logo,
    Tweets,
    Form
  },

  data() {
    return {
      message: "it's over",
      posts: ['コードかきかき', '準備中']
    }
  },
  methods: {
    // データを全件取得
    getPosts() {
      return db
        .collection('posts')
        .orderBy('created_at', 'asc')
        .get()
    },
    addTweet(newTweet) {
      this.posts.push(newTweet)
    }
  }
}
</script>
