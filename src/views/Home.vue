<template>
  <v-container>
    <v-row class="text-center">
      <v-col >
        <h1>WebWorms</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn rounded to="create" color="primary" width="350" height="50" v-text="'create_game'" />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn rounded to="fetch" color="primary" width="350" height="50" v-text="'join_game'" />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn rounded to="edit" color="primary" width="350" height="50" v-text="'level_editor'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    components: {

    },
  })
</script>
