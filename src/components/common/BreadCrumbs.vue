<template>
  <v-row align="center" class="mt-2 mb-2">
    <v-btn @click="$router.push('/')" color="primary" text>
      Home
    </v-btn>
    /
    <v-btn disabled text>
      {{value}}
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    }
  }
});
</script>