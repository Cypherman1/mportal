<template>
  <div class="text-center">
    <v-snackbar :value="snack.visible" top :color="snack.color" :timeout="-1">
      {{ snack.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="setSnack({ visible: false })"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      snack: 'app/snack'
    })
  },
  methods: {
    ...mapActions({
      setSnack: 'app/setSnack'
    })
  }
}
</script>
