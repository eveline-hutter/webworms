import Chat from "@/components/chat/Chat";
import Field from "@/components/field/Field";
import Game from "@/components/game/Game";
import GameSetting from "@/components/game/GameSetting";

export default interface Receiver {
    chat: Chat | null,
    fields: Field[] | null,
    availableGames: Game[] | null,
    gameSetting: GameSetting | null,
}