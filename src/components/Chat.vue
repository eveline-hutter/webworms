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
          <v-list v-if="messages.length > 0">
            <v-list-item v-for="(message, index) in messages" :key="index">
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
                    BennyWorm:
                    <br/>
                    {{ message.text }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>{{ message.date }}</v-list-item-subtitle>
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

export default Vue.extend({
  data() {
    const socket = new WebSocket("ws://localhost:8080/chats/talk");
    const messages: {text: string, date: string}[] = [];
    const message = '';
    const badge = false;
    const menu = false;

    return {
      socket,
      messages,
      message,
      badge,
      menu
    }
  },

  methods: {
    handleMessage(message: string): void {
      this.messages.push({text:message, date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`});
      if (!this.menu) this.badge = true;
    },
    sendMessage(): void {
      this.socket.send(this.message);
    }
  },

  created() {
    this.socket.onmessage = (message) => this.handleMessage(message.data);
  }
});
</script>