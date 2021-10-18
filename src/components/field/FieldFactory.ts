import Field from "@/components/field/Field";
import Level from "@/components/level/Level";

export default class FieldFactory {
    private fields: Field[][] = [];
    private readonly rows: number;
    private readonly columns: number;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
    }

    makeFields(): void {
        for(let row = 0; row < this.rows; row++) {
            this.fields[row] = [];
            for(let column = 0; column < this.columns; column++) {
                this.fields[row][column] = {fieldRef: {row, column}, worm: null, obstacle: null};
            }
        }
    }

    getField(row: number, column: number): Field {
        return this.fields[row][column];
    }

    createObstacle(field: Field, resourceId: string): void {
        this.fields[field.fieldRef.row][field.fieldRef.column].obstacle = {
            fieldRef: field.fieldRef,
            resourceId: resourceId
        };
    }

    getFields(): Field[][] {
        return this.fields;
    }

    makeJson(name: string, backGround: string): string {
        const level: Level = {name, backGround, arena: this.fields}

        console.log(JSON.stringify(level))

        return JSON.stringify(this.fields)
    }
}
