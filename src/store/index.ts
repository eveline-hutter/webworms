import Vue from 'vue'
import Vuex from 'vuex'
import Chat from "@/components/chat/Chat.ts";
import Field from "@/components/field/Field";
import Game from "@/components/game/Game";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arena: [] as Field[][],
    chats: [] as Chat[],
    availableGames: [] as Game[],
    error: {
      hidden: true,
      text: ''
    }
  },
  getters: {
    getArena: state => state.arena,
    getChats: state => state.chats,
    getAvailableGames: state => state.availableGames,
    getError: state => state.error,
  },
  mutations: {
    setArena(state, arena: Field[][]) {
      state.arena = arena;
    },
    setFields(state, fields: Field[]) {
      fields.forEach(field => {
        const row = field.fieldRef.row;
        const column = field.fieldRef.column;
        state.arena[row][column] = field;
      });
    },
    setAvailableGames(state, games: Game[]) {
      state.availableGames = games;
    },
    addChat(state, chat: Chat): void {
      state.chats.push(chat);
    },
    error(state, message) {
      state.error.text = message;
      state.error.hidden = false;
    }
  },
  actions: {
    setArena(context, arena: Field[][]) {
      context.commit("setArena", arena);
    },
    setFields(context, fields: Field[]) {
      context.commit("setFields", fields);
    },
    setAvailableGames(context, games: Game[]) {
      context.commit("setAvailableGames", games);
    },
    addChat(context, chat: Chat): void {
      console.log(chat)
      context.commit("addChat", chat);
    },
    error(context, message: string) {
      context.commit("error", message);
    }
  },
})
