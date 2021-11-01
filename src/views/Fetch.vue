<template>
  <v-container>
    <v-row>
      <v-col>
        <bread-crumbs value="create" />
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col>
        <v-card>
          <v-card-text>
            <v-data-table
                :headers="headers"
                :items="getGames"
            >
              <template v-slot:item.actions="{ item }">
                  <v-icon @click="join(item)" color="primary" v-text="'mdi-play'"/>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {mapGetters} from "vuex";
import Vue from "vue";
import ProtocolType from "@/components/protocol/ProtocolType";
import Game from "@/components/game/Game";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";

export default Vue.extend({
  components: {BreadCrumbs},
  data() {
    return {
      headers: [
        {text: 'name', value: 'arena.name'},
        { text: 'maxWorms', value: 'maxWorms' },
        { text: 'roundDuration', value: 'roundDuration' },
        { text: 'status', value: 'status' },
        { text: 'actions', value: 'actions' },
      ],
    }
  },

  computed: {
    ...mapGetters(["getGames", "getClient"])
  },

  methods: {
    join(game: Game): void {
      this.getClient.request({type: ProtocolType.JOIN, gameId: game.id})
    }
  },

  created() {
    this.getClient.request({type: ProtocolType.FETCH});
  }
});
</script>