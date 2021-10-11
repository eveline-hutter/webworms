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
        <v-spacer />
        <v-col>
        <v-card width="500" height="300" rounded="xl">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col >
                  <h1>Settings</h1>
                </v-col>
              </v-row>
              <v-row>

                <v-col>
                  <v-subheader class="mt-1" v-text="'dark mode'" />
                </v-col>
                <v-col>
                  <v-switch v-model="$vuetify.theme.dark"/>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    const breadCrumbs = [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'settings',
        disabled: true,
        href: '/settings',
      }
    ];

    return {
      breadCrumbs
    }
  },

  computed: {
  }
})
</script>
