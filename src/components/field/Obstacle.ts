import FieldRef from "@/components/field/FieldRef";
import Treasure from "@/components/field/Treasure";

export default interface Obstacle {
    fieldRef: FieldRef,
    resourceId: string,
    treasure?: Treasure
}