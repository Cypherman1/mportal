<template>
  <v-row justify="center">
    <v-dialog :value="changePasswdDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Change Password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="pcform">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    @change="onDisplayNameChange"
                    :value="displayName"
                    label="Display name"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Your legal name"
                    @change="onLegalNameChange"
                    :rules="legalNameRules"
                    :value="legalName"
                    :readonly="legalNameExist"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="email"
                    label="Email"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Password"
                    type="password"
                    value="123456"
                    append-icon="mdi-pencil"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="setProfileDialog(false)">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="updateProfile"
            :loading="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      eLegalName: '',
      eDisplayName: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      legalNameRules: [
        (v) => !!v || 'Name is required',
        (v) =>
          (v && v.length <= 25) || 'Legal name must be less than 25 characters'
      ]
    }
  },

  computed: {
    ...mapGetters({
      changePasswdDialog: 'auth/changePasswdDialog',
      profileDialog: 'auth/profileDialog',
      avatar: 'auth/avatar',
      displayName: 'auth/displayName',
      legalName: 'auth/legalName',
      email: 'auth/email',
      uid: 'auth/uid',
      loading: 'auth/loading'
    }),
    legalNameExist() {
      if (this.legalName) return true
      return false
    }
  },
  methods: {
    ...mapActions({
      setChangePasswdDialog: 'auth/setChangePasswordDialog',
      setProfileDialog: 'auth/setProfileDialog',
      updateInfo: 'auth/updateInfo',
      getLegalName: 'app/getLegalName',
      setDisplayName: 'auth/setDisplayName',
      setLegalName: 'auth/setLegalName'
    }),
    onDisplayNameChange(val) {
      this.setDisplayName(val)
    },
    onLegalNameChange(val) {
      this.setLegalName(val)
    },
    updateProfile() {
      if (this.$refs.pform.validate()) {
        console.log(this.legalName)
        this.updateInfo({
          uid: this.uid,
          legalName: this.legalName,
          displayName: this.displayName
        })
      }
    }
  }
}
</script>
