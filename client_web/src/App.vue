<template>
  <v-app id="inspire">
    <v-navigation-drawer temporary color="info" v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="displayName"></v-list-item-title>
            <v-list-item-subtitle v-html="email"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
      <v-card class="mx-auto" max-width="300" tile>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              router
              :to="item.link"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="signOutHandler">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-layout>
            <v-img
              class="mt-1"
              :src="require('./assets/newlogo_onDark.png')"
              :max-height="60"
              :max-width="120"
            ></v-img>
            <!-- <div class="mt-2 ml-2">Euro 2024</div> -->
          </v-layout>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          elevation="0"
          color="primary"
          router
          :to="item.link"
        >
          <v-icon left>
            {{ item.icon }}
          </v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          elevation="0"
          color="primary"
          @click="signOutHandler"
          v-if="uid !== ''"
        >
          <v-icon left>
            mdi-logout
          </v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>

      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-on="on" v-bind="attrs" size="45">
            <img :src="avatar" alt="John" />
          </v-avatar>
        </template>
        <v-list dense>
          <v-list-item
            color="primary"
            v-for="(item, index) in items"
            :key="index"
            link
            @click="menuClickHandler(item.action)"
          >
            <v-list-item-icon>
              <v-icon color="green darken-2">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    drawer: false
  }),

  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
      getRedirectResult: 'auth/getRedirectResult'
    }),
    signOutHandler() {
      this.signOut()
      this.$router.push('/login')
    }
  },
  // created() {
  //   this.getRedirectResult()
  // },
  computed: {
    ...mapGetters({
      uid: 'auth/uid',
      avatar: 'auth/avatar',
      displayName: 'auth/displayName',
      email: 'auth/email'
    }),
    items() {
      let menuItem = [
        {
          title: 'Home',
          icon: 'mdi-home',
          link: '/'
        },
        { title: 'Login', icon: 'mdi-login', action: 'login', link: '/login' }
      ]
      if (this.uid !== '') {
        menuItem = [
          {
            title: 'Home',
            icon: 'mdi-home',
            action: 'schedule',
            link: '/'
          },
          // { title: 'Rank', icon: 'mdi-logout', action: 'rank', link: '/rank' },
          {
            title: 'Profile',
            icon: 'mdi-account',
            action: 'profile',
            link: '/myprofile/'
          }
        ]
      }
      return menuItem
    }
  }
}
</script>
