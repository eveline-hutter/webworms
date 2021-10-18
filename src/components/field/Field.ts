import FieldRef from "@/components/field/FieldRef";
import Obstacle from "@/components/field/Obstacle";
import Worm from "@/components/field/Worm";

export default interface Field {
    fieldRef: FieldRef,
    obstacle: Obstacle | null,
    worm: Worm | null,
}