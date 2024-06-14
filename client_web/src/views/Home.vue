<template>
  <v-row class="pr-2">
    <v-col cols="12" sm="8" class="pr-0 pr-md-0">
      <v-tabs
        :value="tab"
        center-active
        background-color="accent"
        dark
        @change="handleChange"
      >
        <v-tab v-for="item in items" :key="item.tab" :value="item.value">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items :value="tab" :class="isMobile ? 'matches ' : ''">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat class="mt-2 ">
            <div v-for="match in dMatch" :key="match.id">
              <match
                :match="match"
                :bet="matchBets[match.id]"
                :matchBets="bets.filter(bet => bet.matchId === match.id)"
              ></match>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <bet-dialog></bet-dialog>
      <my-snack-bar></my-snack-bar>
    </v-col>
    <v-col
      cols="12"
      sm="4"
      class="cyan lighten-4 pl-4 mt-1 pl-md-1 pr-2"
      style="height:calc(100vh - 60px)"
    >
      <div class="">
        <ranking :ranks="ranks" :totalPoint="totalPoint"></ranking>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import Match from '../components/Match.vue'
import BetDialog from '../components/BetDialog.vue'
import Ranking from '../components/Ranking.vue'
import MySnackBar from '../components/MySnackBar.vue'
const calDate = () => {
  const res = []
  let idate
  const startDate = moment('14/06/2024', 'DD/MM/YYYY')
  for (let i = 0; i < 100; i++) {
    idate = moment(startDate).add(i, 'day')
    res.push({
      tab: moment(idate).format('DD/MM/YYYY'),
      content: 'tab ' + i,
      value: idate
    })
  }
  return res
}

export default {
  components: { Match, BetDialog, Ranking, MySnackBar },
  data() {
    return {
      items: calDate(),
      dMatch: [],
      matchBets: {},
      ranks: [],
      totalPoint: 0
    }
  },
  created() {
    this.deleteUser()
    this.getUsers()
    this.snapshotBets()
    this.snapshotMatches()
    this.dMatch = this.matches
      .filter(match => match.date_offset === this.tab)
      .sort((a, b) => {
        if (a.date.seconds < b.date.seconds) {
          return -1
        }
        if (a.date.seconds > b.date.seconds) {
          return 1
        }
        return 0
      })

    const matchBets = {}
    this.bets.forEach(bet => {
      if (bet.uid === this.uid) {
        matchBets[bet.matchId] = {
          id: bet.id,
          bet: bet.bet,
          history: bet.history,
          uid: bet.uid
        }
        // matchBets[bet.matchId].bet
      }
    })
    this.matchBets = matchBets

    var result = []
    this.rankings.reduce(function(res, value) {
      if (!res[value.uid]) {
        res[value.uid] = { uid: value.uid, point: 0 }
        result.push(res[value.uid])
      }
      res[value.uid].point += value.point
      return res
    }, {})

    this.ranks = result.sort((a, b) =>
      a.point > b.point ? 1 : a.point < b.point ? -1 : 0
    )
    this.totalPoint = 0
    this.ranks.map(rank => (this.totalPoint += rank.point))

    this.getCurrentDate()
  },
  methods: {
    ...mapActions({
      getMatches: 'app/getMatches',
      snapshotMatches: 'app/snapshotMatches',
      snapshotBets: 'app/snapshotBets',
      setTab: 'app/setTab',
      setDayMatches: 'app/setDayMatches',
      getUsers: 'app/getUsers',
      getCurrentDate: 'app/getCurrentDate',
      deleteUser: 'app/deleteUser'
    }),
    handleChange(e) {
      this.setTab(e)
      this.setDayMatches(e)
    }
  },
  watch: {
    matches() {
      this.dMatch = this.matches
        .filter(match => match.date_offset === this.tab)
        .sort((a, b) => {
          if (a.date.seconds < b.date.seconds) {
            return -1
          }
          if (a.date.seconds > b.date.seconds) {
            return 1
          }
          return 0
        })

      const matchBets = {}
      this.bets.forEach(bet => {
        if (bet.uid === this.uid) {
          matchBets[bet.matchId] = {
            id: bet.id,
            bet: bet.bet,
            history: bet.history,
            uid: bet.uid
          }
        }
      })
      this.matchBets = matchBets

      var result = []
      this.rankings.reduce(function(res, value) {
        if (!res[value.uid]) {
          res[value.uid] = { uid: value.uid, point: 0 }
          result.push(res[value.uid])
        }
        res[value.uid].point += value.point
        return res
      }, {})

      this.ranks = result.sort((a, b) =>
        a.point > b.point ? 1 : a.point < b.point ? -1 : 0
      )
      this.totalPoint = 0
      this.ranks.map(rank => (this.totalPoint += rank.point))
    },
    tab() {
      this.dMatch = this.matches
        .filter(match => match.date_offset === this.tab)
        .sort((a, b) => {
          if (a.date.seconds < b.date.seconds) {
            return -1
          }
          if (a.date.seconds > b.date.seconds) {
            return 1
          }
          return 0
        })
      const matchBets = {}
      this.bets.forEach(bet => {
        if (bet.uid === this.uid) {
          matchBets[bet.matchId] = {
            id: bet.id,
            bet: bet.bet,
            history: bet.history,
            uid: bet.uid
          }
          // matchBets[bet.matchId].bet
        }
      })
      this.matchBets = matchBets
    },
    bets() {
      const matchBets = {}
      this.bets.forEach(bet => {
        if (bet.uid === this.uid) {
          matchBets[bet.matchId] = {
            id: bet.id,
            bet: bet.bet,
            history: bet.history,
            uid: bet.uid
          }
          // matchBets[bet.matchId].bet
        }
      })
      this.matchBets = matchBets

      var result = []
      this.rankings.reduce(function(res, value) {
        if (!res[value.uid]) {
          res[value.uid] = { uid: value.uid, point: 0 }
          result.push(res[value.uid])
        }
        res[value.uid].point += value.point
        return res
      }, {})

      this.ranks = result.sort((a, b) =>
        a.point > b.point ? 1 : a.point < b.point ? -1 : 0
      )
      this.totalPoint = 0
      this.ranks.map(rank => (this.totalPoint += rank.point))
    }
  },
  computed: {
    ...mapGetters({
      matches: 'app/matches',
      bets: 'app/bets',
      loading: 'app/loading',
      dayMatches: 'app/dayMatches',
      tab: 'app/tab',
      snack: 'app/snack',
      uid: 'auth/uid',
      rankings: 'app/rankings',
      legalName: 'auth/legalName'
    }),
    isMobile: function() {
      return this.$vuetify.breakpoint.name !== 'xs'
    },
    legalUpdated: function() {
      if (this.legalName) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style scoped>
.matches {
  height: calc(100vh - 130px);
  overflow-y: auto;
}
</style>
