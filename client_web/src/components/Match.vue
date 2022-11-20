<template>
  <v-container pa-2
    ><v-card class="mx-auto" max-width="500" outlined>
      <v-card-actions style="background: #17a6b9" class="white--text">
        <v-icon small :color="iconColor">
          mdi-checkbox-blank-circle
        </v-icon>
        <div class="subheading ml-2 font-weight-medium">
          {{ iRound }} {{ match.table }} - {{ match.time }}
        </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-icon v-if="bet" :color="iconColor" size="15"
          >fas fa-praying-hands</v-icon
        >
        <div
          v-if="bet"
          class="green--text text--lighten-4 font-weight-bold ml-2"
        >
          {{ bet.bet.home }} - {{ bet.bet.away }}
        </div>
        <v-btn
          v-if="match.status === 'NOT STARTED'"
          class="mx-2"
          fab
          dark
          x-small
          color="cyan"
          @click="setDialog({ dialog: true, currentMatch: match })"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-card-actions>
      <v-layout>
        <v-list-item>
          <v-list-item-avatar tile :size="logoSize">
            <v-img :src="teams[match.home].logo"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ teams[match.home].name }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          ><v-spacer></v-spacer>
          <div class="font-weight-medium primary--text">
            {{ match.score.home }} : {{ match.score.away }}
          </div>
          <v-spacer></v-spacer
        ></v-list-item>
        <v-list-item>
          <v-list-item-avatar tile :size="logoSize">
            <v-img :src="teams[match.away].logo"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ teams[match.away].name }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-layout>

      <v-card-actions>
        <v-btn x-small color="orange lighten-2" text>
          Your friends
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn small icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col class="light-green darken-1 pt-4" cols="4" sm="4">
                <match-bets :matchBets="matchBetsWin"></match-bets>
              </v-col>
              <v-col class="cyan darken-1 pt-4" cols="4" sm="4">
                <match-bets :matchBets="matchBetsDraw"></match-bets>
              </v-col>
              <v-col class="amber darken-1 pt-4" cols="4" sm="4">
                <match-bets :matchBets="matchBetsLose"></match-bets>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="blue-grey darken-1 ">
                <v-layout row wrap>
                  <v-flex
                    class="my-2"
                    xs6
                    md4
                    v-for="matchBet in matchNotBet"
                    :key="matchBet.uid"
                  >
                    <v-layout class="">
                      <v-flex xs5>
                        <user :uid="matchBet.uid" :avOnly="true"></user>
                      </v-flex>
                      <v-flex>
                        <div class="mt-0 font-weight-regular white--text">
                          {{ matchBet.bet.home }}-{{ matchBet.bet.away }}
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-col>
            </v-row>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import matchBets from '../components/matchBets.vue'
import User from '../components/User.vue'
export default {
  props: ['match', 'bet', 'matchBets'],
  components: { matchBets, User },
  name: 'Match',
  data() {
    return {
      show: false,
      matchBetsWin: [],
      matchBetsLose: [],
      matchBetsDraw: [],
      matchNotBet: []
    }
  },
  created() {
    this.getLegalName({ uid: this.uid })
    this.matchBetsWin = this.matchBets.filter(
      matchBet =>
        matchBet.bet.home !== '-' &&
        Number(matchBet.bet.home) > Number(matchBet.bet.away)
    )
    this.matchBetsLose = this.matchBets.filter(
      matchBet =>
        matchBet.bet.home !== '-' &&
        Number(matchBet.bet.home) < Number(matchBet.bet.away)
    )
    this.matchBetsDraw = this.matchBets.filter(
      matchBet =>
        matchBet.bet.home !== '-' &&
        Number(matchBet.bet.home) === Number(matchBet.bet.away)
    )
    this.matchNotBet = this.matchBets.filter(
      matchBet => matchBet.bet.home === '-' || matchBet.bet.away === '-'
    )
  },
  watch: {
    matchBets() {
      this.matchBetsWin = this.matchBets.filter(
        matchBet =>
          matchBet.bet.home !== '-' &&
          Number(matchBet.bet.home) > Number(matchBet.bet.away)
      )
      this.matchBetsLose = this.matchBets.filter(
        matchBet =>
          matchBet.bet.home !== '-' &&
          Number(matchBet.bet.home) < Number(matchBet.bet.away)
      )
      this.matchBetsDraw = this.matchBets.filter(
        matchBet =>
          matchBet.bet.home !== '-' &&
          Number(matchBet.bet.home) === Number(matchBet.bet.away)
      )
      this.matchNotBet = this.matchBets.filter(
        matchBet => matchBet.bet.home === '-' || matchBet.bet.away === '-'
      )
    }
  },
  computed: {
    ...mapGetters({
      teams: 'app/teams',
      bets: 'app/bets',
      uid: 'auth/uid',
      tab: 'app/tab',
      avatar: 'auth/avatar',
      legalName: 'auth/legalName'
    }),
    logoSize: function() {
      return this.$vuetify.breakpoint.name === 'xs' ? 24 : 40
    },
    iconColor: function() {
      return this.match.status === 'NOT STARTED'
        ? 'green accent-3'
        : 'blue-grey lighten-3'
    },
    iRound: function() {
      return this.match.table.length === 1 ? 'Group' : ''
    }
    // matchBetsWin: function() {
    //   return this.matchBets.filter(
    //     (matchBet) =>
    //       matchBet.bet.home !== '-' &&
    //       Number(matchBet.bet.home) > Number(matchBet.bet.away)
    //   )
    // },
    // matchBetsLose: function() {
    //   return this.matchBets.filter(
    //     (matchBet) =>
    //       matchBet.bet.home !== '-' &&
    //       Number(matchBet.bet.home) < Number(matchBet.bet.away)
    //   )
    // },
    // matchBetsDraw: function() {
    //   return this.matchBets.filter(
    //     (matchBet) =>
    //       matchBet.bet.home !== '-' &&
    //       Number(matchBet.bet.home) === Number(matchBet.bet.away)
    //   )
    // },
    // matchNotBet: function() {
    //   return this.matchBets.filter(
    //     (matchBet) => matchBet.bet.home === '-' || matchBet.bet.away === '-'
    //   )
    // }
  },
  methods: {
    ...mapActions({
      setDialog: 'app/setDialog',
      getLegalName: 'auth/getLegalName'
    })
  }
}
</script>
