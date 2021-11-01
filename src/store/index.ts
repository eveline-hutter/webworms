import Vue from 'vue'
import Vuex from 'vuex'
import Message from "@/components/message/Message.ts";
import Game from "@/components/game/Game";
import Receive from "@/components/protocol/Receive";
import User from "@/components/user/User";
import Field from "@/components/field/Field";
import Client from "@/components/client/Client";
import ResourceDictionary from "@/assets/ResourceDictionary";
import StorageHelper from "@/components/lib/StorageHelper";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    client: new Client(),
    resourceDictionary: new ResourceDictionary(),
    storageHelper: new StorageHelper(),
    setup: false,
    visible: true,
    game: {} as Game,
    games: [] as Game[],
    messages: [] as Message[],
    error: {
      hidden: true,
      text: ''
    }
  },

  getters: {
    getClient: state => state.client,
    getResourceDictionary: state => state.resourceDictionary,
    getStorageHelper: state => state.storageHelper,
    isVisible: state => state.visible,
    isSetup: state => state.setup,
    getGame: state => state.game,
    getGames: state => state.games,
    getMessages: state => state.messages,
    getError: state => state.error,
  },

  mutations: {
    action(state, fields: Field[]): void {
      state.visible = false;

      fields.forEach(field => {
        const row = field.fieldRef.row;
        const column = field.fieldRef.column;
        state.game.arena.area[row][column] = field;
      });

      state.visible = true;
    },
    message(state, message: Message): void {
      state.messages.push(message);
    },
    join(state, game: Game): void {
      state.game = game;
    },
    create(state, game: Game): void {
      state.game = game;
    },
    fetch(state, games: Game[]): void {
      state.games = games;
    },
    setup(state, value: boolean): void {
      state.setup = value;
    },
    error(state, message): void {
      state.error.text = message;
      state.error.hidden = false;
    }
  },

  actions: {
    action(context, receive: Receive): void {
      context.commit("action", receive.fields);
    },
    message(context, receive: Receive): void {
      const message = {} as Message;
      message.message = receive.message as string;
      message.user = receive.user as User;
      message.dateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
      context.commit("message", message);
    },
    join(context, receive: Receive): void {
      context.commit("join", receive.game);
      if (router.currentRoute.name !== "game")
        router.push("/game")
    },
    create(context, receive: Receive): void {
      context.commit("create", receive.game);
      if (router.currentRoute.name !== "game")
        router.push("/game")
    },
    fetch(context, receive: Receive): void {
      context.commit("fetch", receive.games)
    },
    setup(context, value: boolean): void {
      context.commit("setup", value);
    },
    error(context, message: string): void {
      context.commit("error", message);
    }
  },
})
