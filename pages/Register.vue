<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-form ref="form" v-model="valid">
        <v-container width="400px">
          <v-row align="center">
            <v-col cols="12">
              <v-text-field
                v-model="name"
                :rules="[nameRules.required, nameRules.regex]"
                color="blue darken-2"
                label="ユーザー名"
                :counter="10"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :rules="[emailRules.required, emailRules.regex]"
                color="blue darken-2"
                label="メールアドレス"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :rules="[passwordRules.required, passwordRules.regex]"
                color="blue darken-2"
                type="password"
                label="パスワード"
                required
              ></v-text-field>
            </v-col>
            <v-btn :disabled="!valid" color="success" @click="createUser">
              新規登録
            </v-btn>
          </v-row>
        </v-container>
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
      valid: false,
      name: '',
      nameRules: {
        required: (v) => !!v || 'ユーザー名を入力してください',
        regex: (v) =>
          /^([a-zA-Z0-9]{2,10})$/.test(v) ||
          '2文字以上、10文字以下で入力してください'
      },
      email: '',
      emailRules: {
        required: (v) => !!v || 'メールアドレスを入力してください',
        regex: (v) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'メールアドレスの形式で入力してください'
        }
      },
      password: '',
      passwordRules: {
        required: (v) => !!v || 'パスワードを入力してください',
        regex: (v) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
          return (
            pattern.test(v) ||
            'パスワードは大文字、数字を含み8文字以上で入力してください'
          )
        }
      }
    }
  },
  mounted() {
    // エラーをリセット
    this.$refs.form.resetValidation()
  },
  methods: {
    async createUser() {
      // エラーがなければユーザーを作成
      if (this.$refs.form.validate()) {
        const usersRef = db.collection('users')
        // const userId = usersRef.id
        await usersRef
          .add({
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then((docRef) => {
            console.log('Document ID:', docRef.id)
            this.$emit('created-user', docRef.id)
          })
          .catch((error) => {
            console.log('createUserError:', error)
          })
      }
    }
  }
}
</script>

<style scoped>
input {
  background-color: #fff;
  color: black;
}
.container {
  width: 70%;
  background: #1a1818;
}
.col {
  padding: 30px 100px;
}
</style>
