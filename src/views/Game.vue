<template>
  <v-container>
    <v-row>
      <v-col>
        <bread-crumbs value="create" />
      </v-col>
    </v-row>

    <v-row v-if="!getGame.id" class="mt-10" align="center" justify="space-around">
      <h1>no game joined</h1>
    </v-row>

    <v-row v-else>
      <v-col cols="2">
        <v-card rounded="xl" elevation="10">
          <v-subheader v-text="'walk'"/>
          <v-card-text>
            <v-container>
              <v-row justify="space-around">
                <v-btn icon @click="move(up)">
                  <v-icon v-text="'mdi-arrow-up'" />
                </v-btn>
              </v-row>
              <v-row justify="space-between">
                <v-btn icon @click="move(left)">
                  <v-icon v-text="'mdi-arrow-left'" />
                </v-btn>
                <v-btn icon @click="move(right)">
                <v-icon v-text="'mdi-arrow-right'" />
              </v-btn>
              </v-row>
              <v-row justify="space-around">
                <v-btn icon @click="move(down)">
                  <v-icon v-text="'mdi-arrow-down'" />
                </v-btn>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card rounded="xl" elevation="10">
          <v-card-text>
            <v-img contain :src="loadFilePath(arena.background)">
              <v-container fluid class="fill-height">
                <v-row v-for="(_, row) in 12" :key="row" no-gutters dense>
                  <v-col v-for="(_, column) in 12" :key="column" cols="1">
                    <div v-if="isVisible">
                      <v-img
                          v-if="area[row][column].obstacle"
                          :src="loadFilePath(area[row][column].obstacle.resourceId)"
                          contain
                      />
                      <v-img
                          v-if="area[row][column].worm"
                          :src="require('@/assets/worms/worm.svg')"
                          contain
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card rounded="xl" elevation="10">
          <v-subheader v-text="'shoot'"/>
          <v-card-text>
            <v-container>
              <v-row justify="space-around">
                <v-btn icon @click="shoot(up)">
                  <v-icon v-text="'mdi-arrow-up'" />
                </v-btn>
              </v-row>
              <v-row justify="space-between">
                <v-btn icon @click="shoot(left)">
                  <v-icon v-text="'mdi-arrow-left'" />
                </v-btn>
                <v-btn icon @click="shoot(right)">
                  <v-icon v-text="'mdi-arrow-right'" />
                </v-btn>
              </v-row>
              <v-row justify="space-around">
                <v-btn icon @click="shoot(down)">
                  <v-icon v-text="'mdi-arrow-down'" />
                </v-btn>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="getGame.id">
      <v-col>
        <v-dialog width="500" v-model="isWaitingForWorms" persistent>
          <v-card height="300" width="500">
            <v-toolbar color="primary">waiting for worms</v-toolbar>
            <v-card-text class="mt-3">
              {{getGame.worms.length}} / {{getGame.maxWorms}} worms joined...
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col>
        <v-dialog v-model="isFinished" persistent>
          game finished!
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from "vuex";
import Direction from "@/components/game/Direction";
import Request from "@/components/protocol/Request";
import ProtocolType from "@/components/protocol/ProtocolType";
import Action from "@/components/game/Action";
import Game from "@/components/game/Game";
import GameStatus from "@/components/game/GameStatus";
import Arena from "@/components/game/Arena";
import Field from "@/components/field/Field";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";

export default Vue.extend({
  components: {BreadCrumbs},
  methods: {
    loadFilePath(resourceId: string): string {
      return this.getResourceDictionary.loadResource(resourceId).path();
    },
    move(direction: Direction): void {
      const request = {} as Request;
      request.type = ProtocolType.ACTION;
      request.action = Action.MOVE;
      request.direction = direction;

      this.getClient.request(request);
    },
    shoot(direction: Direction): void {
      const request = {} as Request;
      request.type = ProtocolType.ACTION;
      request.action = Action.SHOOT;
      request.direction = direction;

      this.getClient.request(request);
    }
  },

  computed: {
    ...mapGetters(["getGame", "getClient", "getResourceDictionary", "isVisible"]),
    arena(): Arena {
      const game = this.getGame as Game;
      return game.arena;
    },
    area(): Field[][] {
      const game = this.getGame as Game;
      return game.arena.area;
    },
    isWaitingForWorms(): boolean {
      const game = this.getGame as Game;
      return game.status === GameStatus.WAITING_FOR_PLAYERS
    },
    isFinished(): boolean {
      const game = this.getGame as Game;
      return game.status === GameStatus.FINISHED;
    },
    up(): Direction {
      return Direction.UP;
    },
    down(): Direction {
      return Direction.DOWN;
    },
    left(): Direction {
      return Direction.LEFT;
    },
    right(): Direction {
      return Direction.RIGHT;
    },
  },
})
</script>
