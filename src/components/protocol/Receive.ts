import ProtocolType from "@/components/protocol/ProtocolType";
import Arena from "@/components/game/Arena";

import User from "@/components/user/User";
import Field from "@/components/field/Field";
import Worm from "@/components/field/Worm";
import Game from "@/components/game/Game";

export default interface Receive {
    type: ProtocolType,
    message?: string,
    wormsCount?: number,
    roundDuration?: number,
    arena?: Arena,
    gameName?: string,
    gameId?: number,
    games?: Game[],
    game?: Game,
    user?: User,
    fields?: Field[],
    worm?: Worm,
}
