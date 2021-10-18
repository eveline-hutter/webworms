import FieldRef from "@/components/field/FieldRef";

export default interface Obstacle {
    fieldRef: FieldRef,
    "resourceId": string,
    "treasure"?: {
        "isOpen": boolean
    }
}