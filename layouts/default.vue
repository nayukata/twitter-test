<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <transition
        appear=""
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @enter-cancelled="afterEnter"
      >
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon light color="white">
                mdi-account
              </v-icon>
            </v-list-item-action>
            <nuxt-link to="/Register">
              <v-list-item-title>新規登録</v-list-item-title>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </transition>
      <v-list :key="2" :data-index="2">
        <v-list-item>
          <v-list-item-action>
            <v-icon light color="white">
              mdi-login
            </v-icon>
          </v-list-item-action>
          <nuxt-link to="/">
            <v-list-item-title>ログイン</v-list-item-title>
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
    },
    afterEnter(el) {
      el.style.transitionDelay = ''
    }
  }
}
</script>
<style>
.v-enter-active,
.v-leave-active,
.v-move {
  transition: 2s, transform 2s;
}

.v-leave-active {
  position: absolute;
}
.v-enter {
  transform: TransformX(-20px);
}
.v-leave-to {
  transform: TransformX(20px);
}
</style>
