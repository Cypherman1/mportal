<template>
  <v-card class="mx-auto mt-0 mt-md-5" max-width="1100">
    <v-img :src="banner" max-height="400" contain></v-img>
    <v-layout>
      <div class="mt-5 ml-4">
        <v-avatar size="50">
          <v-img :src="avatar"></v-img>
        </v-avatar>
      </div>
      <div>
        <v-card-title
          ><div>{{ displayName }}</div>
        </v-card-title>
        <v-card-subtitle>
          <div>{{ legalName }}</div>
          <div>{{ email }}</div>
        </v-card-subtitle>
      </div>
      <v-spacer> </v-spacer>
    </v-layout>

    <div>
      <v-divider></v-divider>

      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="no"
          :items="dataItems"
          :items-per-page="-1"
          :loading="loading"
          class="elevation-1"
          show-expand
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title class="accent--text"
                >Points : {{ totalPoint }}</v-toolbar-title
              >
            </v-toolbar>
          </template>
          <template v-slot:item.no="{ item, index }">
            <tr class="d-flex justify-end">
              <td>{{ index + 1 }}</td>
            </tr>
          </template>
          <template v-slot:item.point="{ item }">
            <tr class="d-flex justify-end">
              <td :class="item.point === 0 ? 'success--text' : 'error--text'">
                <div>
                  {{ item.point }}
                </div>
              </td>
            </tr>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div
                class="my-3 text-center"
                v-for="his in item.history"
                :key="his.time.seconds"
              >
                <div v-if="his.home !== '-'">
                  <span> {{ his.home }} - {{ his.away }} </span> :
                  {{ his.time }}
                </div>
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <my-snack-bar></my-snack-bar>
    </div>
  </v-card>
</template>

<script>
// import AvatarPicker from '~/components/AvatarPicker'

import { mapGetters, mapActions } from 'vuex'
import MySnackBar from '../components/MySnackBar.vue'
import moment from 'moment'
const cFunc = (a, b) => {
  if (a.time.seconds < b.time.seconds) {
    return 1
  }
  if (a.time.seconds > b.time.seconds) {
    return -1
  }
  return 0
}

const CalPoint = ({ bet, isHopeStar, score, round, rate }) => {
  let point = 0
  if (score.home === '-' || score.away === '') {
    point = 0
  } else if (bet.home === '-' || bet.away === '-') {
    point = rate[round].lose
  } else if (
    Number(bet.home) === Number(score.home) &&
    Number(bet.away) === Number(score.away)
  ) {
    point = rate[round].scored
  } else if (
    (Number(bet.home) > Number(bet.away) &&
      Number(score.home) > Number(score.away)) ||
    (Number(bet.home) < Number(bet.away) &&
      Number(score.home) < Number(score.away)) ||
    (Number(bet.home) === Number(bet.away) &&
      Number(score.home) === Number(score.away))
  ) {
    point = rate[round].win
  } else {
    point = rate[round].lose
  }
  return point
}
export default {
  components: { MySnackBar },

  name: 'profile',
  data() {
    return {
      totalPoint: 0,
      expanded: [],
      singleExpand: false,
      banner: require('../assets/banner.jpeg'),
      headers: [
        { text: 'No', value: 'no', sortable: false },
        { text: 'Date time', value: 'dateTime', sortable: true },
        { text: 'Match', value: 'match', sortable: false },
        { text: 'Group', value: 'group', sortable: false, align: 'center' },
        { text: 'Round', value: 'round', sortable: false, align: 'center' },
        { text: 'Score', value: 'score', sortable: false, align: 'center' },
        {
          text: 'Your bet',
          value: 'yourBet',
          sortable: false,
          align: 'center'
        },
        { text: 'Bet time', value: 'betTime', sortable: false },
        { text: 'Point', value: 'point', sortable: false, align: 'right' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  created() {
    this.getUsers()
  },
  async mounted() {
    await this.getUserBets({ uid: this.$route.params.uid })
  },
  methods: {
    ...mapActions({
      getUsers: 'app/getUsers',
      setProfileDialog: 'auth/setProfileDialog',
      getUserBets: 'app/getUserBets'
    })
  },
  watch: {
    dataItems() {
      let total = 0
      this.dataItems.map(res => (total += res.point))
      this.totalPoint = total
    }
  },
  computed: {
    ...mapGetters({
      users: 'app/users',
      uid: 'auth/uid',
      userBets: 'app/userBets',
      teams: 'app/teams',
      loading: 'app/loading',
      rate: 'app/rate'
    }),
    isHome() {
      return this.$route.params.uid === this.uid
    },
    avatar() {
      const a = this.users.find(user => user.uid === this.$route.params.uid)

      if (a) return a.avatar
      return ''
    },
    legalName() {
      const d = this.users.find(user => user.uid === this.$route.params.uid)
      if (d) return d.legalName
      return ''
    },
    displayName() {
      const d = this.users.find(user => user.uid === this.$route.params.uid)
      if (d) return d.displayName
      return ''
    },
    email() {
      const d = this.users.find(user => user.uid === this.$route.params.uid)
      if (d) return d.email
      return ''
    },
    dataItems() {
      const result = []
      this.userBets.map(item => {
        if (item.score.home !== '-' && item.score.away !== '-') {
          result.push({
            time: item.date,
            dateTime: moment(item.date.toDate()).format('DD/MM/yyyy HH:mm'),
            match: `${this.teams[item.home].name} - ${
              this.teams[item.away].name
            }`,
            group: item.table,
            round: item.round,
            score: `${item.score.home} - ${item.score.away}`,
            yourBet: `${item.bet.home} - ${item.bet.away}`,
            betTime: moment(item.bet.time.toDate()).format(
              'DD/MM/yyyy HH:mm:ss'
            ),
            history: item.history.sort(cFunc).map(his => ({
              ...his,
              time: moment(his.time.toDate()).format('DD/MM/yyyy HH:mm:ss')
            })),
            point: CalPoint({
              bet: item.bet,
              isHopeStar: '',
              score: item.score,
              round: item.round,
              rate: this.rate
            })
          })
        }
      })
      return result.sort(cFunc)
    }
  }
}
</script>
