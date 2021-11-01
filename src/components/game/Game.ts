import Arena from "@/components/game/Arena";
import Worm from "@/components/field/Worm";
import GameStatus from "@/components/game/GameStatus";

export default interface Game {
    arena: Arena,
    maxWorms: number,
    roundDuration: number,
    worms: Worm[],
    id: number,
    status: GameStatus,
}