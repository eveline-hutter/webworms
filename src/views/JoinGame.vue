<template>
  <v-container>
    <v-row justify="space-around">
      <v-col>
        <v-card>
          <v-card-text>
            <v-data-table
              :items="getAvailableGames"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {mapGetters} from "vuex";
import Vue, {PropType} from "vue";
import Socket from "@/components/socket/Socket";

export default Vue.extend({
  computed: {
    ...mapGetters(["getAvailableGames"])
  },

  props: {
    socket: {
      type: Object as PropType<Socket>,
      required: true
    }
  },

  created() {
    this.socket.sendAvailableGamesRequest();
  }
});
</script>