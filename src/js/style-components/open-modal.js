class OpenModal {
    constructor() {}

    _openModal(modal) {

        modal.hidden = false;
    }

    _closeModal(modal) {
        modal.hidden = true;
    }
}

export { OpenModal };