<template>
  <div class="card vue-avatar-cropper-demo text-center">
    <div class="card-body">
      <div>
        <v-avatar size="50">
          <img v-if="!loading" :src="avatar" />
          <v-progress-circular
            v-if="loading"
            :size="50"
            color="primary"
            indeterminate
            class="card-img avatar"
          ></v-progress-circular>
        </v-avatar>
      </div>
      <div>
        <v-btn text color="primary" x-small id="pick-avatar">
          Change
        </v-btn>
      </div>
    </div>
    <avatar-cropper
      @uploading="handleUploading"
      @uploaded="handleUploaded"
      @completed="handleCompleted"
      @error="handlerError"
      :labels="{ submit: 'OK', cancel: 'Cancel' }"
      trigger="#pick-avatar"
      upload-url="https://demo.overtrue.me/upload.php"
    />
  </div>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { AvatarCropper },
  data() {
    return {
      message: 'ready',
      user: {
        id: 1,
        nickname: '安正超',
        username: 'overtrue',
        avatar: 'https://avatars0.githubusercontent.com/u/1472352?s=460&v=4'
      }
    }
  },
  computed: {
    ...mapGetters({
      avatar: 'auth/avatar',
      uid: 'auth/uid',
      loading: 'auth/loading'
    })
  },

  methods: {
    ...mapActions({
      uploadAvatar: 'auth/uploadAvatar'
    }),
    handleUploading(form, xhr) {
      for (var pair of form.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      this.uploadAvatar({ uid: this.uid, avatar: pair[1] })
      // form.entries.map((pair) => console.log(pair[0]))
      // this.message = 'uploading...'
    },
    handleUploaded(response) {
      if (response.status === 'success') {
        this.user.avatar =
          'https://github.githubassets.com/images/modules/site/home/globe.jpg'
        // Maybe you need call vuex action to
        // update user avatar, for example:
        // this.$dispatch('updateUser', {avatar: response.url})
        this.message = 'user avatar updated.'
      }
    },
    handleCompleted(response, form, xhr) {
      this.message = 'upload completed.'
    },
    handlerError(message, type, xhr) {
      this.message = 'Oops! Something went wrong...'
    }
  }
}
</script>

<style>
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}
.avatar {
  width: 80px;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
}
.card-img-overlay {
  display: none;
  transition: all 0.5s;
}
.card-img-overlay button {
  margin-top: 20vh;
}
.card:hover .card-img-overlay {
  display: block;
}
</style>
