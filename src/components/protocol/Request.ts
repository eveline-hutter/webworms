import ProtocolType from "@/components/protocol/ProtocolType";
import Action from "@/components/game/Action";
import Direction from "@/components/game/Direction";
import Arena from "@/components/game/Arena";

export default interface Request {
    type: ProtocolType,
    action?: Action,
    direction?: Direction,
    message?: string,
    maxWorms?: number,
    roundDuration?: number,
    arena?: Arena,
    gameId?: number,
}
