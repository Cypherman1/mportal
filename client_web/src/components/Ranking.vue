<template>
  <div>
    <v-card class="accent white--text headline text-left pa-2 font-weight-bold">
      <v-layout>
        <v-icon style="mb-4" color="white">fas fa-tachometer-alt</v-icon>
        <v-spacer></v-spacer>
        <div>{{ totalFormated }}</div></v-layout
      ></v-card
    >
    <v-simple-table height="calc(100vh - 124px)" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" sytle="width: 10%">
              NO
            </th>
            <th class="text-left" style="width: 60%">
              PLAYERS
            </th>
            <th class="text-right" style="width:30%">
              POINTS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ranks" :key="item.id">
            <td class="text-right pr-10">{{ index + 1 }}</td>
            <td><user :uid="item.uid"></user></td>
            <td class="text-right pr-5">{{ item.point }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import User from '../components/User.vue'
export default {
  components: { User },
  name: 'Ranking',
  props: ['ranks', 'totalPoint'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      rankings: 'app/rankings'
    }),
    totalFormated() {
      return Number(this.totalPoint).toLocaleString()
    }
  }
}
</script>
