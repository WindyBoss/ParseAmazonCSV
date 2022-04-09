class DOMTableElementManagement {
    constructor({
        inputSelector,
        sendBtnSelector,
        resetBtnSelector,
        containerSelector,
        tableShowSelector,
    }) {
        this._input = inputSelector;
        this._sendBtn = sendBtnSelector;
        this._resetBtn = resetBtnSelector;
        this._container = containerSelector;
        this._tableShowSelector = tableShowSelector;
    }

    _clearInput() {
        this._input.value = '';
    }

    _tablePost() {
        this._container.classList.add(this._tableShowSelector);
    }

    _tableReset() {
        this._container.childNodes[1].innerHTML = '';
        this._container.childNodes[3].childNodes[7].innerHTML = '';
        this._container.childNodes[5].remove();
        this._container.classList.remove(this._tableShowSelector);
    }

    _blockElement(el) {
        el.disabled = true;
    }

    _switchOnElement(el) {
        el.disabled = false;
    }

    _hideElement(el) {
        el.hidden = true;
    }

    _showElement(el) {
        el.hidden = false;
    }

    _changeElWidth(el, width) {
        el.style.width = width;
    }

    _checkboxChecked(checkboxes, selector) {
        let checkBoxId = ''
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.classList.remove(selector);
                checkBoxId = checkbox.id;
            } else if (!checkbox.checked) {
                checkbox.classList.add(selector);
            }
        })

        return checkBoxId;
    }
}


export { DOMTableElementManagement };