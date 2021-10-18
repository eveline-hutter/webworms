<template>
  <v-app v-if="socket.isSetup">
    <v-app-bar
        app
        color="primary"
        dark
        rounded="xl"
    >
      <v-toolbar-title>WebWorms</v-toolbar-title>
      <v-spacer></v-spacer>
      <chat :socket="socket" />
    </v-app-bar>
    <v-main>
      <router-view
          :socket="socket"
          :resource-dictionary="resourceDictionary"
      />
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
import Chat from "@/components/chat/Chat.vue";
import Socket from "@/components/socket/Socket";
import {mapGetters} from "vuex";
import ResourceDictionary from "@/assets/ResourceDictionary";

export default Vue.extend({
  components: {
    Chat
  },

  data() {
    return {
      socket: new Socket(),
      resourceDictionary: new ResourceDictionary(),
    }
  },

  computed: {
    ...mapGetters(["getError"])
  },

  created() {
    this.socket.setupSocket();
  }
});
</script>
