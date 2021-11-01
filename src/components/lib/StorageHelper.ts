import Arena from "@/components/game/Arena";

export default class StorageHelper {
    storeArena(arena: Arena): void {
        const arenas = this.getArenas();
        arenas.push(arena);
        localStorage.setItem("arenas", JSON.stringify(arenas));
    }

    getArenas(): Arena[] {
        let arenas;
        const arenasJson = localStorage.getItem("arenas") as string;

        if (!arenasJson)
            arenas = [] as Arena[];
        else
            arenas = JSON.parse(arenasJson) as Arena[];

        return arenas;
    }
}