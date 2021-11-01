<template>
<v-container>
  <v-row align="center">
      <v-col>
        <bread-crumbs value="create" />
      </v-col>
  </v-row>
  <v-row justify="space-around">
    <v-card rounded="xl" width="600" height="500" elevation="10">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-select
                  v-model="selectedArena"
                  :items="arenas"
                  item-text="name"
                  label="level"
                  return-object
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  v-model="maxWorms"
                  :items="wormCounts"
                  label="player_count"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  v-model="roundDuration"
                  :items="roundDurations"
                  label="round_duration"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-row class="mx-15 mt-5" justify="space-between">
          <v-btn @click="$router.push('/')" color="error">
            cancel
          </v-btn>
          <v-btn @click="sendCreate" color="primary">
            lets go
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-row>
</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Arena from "@/components/game/Arena";
import Resource from "@/assets/Resource";
import Request from "@/components/protocol/Request";
import ProtocolType from "@/components/protocol/ProtocolType";
import {mapGetters} from "vuex";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";

export default Vue.extend({
  components: {BreadCrumbs},
  data() {
    return {
      wormCounts: [1,2,3,4],
      maxWorms: 2,
      roundDurations: [10,20,30,40],
      roundDuration: 30,
      arenas: [] as Arena[],
      selectedArena: {} as Arena,
    }
  },

  computed: {
    ...mapGetters(["getClient", "getResourceDictionary", "getStorageHelper"])
  },

  methods: {
    sendCreate() {
      const request = {} as Request
      request.type = ProtocolType.CREATE;
      request.arena = this.selectedArena;
      request.maxWorms = this.maxWorms;
      request.roundDuration = this.roundDuration;

      this.getClient.request(request);
    }
  },

  created() {
    const defaultArenas = this.getResourceDictionary
        .getArenas()
        .map((val: Resource) => val.path() as unknown as Arena);

    const customArenas = this.getStorageHelper.getArenas();

    this.arenas = [...defaultArenas, ...customArenas]
    this.selectedArena = this.arenas[0];
  }
});
</script>