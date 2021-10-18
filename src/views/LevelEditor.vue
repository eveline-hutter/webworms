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
              <v-img contain :src="resourceDictionary.loadResource(selectedBackground).path()">
                <v-container>
                  <v-row v-for="(fieldArray, rowIndex) in fieldFactory.getFields()" :key="rowIndex" no-gutters dense>
                    <v-col v-for="(field, columnIndex) in fieldFactory.getFields()[rowIndex]" :key="columnIndex" cols="1">
                      <v-menu rounded="xl" max-height="400" max-width="300" offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-img
                              v-if="field.obstacle"
                              v-bind="attrs"
                              v-on="on"
                              :src="resourceDictionary.loadResource(field.obstacle.resourceId).path()"
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
                                <v-col v-for="(westernHouse, index) in resourceDictionary.getWesternHouses()" :key="index">
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
                                <v-col v-for="(woodenHouse, index) in resourceDictionary.getWoodenHouses()" :key="index">
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
                      :items="resourceDictionary.getBackgrounds()"
                      item-text="id"
                      item-value="id"
                      label="background"
                      rounded
                      outlined
                  />
                </v-col>
              </v-row>

              <v-row>

                <!--

                todo: load already created levels to edit them!

                -->

              </v-row>

              <v-row justify="space-between">

                  <v-btn color="error">
                    cancel
                  </v-btn>

                  <v-btn @click="saveLevel" color="primary">
                    save
                  </v-btn>

              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import FieldFactory from "@/components/field/FieldFactory";
import ResourceDictionary from "@/assets/ResourceDictionary";

export default Vue.extend({
  data() {
    return {
      name: '',
      fieldFactory: new FieldFactory(12, 12),
      selectedBackground: 'background_forest',
      breadCrumbs: [
      {text: 'Home', disabled: false, href: '/' },
      {text: 'Level-Editor', disabled: true, href: '/level-editor'}
    ]
    }
  },

  props: {
    resourceDictionary: {
      type: Object as PropType<ResourceDictionary>,
      required: true
    }
  },

  methods: {
    saveLevel(): void {
      const levelJson = this.fieldFactory.makeJson(this.name, this.selectedBackground);

      //let levels = localStorage.getItem("levels");
      //levels = JSON.parse(levels);

      localStorage.setItem("levels", levelJson)

      console.log(levelJson)
    }
  },

  created(): void {
    this.fieldFactory.makeFields();
  }
})
</script>
