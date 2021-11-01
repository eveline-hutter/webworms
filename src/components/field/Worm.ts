import FieldRef from "@/components/field/FieldRef";

export default interface Worm {
    fieldRef: FieldRef
    userId: number,
    maxHealth: number,
    health: number,
    weaponDamage: number,
}