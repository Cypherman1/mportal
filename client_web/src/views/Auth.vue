<template>
  <v-container fluid style="height: 100%">
    <v-row justify="center" class="fill-height">
      <v-col cols="12" sm="6" md="6">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8" class="px-7">
                  <v-card-text class="mt-3">
                    <h1 class="text-center display-2 primary--text">
                      Sign in
                    </h1>
                    <div class="text-center mt-4">
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-facebook-f</v-icon>
                      </v-btn>

                      <v-btn
                        class="mx-2"
                        fab
                        color="black"
                        outlined
                        @click="googleSignIn"
                      >
                        <v-icon>fab fa-google-plus-g</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>fab fa-linkedin-in</v-icon>
                      </v-btn>
                    </div>
                    <h4 class="text-center mt-4">
                      Ensure your email for registration
                    </h4>
                    <form @submit.prevent="onSignin">
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="text"
                        color="accent"
                        v-model="signinForm.email"
                        @focus="closeErrorMessage"
                      />

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        color="accent"
                        v-model="signinForm.password"
                        @focus="closeErrorMessage"
                        @keyup.enter="onSignin"
                      />
                    </form>
                  </v-card-text>
                  <v-alert
                    dense
                    outlined
                    type="error"
                    dismissible
                    v-model="alert"
                  >
                    {{ errorMessage }}
                  </v-alert>
                  <div class="text-center mt-3 mb-7">
                    <v-btn
                      rounded
                      color="primary"
                      :loading="loading"
                      dark
                      @click="onSignin"
                      >SIGN IN</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="primary">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Hello, Friend!</h1>
                    <h5 class="text-center">
                      Enter your personal details and start journay with us
                    </h5>
                  </v-card-text>
                  <div class="text-center mb-12">
                    <v-btn rounded outlined dark @click="onSignupSwitch"
                      >SIGN UP</v-btn
                    >
                    <h4 class="text-center white--text mt-4">
                      <v-btn
                        x-small
                        color="secondary"
                        dark
                        @click="forgotPasswordHandler"
                      >
                        Forgot your password ?
                      </v-btn>
                    </h4>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="primary">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Welcome Back!</h1>
                    <h5 class="text-center">
                      To Keep connected with us please login with your personnel
                      info
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="onSigninSwitch"
                      >Sign in</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="px-7">
                  <v-card-text class="mt-3">
                    <h1 class="text-center display-1 primary--text">
                      Create Account
                    </h1>

                    <h4 class="text-center mt-4"></h4>
                    <v-form ref="uForm">
                      <v-file-input
                        @change="Preview_image"
                        v-model="image"
                        style="display:none"
                        ref="fileInput"
                        accept="image/png, image/jpeg, image/bmp"
                      >
                      </v-file-input>

                      <v-text-field
                        label="Name"
                        name="Name"
                        prepend-icon="mdi-account"
                        type="text"
                        color="accent"
                        v-model="signupForm.name"
                        :rules="nameRules"
                        @focus="closeErrorMessage"
                      />
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="text"
                        color="accent"
                        v-model="signupForm.email"
                        :rules="emailRules"
                        @focus="closeErrorMessage"
                      />
                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        color="accent"
                        v-model="signupForm.password"
                        :rules="passwordRules"
                        @focus="closeErrorMessage"
                      />
                      <v-text-field
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        prepend-icon="mdi-lock"
                        type="password"
                        color="accent"
                        v-model="signupForm.confirmPassword"
                        :rules="confirmPasswordRules"
                        @focus="closeErrorMessage"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-3 mb-7">
                    <v-alert
                      dense
                      outlined
                      type="error"
                      v-model="alert"
                      dismissible
                    >
                      {{ errorMessage }}
                    </v-alert>
                    <v-btn
                      rounded
                      color="primary"
                      :loading="loading"
                      dark
                      @click="onSignup"
                      >SIGN UP</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="3">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="primary">
                  <v-card-text class="white--text mt-12"> </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step = 1"
                      >Sign in</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="px-7">
                  <h1 class="text-center mt-8 display-1 primary--text">
                    Reset password
                  </h1>
                  <v-card-text class="mt-3">
                    <v-form ref="uForm">
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="text"
                        color="accent"
                        v-model="email"
                        :rules="emailRules"
                        @focus="closeErrorMessage"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-3 mb-7">
                    <v-alert
                      dense
                      outlined
                      type="error"
                      v-model="alert"
                      dismissible
                    >
                      {{ errorMessage }}
                    </v-alert>
                    <v-btn
                      rounded
                      color="primary"
                      :loading="loading"
                      dark
                      @click="onSendEmail"
                      >Send Email</v-btn
                    >
                    <div class=" mt-2 green--text text center">
                      {{ emailSent }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <set-change-passwd-dialog></set-change-passwd-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import setChangePasswdDialog from '../components/changePasswdDialog.vue'
import image from '../assets/Avatar0.png'
// import AvatarUpload from '../components/AvatarUpload.vue'
export default {
  components: { setChangePasswdDialog },
  data: () => ({
    email: '',
    url: image,
    image: null,
    step: 1,
    signinForm: {
      email: '',
      password: ''
    },
    signupForm: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    avatarRules: [(v) => !!v || 'Avatar is required'],
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
    ]
  }),
  props: {
    source: String
  },
  computed: {
    ...mapGetters({
      uid: 'auth/uid',
      loading: 'auth/loading',
      errorMessage: 'auth/errorMessage',
      alert: 'auth/alert',
      emailSent: 'auth/emailSent'
    }),
    confirmPasswordRules() {
      return (
        [
          (v) => !!v || 'Confirm password is required',
          (v) => v === this.signupForm.password
        ] || 'Password do not match!'
      )
    }
  },
  watch: {
    uid(value) {
      if (value) {
        this.$router.push({ path: '/' })
      }
    }
  },
  methods: {
    ...mapActions({
      signUserUp: 'auth/signUserUp',
      signUserIn: 'auth/signUserIn',
      closeErrorMessage: 'auth/closeErrorMessage',
      signOut: 'auth/signOut',
      googleSignIn: 'auth/googleSignIn',
      setChangePasswdDialog: 'auth/setChangePasswdDialog',
      autoSignIn: 'auth/autoSignIn',
      sendEmail: 'auth/sendEmail',
      setSentEmail: 'auth/setSentEmail'
    }),
    onPickFile() {
      this.$refs.fileInput.$refs.input.click()
    },
    Preview_image(e) {
      this.url = URL.createObjectURL(this.image)
    },
    onSignup() {
      // console.log(
      //   this.image.name.split('.')[this.image.name.split('.').length - 1]
      // )
      if (this.$refs.uForm.validate()) {
        this.signUserUp({
          email: this.signupForm.email,
          password: this.signupForm.password,
          avatar: this.image,
          name: this.signupForm.name
        })
      }
    },
    onSignin() {
      this.signUserIn({
        email: this.signinForm.email,
        password: this.signinForm.password
      })
    },
    onSigninSwitch() {
      this.closeErrorMessage()
      this.step--
    },
    onSignupSwitch() {
      this.closeErrorMessage()
      this.step++
    },
    onSendEmail() {
      this.sendEmail(this.email)
    },
    forgotPasswordHandler() {
      this.step = 3
      this.setSentEmail('')
    }
  }
}
</script>
