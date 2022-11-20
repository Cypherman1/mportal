<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="450px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Your choise</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="bForm">
              <v-row>
                <!-- <v-list-item>
                  <v-list-item-avatar tile :size="50">
                    <v-img v-if="e1.logo" :src="e1.logo"></v-img>
                    <v-icon v-if="!e1.logo" x-large color="green darken-2">
                      mdi-account-question
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      ><v-select
                        v-model="e1"
                        :items="matchTeams"
                        item-text="name"
                        item-vaule="logo"
                        menu-props="auto"
                        label="Select a team"
                        hide-details
                        single-line
                        return-object
                        @change="onSelect"
                      ></v-select>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :label="teams[currentMatch.home].name"
                    required
                    :rules="nameRules"
                    v-model="home"
                    type="number"
                    @focus="!isMobile ? $event.target.select() : ''"
                  >
                    <template v-slot:prepend>
                      <img
                        :width="logoSize.width"
                        :height="logoSize.height"
                        :src="teams[currentMatch.home].logo"
                      />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :label="teams[currentMatch.away].name"
                    required
                    :rules="nameRules"
                    v-model="away"
                    type="number"
                    @focus="!isMobile ? $event.target.select() : ''"
                  >
                    <template v-slot:prepend>
                      <img
                        :width="logoSize.width"
                        :height="logoSize.height"
                        :src="teams[currentMatch.away].logo"
                      /> </template
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click.stop.prevent="setDialog({ dialog: false, currentMatch })"
          >
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click.stop.prevent="onSaveHandler">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BetDialog',
  data: () => ({
    e1: '',
    away: 0,
    home: 0,
    nameRules: [
      v => !!v || 'Number is required',
      v =>
        (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) ||
        'Number has to be between 0 and 999'
    ]
  }),

  computed: {
    ...mapGetters({
      dialog: 'app/dialog',
      currentMatch: 'app/currentMatch',
      teams: 'app/teams',
      uid: 'auth/uid'
    }),
    logoSize: function() {
      return this.$vuetify.breakpoint.name === 'xs'
        ? { width: 36, height: 36 }
        : { width: 40, height: 40 }
    },
    isMobile: function() {
      return this.$vuetify.breakpoint.name === 'xs'
    },
    matchTeams: function() {
      return [
        { ...this.teams[this.currentMatch.home], chose: 'home' },
        { ...this.teams[this.currentMatch.away], chose: 'away' }
      ]
    }
  },
  methods: {
    ...mapActions({
      setDialog: 'app/setDialog',
      addBet: 'app/addBet'
    }),
    onSelect() {
      console.log(this.e1)
      if (this.e1.chose === 'home') {
        this.home = 10
        this.away = 0
      } else {
        this.home = 0
        this.away = 10
      }
    },
    onSaveHandler() {
      if (this.$refs.bForm.validate()) {
        this.addBet({
          uid: this.uid,
          matchId: this.currentMatch.id,
          home: this.home,
          away: this.away,
          name: ''
        })
        this.setDialog({ dialog: false, currentMatch: this.currentMatch })
        this.away = 0
        this.home = 0
        this.e1 = ''
      }
    }
  }
}
</script>
