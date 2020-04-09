<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-form>
        <div class="text-center">
          <p>新規登録</p>
        </div>
        <p>e-mail: <input v-model="email" type="text" /></p>
        <p>password: <input v-model="password" type="text" /></p>
        <p>name: <input v-model="name" type="text" /></p>
        <p>{{ flg ? 'hello' : 'good evening' }}</p>
        <v-btn @click="toggle">change</v-btn>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from '~/utils/firebase.js'

export default {
  components: {},
  data() {
    return {
      email: '',
      password: '',
      name: '',
      flg: true
    }
  },
  methods: {
    toggle() {
      this.flg = !this.flg
      console.log(this.flg)
    },
    createUser() {
      db.collection('user')
        .doc()
        .add({
          email: this.email,
          password: this.password,
          name: this.name
        })
    }
  }
}
</script>

<style scoped>
input {
  background-color: #fff;
  color: black;
}
</style>
