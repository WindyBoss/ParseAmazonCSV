import { percentage } from './table-components/percentage';


class SimpleRow {
    constructor() {
        this.columnName;
        this.columnsValue;
        this.table = [];
    };
    makeRow() {
        for (let i = 1; i < this.columnsValue.length; i++) {
            const row = [];
            for (let j = 0; j < this.columnsValue[i].length; j++) {
                const columnValue = this.columnsValue[i][j];
                if (Number(isNaN(columnValue))) {
                    const cell = [
                        this.fieldNameConfig(this.columnName[j]), String(columnValue),
                    ];
                    row.push(cell);
                } else if (percentage.includes(String(this.columnName[j]))) {
                    const cell = [
                        this.fieldNameConfig(this.columnName[j]), Math.floor(columnValue * 10000) / 100,
                    ];
                    row.push(cell);
                } else {
                    const cell = [
                        this.fieldNameConfig(this.columnName[j]), Math.floor(columnValue * 100) / 100,
                    ];
                    row.push(cell);
                };
            };
            this.table.push(Object.fromEntries(row));
        };
    }

    getTable() {
        this.clearTable();
        this.makeRow();
        return this.table;
    }

    clearTable() {
        this.table = [];
    }

    setColumnName(newColumnName) {
        this.columnName = newColumnName;
    };
    setColumnValue(newColumnValue) {
        this.columnsValue = newColumnValue;
    }

    fieldNameConfig(str) {
        let newStr = String(str);

        newStr = newStr.replace('(USD)', '');
        newStr = newStr.replace('(EUR)', '');

        for (let letter of newStr) {
            if (letter === '(' || letter === ')' || letter === '-') {
                newStr = newStr.replace(letter, '').trim();
            }
        }

        for (let letter of newStr) {
            if (letter === '(' || letter === ')' || letter === '-') {
                newStr = newStr.replace(letter, '').trim();
            }
            newStr = newStr.replace('  ', ' ').trim();;
        }

        const splitStr = newStr.toLowerCase().split(" ");

        for (let i = 0; i < splitStr.length; i++) {
            if (i > 0) {
                splitStr[i] = splitStr[i][0].toUpperCase() + splitStr[i].substr(1);
            } else {
                splitStr[i] = splitStr[i].toLowerCase();
            }

            str = splitStr.join(" ");
        }

        str = str.replace(/\s+/g, '')
        return str;
    }
}

export { SimpleRow };