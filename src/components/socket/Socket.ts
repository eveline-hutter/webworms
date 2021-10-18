import store from "@/store";
import Chat from "@/components/chat/Chat";
import GameSetting from "@/components/game/GameSetting";

export default class Socket {
    private readonly _socket: WebSocket;
    private _setup = false;

    constructor() {
        this._socket = new WebSocket("ws://localhost:8080/");
        this._socket.onopen = () => this._setup = true;
    }

    setupSocket(): void {
        this._socket.onmessage = this.receiver;
    }

    sendChat(message: string): void {
        const chatDto = {chat: {message: message}}
        this._socket.send(JSON.stringify(chatDto));
    }

    sendGameSettings(gameSetting: GameSetting): void {
        this._socket.send(JSON.stringify(gameSetting));
    }

    sendAvailableGamesRequest(): void {
        const request = {requestForAvailableGames: {requestForAvailableGames: true}}
        this._socket.send(JSON.stringify(request))
    }

    receiver(message: MessageEvent<string>): void {
        try {
            const receiver = JSON.parse(message.data);

            console.log(receiver)

            if (receiver.message) {
                const chat = {} as Chat;
                chat.message = receiver.message;
                chat.user = receiver.user;
                chat.dateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

                store.dispatch("addChat", chat)
            }
            else if (receiver.gameSetting)
                store.dispatch("setArena", receiver.gameSetting)
            else if (receiver.fields)
                store.dispatch("setFields", receiver.fields)
            else if (receiver.games)
                store.dispatch("setAvailableGames", receiver.games)
            else
                store.dispatch("error", "unknown message")
        } catch (error) {
            store.dispatch("error", error.message);
        }
    }

    get socket(): WebSocket {
        return this._socket;
    }

    get isSetup(): boolean {
        return this._setup;
    }
}