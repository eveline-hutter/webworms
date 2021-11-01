import store from "@/store";
import Receive from "@/components/protocol/Receive";
import ProtocolType from "@/components/protocol/ProtocolType";
import Request from "@/components/protocol/Request";

export default class Client {
    private readonly _socket: WebSocket;

    constructor() {
        this._socket = new WebSocket("ws://localhost:8080/");
        this._socket.onopen = () => store.dispatch("setup", true);
        this._socket.onmessage = this.receive;
    }

    public request(request: Request): void {
        this._socket.send(JSON.stringify(request));
    }

    private receive(message: MessageEvent<string>): void {
        const receive = JSON.parse(message.data) as Receive;

        if (receive.type == ProtocolType.ACTION)
            store.dispatch("action", receive)
        else if (receive.type == ProtocolType.MESSAGE)
            store.dispatch("message", receive)
        else if (receive.type == ProtocolType.JOIN)
            store.dispatch("join", receive)
        else if (receive.type == ProtocolType.CREATE)
            store.dispatch("create", receive)
        else if (receive.type == ProtocolType.FETCH)
            store.dispatch("fetch", receive)
        else
            store.dispatch("error", "unknown message")
    }
}