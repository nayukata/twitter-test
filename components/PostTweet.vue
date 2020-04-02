<template>
  <div class="posts" style="overflow: auto;">
    <div v-for="post in posts" :key="post.id" class="container">
      <div style="display: flex;">
        <v-card style="width: 100rem; padding: 20px 30px;">
          {{ post.content }}
        </v-card>
        <v-btn @click="del(post.id)">削除</v-btn>
        <v-btn @click="edit(post.id)">編集</v-btn>
      </div>
    </div>
    <input
      v-model="message"
      style="width: 48rem; height: 4rem; background: white;"
      type="text"
    />
    <v-btn v-if="editId" color="primary" @click="update">
      更新
    </v-btn>
    <v-btn v-else color="primary" style="float: right;" @click="tweet">
      投稿
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      posts: [
        { id: 1, content: 'hoge' },
        { id: 2, content: 'its joke haha' },
        { id: 3, content: 'on duty' }
      ],
      editId: false
    }
  },
  methods: {
    tweet() {
      const post = { id: this.posts.length + 1, content: this.message }
      this.posts.push(post)
      this.message = ''
    },
    del(postId) {
      this.posts = this.posts.filter((post) => {
        console.log('post', post, 'postId', postId)
        return post.id !== postId
      })
    },
    update() {
      this.posts.find((post) => post.id === this.editId).content = this.message
      this.message = ''
      this.editId = false
    },
    edit(postId) {
      this.editId = postId
      this.message = this.posts.find((post) => post.id === postId).content
    }
  }
}
</script>
