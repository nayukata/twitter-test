<template>
  <form>
    <textarea placeholder="# 本文" rows="24" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </form>
</template>

<script>
import marked from 'marked'
import Prism from 'prismjs'
import lodash from 'lodash'

export default {
  data() {
    return {
      title: '',
      body: ''
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.body, { sanitize: true })
    }
  },
  created() {
    marked.setOptions({
      breaks: true,
      langPrefix: 'language-',
      highlight(code, lang) {
        if (lang && lang.match(':')) {
          lang = lang.substring(0, lang.indexOf(':'))
        }
        if (lang in Prism.languages) {
          return Prism.highlight(code, Prism.languages[lang])
        } else {
          return code
        }
      }
    })
  },
  methods: {
    update: lodash.debounce(function(e) {
      this.body = e.target.value
    }, 500)
  }
}
</script>
