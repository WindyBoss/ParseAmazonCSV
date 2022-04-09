class MakeTableRow {
    constructor({ data }) {
        this._data = data;
        this._tableRow = [];
    }

    getTableRow() {
        this.setTableRow();
        return this._tableRow;
    }

    setTableRow() {
        const tableRow = this._data.map(row => {
            return this._createTableRowCard(row);
        });
        this._tableRow.push(...tableRow);
    }

    _createTableRowCard(rows) {
        return rows.map((cell) => {
            const checkedCell = this._checkTheLetter(cell);
            const cellByNumber = this._cellsConverter(checkedCell);
            return cellByNumber;
        });
    };

    _checkTheLetter(word) {
        let newWord = word;
        for (let letter of word) {
            if (
                letter === 'â' ||
                letter === 'Â' ||
                letter === '' ||
                letter === '¬' ||
                letter === 'ï' ||
                letter === '»' ||
                letter === '¿' ||
                letter === '"' ||
                letter === '£' ||
                letter === '$'
                // letter === '%'

            ) {
                // console.log(letter);
                newWord = word.replace(letter, '');
                for (let letter of newWord) {
                    if (
                        letter === 'â' ||
                        letter === 'Â' ||
                        letter === '' ||
                        letter === '¬' ||
                        letter === 'ï' ||
                        letter === '»' ||
                        letter === '¿' ||
                        letter === '"' ||
                        letter === '£' ||
                        letter === '$'
                        // letter === '%'
                    ) {
                        newWord = newWord.replace(letter, '');
                    };
                };

            };
        };
        newWord = this._splitValidation(newWord);
        for (let letter of newWord) {
            if (
                letter === 'â' ||
                letter === 'Â' ||
                letter === '' ||
                letter === '¬' ||
                letter === 'ï' ||
                letter === '»' ||
                letter === '¿' ||
                letter === '"' ||
                letter === '£' ||
                letter === '$' ||
                // letter === '%' ||
                letter === 'Ã') {
                newWord = newWord.replace(letter, '');
            };
        };

        for (let letter of newWord) {
            if (letter === '¤') {
                newWord = newWord.replace(letter, 'ä');
            };
            if (letter === '¼') {
                newWord = newWord.replace(letter, 'ü');
            };
            if (letter === '') {
                newWord = newWord.replace(letter, 'ß');
            };
            if (letter === '¶') {
                newWord = newWord.replace(letter, 'ö');
            };
        };
        return newWord;
    };

    _splitValidation(keyword) {
        const newKeyword = Array(keyword.split(',').join(''));
        return newKeyword;
    };

    _cellsConverter(cell) {
        if (isNaN(Number(cell))) {
            return String(cell);
        }
        return Number(cell);
    };
}


export { MakeTableRow };