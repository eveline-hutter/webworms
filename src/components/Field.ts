export default interface Field {
    row: number,
    column: number,
    obstacle: {
        "resource"?: string,
        "treasure"?: {
            "isOpen": boolean
        }
    }
}