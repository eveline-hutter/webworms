<template>
  <v-app v-if="isSetup">
    <v-app-bar
        app
        color="primary"
        dark
        rounded="xl"
    >
      <v-toolbar-title>WebWorms</v-toolbar-title>
      <v-spacer></v-spacer>
      <message />
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>

    <v-snackbar :value="!getError.hidden" >
      <v-alert v-text="getError.text" />
    </v-snackbar>

  </v-app>

  <v-card v-else>
    <v-card-text>
      {{ 'NO_CONNECTION_TO_SERVER' }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Message from "@/components/message/Message.vue";
import {mapGetters} from "vuex";

export default Vue.extend({
  components: {
    Message
  },

  computed: {
    ...mapGetters(["getError", "isSetup"])
  },
});
</script>
