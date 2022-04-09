import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Spinner } from 'spin.js';
import '../scss/main.scss';
const _ = require('lodash');
import { refs, refsFirstGrid, refsSecondGrid } from './refs';
import { CustomLoadingCellRenderer, spinnerOptions } from './style-components/spin';
import { LoadingModal } from './style-components/loading-modal';
import { parsedata, parseCsv } from './uploadCSV';
import { TableSet } from './firstTableSetPlugin';
import { DOMTableElementManagement } from './style-components/btn-switch';
import { OpenModal } from './style-components/open-modal';
/*------ Spinner Set-up ------*/
// const waitSpinnerContainer = document.querySelector('[data-loading]');
// const waitSpinner = new Spinner(spinnerOptions).spin(document.querySelector('.waiting-module-window-spin'));
// const loadingModal = new LoadingModal(waitSpinnerContainer);

/*------- Object --------------*/

// loadingModal.hideModal();
// console.log(refsFirstGrid.addRemovedRows);

const tableDOMelements = new DOMTableElementManagement({
    inputSelector: refsFirstGrid.fileInput,
    sendBtnSelector: refsFirstGrid.fileBtn,
    resetBtnSelector: refsFirstGrid.btnReset,
    containerSelector: refsFirstGrid.gridDiv,
    tableShowSelector: 'table-shown',
});

const modal = new OpenModal();

tableDOMelements._blockElement(refsFirstGrid.fileBtn);
tableDOMelements._blockElement(refsFirstGrid.btnReset);
tableDOMelements._blockElement(refsSecondGrid.tableActiveBtn);

// /*------- Table Making --------------*/

function setFistTablePlugin() {
    const firstTable = new TableSet({
        container: refsFirstGrid.gridDiv,
        data: parsedata,
        columnFilterContainer: refsFirstGrid.columnFilterContainer,
        quickFilterId: '#quickFilter',
        columnTotal: refsFirstGrid.columnTotal,
    })
    return firstTable;
}

function postTable() {
    const tablePlugin = setFistTablePlugin();
    try {
        tablePlugin._postTable();
        clearFileInput();
        tableDOMelements._blockElement(refsFirstGrid.fileBtn);
        tableDOMelements._tablePost();
        switchOnResetBtn();
        addTable();
        tablePlugin._showTableData();
        refsFirstGrid.columnFilterContainer.addEventListener('click', removeColumn);
        refsFirstGrid.addRemovedRows.addEventListener('click', addDeletedRows);
    } catch (error) {
        console.log(error);
        Notify.failure('Sorry, something went wrong, please reset the table and try again');
    }
};

function removeColumn(e) {
    const removedColumn = e.target.id;
    const tablePlugin = setFistTablePlugin();
    const chechboxes = document.querySelectorAll('.checkbox');
    takeDataForColumnRemove(tablePlugin, chechboxes, removedColumn);
};

function takeDataForColumnRemove(plugin, checkboxes, removedColumn) {
    tableDOMelements._checkboxChecked(checkboxes, 'ag-checked');
    plugin._removeColumn(removedColumn);
};

function allowBtn(e) {
    if (refsSecondGrid.tableActiveBtn.disabled) {
        parseCsv.getCsv('dealCsv', { once: true });
    };
    // loadingModal.showModal();
    if (e.target.value !== '') {
        tableDOMelements._switchOnElement(refsFirstGrid.fileBtn);
        setTimeout(() => {
            refsFirstGrid.fileBtn.addEventListener('click', postTable);
        }, 500);
        // loadingModal.hideModal();
        parseCsv.dataReset(parsedata);
    };
};

function addTable() {
    tableDOMelements._switchOnElement(refsSecondGrid.tableActiveBtn);
    refsSecondGrid.tableActiveBtn.addEventListener('click', showSecondTableBtn);
};

function clearFileInput() {
    tableDOMelements._clearInput();
    refsFirstGrid.fileInput.classList.add('is-hidden');
};

function switchOnResetBtn() {
    tableDOMelements._switchOnElement(refsFirstGrid.btnReset);
    refsFirstGrid.btnReset.addEventListener('click', tableReset);
};

function tableReset() {
    const tablePlugin = setFistTablePlugin();
    tableDOMelements._tableReset();
    tablePlugin._clearTable();
    tableDOMelements._blockElement(refsFirstGrid.fileBtn);
    refsFirstGrid.fileInput.classList.remove('is-hidden');
};

function addDeletedRows() {
    const tablePlugin = setFistTablePlugin();
    tablePlugin._onAddRow();
};

/*------- Add EventListeners --------------*/
refsFirstGrid.fileInput.addEventListener('input', allowBtn);
refsFirstGrid.clearSelectedBtn.addEventListener('click', clearSelection);
refsFirstGrid.deleteSelectedBtn.addEventListener('click', deleteSelected);
refsFirstGrid.tableQuickFilterInput.addEventListener('input', _.debounce(quickFilter, 300));
refs.openModalBtn.addEventListener('click', setOpenModal);

function setOpenModal() {
    modal._openModal(refs.modalContainer);
};

function quickFilter() {
    const tablePlugin = setFistTablePlugin();
    tablePlugin._onQuickFilterChanged();
};

function clearSelection() {
    const tablePlugin = setFistTablePlugin();
    tablePlugin._clearTableSelection();
};

function deleteSelected() {
    const tablePlugin = setFistTablePlugin();
    tablePlugin._deleteSelected();
};

function showSecondTableBtn() {
    tableDOMelements._showElement(refsSecondGrid.btnContainerTable);
    tableDOMelements._blockElement(refsSecondGrid.fileBtn);
    tableDOMelements._blockElement(refsSecondGrid.btnReset);
    tableDOMelements._blockElement(refsSecondGrid.tableActiveBtn);
};