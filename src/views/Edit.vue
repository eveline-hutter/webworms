<template>
  <v-container>
    <v-row>
      <v-col>
        <bread-crumbs value="edit" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
          <v-card rounded="xl" elevation="10">
            <v-card-text>
              <v-img contain :src="loadFilePath(selectedBackground)">
                <v-container>
                  <v-row v-for="(_, rowIndex) in fieldFactory.getFields()" :key="rowIndex" no-gutters dense>
                    <v-col v-for="(field, columnIndex) in fieldFactory.getFields()[rowIndex]" :key="columnIndex" cols="1">
                      <v-menu rounded="xl" max-height="400" max-width="300" offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-img
                              v-if="field.obstacle"
                              v-bind="attrs"
                              v-on="on"
                              :src="loadFilePath(field.obstacle.resourceId)"
                              contain
                          />
                          <v-img
                              v-else
                              v-bind="attrs"
                              v-on="on"
                              :src="require('@/assets/placeholder/placeholder.svg')"
                              contain
                          />
                        </template>
                        <v-card>
                          <v-card-text>
                            <v-container>

                              <v-row no-gutters>
                                <v-spacer />
                                <v-btn
                                    @click="field.obstacle = null"
                                    color="error"
                                    rounded
                                >
                                  delete
                                </v-btn>
                              </v-row>

                              <v-row>
                                <v-col cols="12">
                                  <v-subheader v-text="'westernHouse'" />
                                </v-col>
                              </v-row>

                              <v-row>
                                <v-col v-for="(westernHouse, index) in getResourceDictionary.getWesternHouses()" :key="index">
                                  <v-card
                                      @click="fieldFactory.createObstacle(field, westernHouse.id)"
                                      height="50"
                                      width="50"
                                      class="mx-1 mt-1 mb-1">
                                    <v-card-text>
                                      <v-img contain aspect-ratio="1" :src="westernHouse.path()" />
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                              </v-row>

                              <v-row>
                                <v-col cols="12">
                                  <v-subheader v-text="'wooden_house'" />
                                </v-col>
                              </v-row>

                              <v-row>
                                <v-col v-for="(woodenHouse, index) in getResourceDictionary.getWoodenHouses()" :key="index">
                                  <v-card
                                      @click="fieldFactory.createObstacle(field, woodenHouse.id)"
                                      height="50"
                                      width="50"
                                      class="mx-1 mt-1 mb-1">
                                    <v-card-text>
                                      <v-img contain aspect-ratio="1" :src="woodenHouse.path()" />
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                        </v-card>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-img>
            </v-card-text>
          </v-card>
      </v-col>
      <v-col cols="4">
        <v-card rounded="xl" elevation="10">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                      @change="changeArena"
                      :items="getStorageHelper.getArenas()"
                      item-text="name"
                      return-object
                      label="arena"
                      rounded
                      outlined
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                      v-model="name"
                      label="name"
                      rounded
                      outlined
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-select
                      v-model="selectedBackground"
                      :items="getResourceDictionary.getBackgrounds()"
                      item-text="id"
                      item-value="id"
                      label="background"
                      rounded
                      outlined
                  />
                </v-col>
              </v-row>

              <v-row justify="space-between">

                  <v-btn color="error">
                    cancel
                  </v-btn>

                  <v-btn @click="saveArena" color="primary">
                    save
                  </v-btn>

              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-dialog v-model="dialog">
          do you really want to leave the page? you will lost everything!
        </v-dialog>
      </v-col>
      <v-col>
        <v-snackbar v-model="snackbar">
          {{message}}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import FieldFactory from "@/components/field/FieldFactory";
import Arena from "@/components/game/Arena";
import {mapGetters} from "vuex";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";

export default Vue.extend({
  components: {BreadCrumbs},
  data() {
    return {
      message: '',
      snackbar: false,
      dialog: false,
      name: '',
      fieldFactory: new FieldFactory(12, 12),
      selectedBackground: 'background_forest',
    }
  },

  computed: {
    ...mapGetters(["getClient", "getResourceDictionary", "getStorageHelper"])
  },

  methods: {
    loadFilePath(resourceId: string): string {
      return this.getResourceDictionary.loadResource(resourceId).path();
    },
    changeArena(arena: Arena): void {
      this.fieldFactory.setFields(arena.area);
    },
    saveArena(): void {
      const arena = {} as Arena;

      arena.area = this.fieldFactory.getFields();
      arena.name = this.name;
      arena.background = this.selectedBackground;

      this.getStorageHelper.storeArena(arena);

      this.message = "successfully saved!"
      this.snackbar = true;
    }
  },

  created(): void {
    this.fieldFactory.makeFields();
  }
})
</script>
