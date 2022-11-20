<template>
  <v-layout class="p-3" @click="handleClick" style="cursor: pointer">
    <div v-if="avOnly">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-avatar :size="36">
              <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="white--text">
                {{ displayName }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <span>{{ displayName }}</span>
      </v-tooltip>
    </div>
    <div v-if="!avOnly">
      <v-avatar size="36">
        <v-img :src="avatar"></v-img>
      </v-avatar>
    </div>
    <div v-if="!avOnly" class="mt-2 ml-3 font-weight-medium primary--text">
      {{ displayName }}
    </div>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  props: ['uid', 'avOnly'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      users: 'app/users'
    }),
    avatar() {
      const a = this.users.find((user) => user.uid === this.uid)
      if (a) return a.avatar
      return ''
    },

    displayName() {
      const d = this.users.find((user) => user.uid === this.uid)
      if (d) return d.displayName
      return ''
    }
  },
  methods: {
    handleClick() {
      this.$router.push({ name: 'Profile', params: { uid: this.uid } })
    }
  }
}
</script>
