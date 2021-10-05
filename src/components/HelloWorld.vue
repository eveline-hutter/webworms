<template>
  <v-container fluid>
    <v-row>
      <v-spacer />
      <v-col>

        <v-card color="red" :height="clientHeight" :width="clientWidth">
              <v-row dense no-gutters v-for="i in rowFieldCount" :key="i" >
                <v-col v-for="i in columnFieldCount" :key="i">
                  <v-img
                      contain
                      :height="fieldSize"
                      :width="fieldSize"
                      :src="require('../assets/logo.svg')"/>
                </v-col>
              </v-row>
        </v-card>

      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    computed: {
    rowFieldCount(): number {
      return 20;
    },
      columnFieldCount(): number {
        return Math.floor(this.rowFieldCount * this.sizeRatio);
      },
    sizeRatio(): number {
      return this.clientWidth / this.clientHeight;
    },
      clientHeight(): number {
      return document.documentElement.clientHeight - 50;
      },
      clientWidth(): number {
      return document.documentElement.clientWidth;
      },
    screenSize(): number {
      return Math.min(this.clientWidth, this.clientHeight);
    },
      fieldSize(): number {
      const calculatedSize = this.screenSize / this.rowFieldCount;
      return Math.floor(calculatedSize);
      }
    }
  });
</script>
