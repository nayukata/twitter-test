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
          index
        </v-card-title>
        <v-card-text>
          <postTweet />
          <hr class="my-3" />
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
import PostTweet from '~/components/PostTweet.vue'
export default {
  components: {
    Logo,
    PostTweet
  },
  data() {
    return {
      message: '夏目'
    }
  }
}
</script>
