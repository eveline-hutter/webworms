<template>
  <v-container>
    <v-row>
      <v-col>
        <v-breadcrumbs
            large
            :items="breadCrumbs"
        ></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
          <v-card rounded="xl" elevation="10">
            <v-card-text>
              <v-img contain :src="selectedBackground">
                <v-container>
                  <v-row v-for="row in rowCount" :key="row" no-gutters dense>
                    <v-col v-for="column in columnCount" :key="column" cols="1">
                      <v-icon
                          v-if="selectedField === getField(row, column)"
                          v-text="'mdi-pencil'"
                          class="ml-2 mt-2"
                          color="red"
                      />
                      <v-img
                        v-else
                        @click="selectedField = getField(row, column)"
                        :src="getField(row, column).obstacle.resource"
                        contain
                      />
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
                    v-model="selectedBackground"
                    :items="backgrounds"
                    item-text="text"
                    item-value="resource"
                    label="background"
                    rounded
                    outlined
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <h2 v-text="'objects'" />
              </v-col>

              <v-col>
                <v-expansion-panels accordion>
                  <v-expansion-panel>

                    <!-- Trees -->

                    <v-expansion-panel-header v-text="'trees'" />
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12">
                          <v-subheader v-text="'winter'" />
                        </v-col>

                        <v-col v-for="(winterTree, index) in fileDictionary.getWinterTrees()" :key="index">
                          <v-card
                              @click="changeResource(winterTree.resource)"
                              height="50"
                              width="50"
                              class="mx-1 mt-1 mb-1">
                            <v-card-text>
                              <v-img contain aspect-ratio="1" :src="winterTree.resource" />
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>

                  <v-expansion-panel-header v-text="'westernHouses'" />
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col v-for="(westernHouse, index) in fileDictionary.getWesternHouses()" :key="index">
                        <v-card
                            @click="changeResource(westernHouse.resource)"
                            height="50"
                            width="50"
                            class="mx-1 mt-1 mb-1">
                          <v-card-text>
                            <v-img contain aspect-ratio="1" :src="westernHouse.resource" />
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>

                  </v-expansion-panel-content>

                  </v-expansion-panel>

                  <v-expansion-panel>

                  <v-expansion-panel-header v-text="'woodenHouses'" />
                  <v-expansion-panel-content>
                  <v-row>
                    <v-col v-for="(woodenHouse, index) in fileDictionary.getWoodenHouses()" :key="index">
                      <v-card
                          @click="changeResource(woodenHouse.resource)"
                          height="50"
                          width="50"
                          class="mx-1 mt-1 mb-1">
                        <v-card-text>
                          <v-img contain aspect-ratio="1" :src="woodenHouse.resource" />
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  </v-expansion-panel-content>

                  </v-expansion-panel>

                </v-expansion-panels>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn color="error">
                  cancel
                </v-btn>
              </v-col>
              <v-spacer />
              <v-col>
                <v-btn color="primary">
                  save
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import FieldFactory from "@/components/FieldFactory";
import FileDictionary from "@/assets/FileDictionary";
import Field from "@/components/Field";

export default Vue.extend({
  data() {
    const rowCount = 12;
    const columnCount = 12;
    const fileDictionary = new FileDictionary();
    const fieldFactory = new FieldFactory(rowCount, columnCount);
    const selectedField: Field = {row: 1, column: 1, obstacle: {}}
    const selectedBackground = null;
    const backgrounds = [
      {text: 'snow', resource: require('@/assets/backgrounds/grass_01.png')},
      {text: 'desert', resource: require('@/assets/backgrounds/grass_01.png')},
      {text: 'forest', resource: require('@/assets/backgrounds/grass_01.png')}
    ];
    const breadCrumbs = [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'Level-Editor',
        disabled: true,
        href: '/level-editor',
      }
    ];

    return {
      rowCount,
      columnCount,
      fileDictionary,
      fieldFactory,
      selectedBackground,
      selectedField,
      backgrounds,
      breadCrumbs
    }
  },

  methods: {
    getField(row: number, column: number): Field {
      return this.fieldFactory.getField(row, column);
    },
    changeResource(resource: string): void {
      this.selectedField.obstacle.resource = resource;
      this.selectedField = {row: 0, column: 0, obstacle: {}};
    },
    saveLevel(): void {
      const levelJson = this.fieldFactory.makeJson();
      localStorage.setItem("level", levelJson)

      console.log(levelJson)
    }
  },

  created(): void {
    this.fieldFactory.makeFields();
  }
})
</script>
