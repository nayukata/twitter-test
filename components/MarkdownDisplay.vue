<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlightjs'
// hljs.initHighlightingOnLoad()

export default {
  props: ['markdown'],
  computed: {
    compiledMarkdown() {
      console.log(hljs.listLanguages())
      return marked(this.markdown, {
        fljs(md) {
          return hljs.highlightAuto(md).value
        }
      })
    }
  }
}
</script>
