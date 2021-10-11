<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
        rounded="xl"
    >
      <v-toolbar-title>WebWorms</v-toolbar-title>
      <v-spacer></v-spacer>
      <chat />
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Chat from "@/components/Chat.vue";

export default Vue.extend({
  components: {
    Chat
  },
  data: () => ({}),
});
</script>
