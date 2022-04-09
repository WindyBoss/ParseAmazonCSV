import { Spinner } from 'spin.js';

const spinnerOptions = {
    lines: 9, // The number of lines to draw
    length: 5, // The length of each line
    width: 2, // The line thickness
    radius: 8, // The radius of the inner circle
    scale: 2, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1, // Rounds per second
    rotate: 2, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: 'red', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    // top: '0vw', // Top position relative to parent
    // left: '19vw', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
};

const tableSpinnerContainer = document.querySelector('.table-spinner');
const tableSpinner = new Spinner(spinnerOptions).spin(tableSpinnerContainer);

class CustomLoadingCellRenderer {
    init(params) {
        this.spinner = document.createElement('div');
        this.spinner.classList.add('table-spinner');
    }

    getSpinner() {
        return this.spinner;
    }
}

export { CustomLoadingCellRenderer, spinnerOptions };