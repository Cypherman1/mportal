<template>
  <v-layout row wrap>
    <v-flex class="my-1" xs12 v-for="matchBet in matchBets" :key="matchBet.uid">
      <v-layout class="">
        <v-flex xs5 mt-1>
          <user :uid="matchBet.uid" :avOnly="true"></user>
        </v-flex>
        <v-flex>
          <div class="font-weight-bold white--text ">
            {{ matchBet.bet.home }}-{{ matchBet.bet.away }}
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import User from './/User.vue'
export default {
  props: ['matchBets'],
  components: { User },
  data() {
    return {}
  }
}
</script>
