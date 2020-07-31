<template>
  <div>
    <pre>
      <code class="javascript">
        const i = 1
      </code>
    </pre>
    <v-card>
      <v-card-title primary-title>
        <div class="ma-1" v-html="personJobMarkdown"></div>
      </v-card-title>
      <v-card-subtitle class="ma-1" v-html="personGreetingMarkdown">
      </v-card-subtitle>
      <v-card-text>
        <textarea v-model="markdownText">input</textarea>
      </v-card-text>
      <v-card-text>
        <MarkdownDisplay :markdown="markdownText"></MarkdownDisplay>
        <MarkdownDisplay :markdown="person.code"></MarkdownDisplay>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary">text</v-btn>
        <v-btn text color="primary">text</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash'
import marked from 'marked'
import hljs from 'highlightjs'
import MarkdownDisplay from '~/components/MarkdownDisplay'

export default {
  components: {
    MarkdownDisplay
  },
  data() {
    return {
      markdownText: '',
      person: {
        job: '## Knight',
        greeting: '## All hail the Lelouch!!',
        code:
          '```const myName = "Orange"\n' +
          ' const description = "His left eye was replaced with an orange framed artificial eye which was essentially a geass canceler." ```'
      },
      description: ''
    }
  },
  computed: {
    personJobMarkdown() {
      return marked(this.person.job)
    },
    personGreetingMarkdown() {
      return marked(this.person.greeting)
    },
    personCodeMarkdown() {
      return marked(this.person.code)
    },
    isNumber(num) {
      return _.isNumber(num)
    }
  },
  created() {
    marked.setOptions({
      // code要素にdefaultで付くlangage-を削除
      langPrefix: '',
      // highlightjsを使用したハイライト処理を追加
      highlight(code, lang) {
        return hljs.highlightAuto(code, [lang]).value
      }
    })
  }
}
</script>
<style></style>
