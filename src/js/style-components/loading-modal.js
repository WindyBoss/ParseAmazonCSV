export class LoadingModal {
    constructor(modalContainer, hidden = true) {
        this._modalContainer = modalContainer;
        this._modalContainer.hidden = hidden;
    };

    hideModal() {
        this._modalContainer.hidden = true;
        this._modalContainer.classList.add('hidden');
    }

    showModal() {
        this._modalContainer.classList.remove('hidden')
        this._modalContainer.hidden = false;
    }
}