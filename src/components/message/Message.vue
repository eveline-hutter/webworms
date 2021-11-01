<template>
  <v-menu
      v-model="menu"
      rounded="xl"
      left
      bottom
      :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
          color="green"
          overlap
          dot
          :value="badge"
      >
        <v-btn
            @click="badge = false"
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-chat</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <div>
      <v-card class="overflow-auto" height="400" width="500">
        <v-card-text>
          <v-list v-if="getMessages.length > 0">
            <v-list-item v-for="(message, index) in getMessages" :key="index">
              <v-list-item-avatar>
                <v-avatar
                    color="primary"
                    size="35"
                >
                  <v-icon dark>
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <v-chip label large color="primary">
                    {{ message.user.name }}:
                    <br/>
                    {{ message.message }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>{{ message.dateTime }}</v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list>
            <v-alert v-else type="info">
              No messages has been written so far...
            </v-alert>
        </v-card-text>
      </v-card>

      <v-spacer />
      <v-divider />

      <v-card>
        <v-card-text>
          <v-row class="mt-4">
            <v-col cols="10">
              <v-textarea placeholder="write message..." outlined flat no-resize rounded dense :auto-grow="false" v-model="message" />
            </v-col>
            <v-col cols="2">
              <v-btn class="mt-2" @click="sendMessage" icon>
                <v-icon color="primary" large v-text="'mdi-arrow-right-circle'" />
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
    </div>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";
import Request from "@/components/protocol/Request";
import ProtocolType from "@/components/protocol/ProtocolType";

export default Vue.extend({
  data() {
    return {
      message: '',
      badge: false,
      menu: false
    }
  },

  watch: {
    getMessages(): void {
      if (!this.menu)
        this.badge = true;
    }
  },

  computed: {
    ...mapGetters(["getMessages", "getClient"])
  },

  methods: {
    sendMessage(): void {
      const request = {} as Request;
      request.type = ProtocolType.MESSAGE;
      request.message = this.message
      this.getClient.request(request);

      this.message = '';
    }
  },

});
</script>