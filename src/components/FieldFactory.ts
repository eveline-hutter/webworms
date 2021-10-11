import Field from "@/components/Field";

export default class FieldFactory {
    private fields: Field[][] = [];
    private readonly rows: number;
    private readonly columns: number;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
    }

    makeFields(): void {
        for(let row = 1; row <= this.rows; row++) {
            this.fields[row] = [];
            for(let column = 1; column <= this.columns; column++) {
                const obstacle = {resource: require("@/assets/general/square-stroked.svg")}
                this.fields[row][column] = {row, column, obstacle};
            }
        }
    }

    getField(row: number, column: number): Field {
        return this.fields[row][column];
    }

    getFields(): Field[][] {
        return this.fields;
    }

    makeJson(): string {
       /* for(let row = 0; row <= this.rows; row++) {
            for(let column = 0; column <= this.columns; column++) {
                const field = this.fields[row][column];

                if (field?.obstacle?.resource.includes('square-stroked'))
                    this.fields[row][column] = {row, column};
            }
        }

        */

        return JSON.stringify(this.fields)
    }
}
