import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Spinner } from 'spin.js';
// import '../scss/main.scss';

import { refs, refsFirstGrid, refsSecondGrid } from './refs';
import { CustomLoadingCellRenderer, spinnerOptions } from './style-components/spin';
import { LoadingModal } from './style-components/loading-modal';
import { parsedata, parseCsv } from './uploadCSV';
import { TableSet } from './secondTableSetPlugin';
import { DOMTableElementManagement } from './style-components/btn-switch';
/*------ Spinner Set-up ------*/
// const waitSpinnerContainer = document.querySelector('[data-loading]');
// const waitSpinner = new Spinner(spinnerOptions).spin(document.querySelector('.waiting-module-window-spin'));
// const loadingModal = new LoadingModal(waitSpinnerContainer);
// parseCsv.getCsv();
/*------- Object --------------*/

// loadingModal.hideModal();





const tableDOMelements = new DOMTableElementManagement({
    inputSelector: refsSecondGrid.fileInput,
    sendBtnSelector: refsSecondGrid.fileBtn,
    resetBtnSelector: refsSecondGrid.btnReset,
    containerSelector: refsSecondGrid.gridDiv,
    tableShowSelector: 'table-shown',
});


// /*------- Table Making --------------*/

function setTablePlugin() {
    const firstTable = new TableSet({
        container: refsSecondGrid.gridDiv,
        data: parsedata,
        columnFilterContainer: refsSecondGrid.columnFilterContainer,
        quickFilterId: '#quickFilter-two',
    })
    return firstTable;
}

function postTable() {
    const tablePlugin = setTablePlugin();
    try {
        tablePlugin._postTable();
        // clearFileInput();
        tableDOMelements._blockElement(refsSecondGrid.fileBtn);
        tableDOMelements._tablePost();
        switchOnResetBtn();
        tableDOMelements._changeElWidth(refsFirstGrid.gridDiv, '49%');
        tablePlugin._showTableData();
        refsSecondGrid.columnFilterContainer.addEventListener('click', removeColumn);
    } catch (error) {
        Notify.failure('Sorry, something went wrong, please reset the table and try again');
    }
}

function removeColumn(e) {
    const removedColumn = e.target.id;
    const tablePlugin = setTablePlugin();
    const chechboxes = document.querySelectorAll('.checkbox');
    takeDataForColumnRemove(tablePlugin, chechboxes, removedColumn);

}

function takeDataForColumnRemove(plugin, checkboxes, removedColumn) {
    tableDOMelements._checkboxChecked(checkboxes, 'ag-checked');
    plugin._removeColumn(removedColumn);
}

function allowBtn(e) {
    parseCsv.getCsv('dealCsv-two');
    // loadingModal.showModal();
    tableDOMelements._switchOnElement(refsSecondGrid.fileBtn);
    if (e.target.value !== '') {
        tableDOMelements._switchOnElement(refsSecondGrid.fileBtn);
        setTimeout(() => {
            refsSecondGrid.fileBtn.addEventListener('click', postTable);
        }, 500);
        // loadingModal.hideModal();
    }
}

function clearFileInput() {
    tableDOMelements._clearInput();
    refsSecondGrid.fileInput.classList.add('is-hidden');
}

function switchOnResetBtn() {
    tableDOMelements._switchOnElement(refsSecondGrid.btnReset);
    refsSecondGrid.btnReset.addEventListener('click', tableReset);
};

function tableReset() {
    const tablePlugin = setTablePlugin();

    tableDOMelements._tableReset();
    tablePlugin._clearTable();
    parseCsv.dataReset(parsedata);
    tableDOMelements._blockElement(refsSecondGrid.fileBtn);
    tableDOMelements._changeElWidth(refsFirstGrid.gridDiv, '100%');

    refsSecondGrid.fileInput.classList.remove('is-hidden');
};




/*------- Add EventListeners --------------*/
refsSecondGrid.fileInput.addEventListener('input', allowBtn);
refsSecondGrid.tableClearSelectBtn.addEventListener('click', clearSelection);
refsSecondGrid.tableDeleteSelection.addEventListener('click', deleteSelected);
refsSecondGrid.tableQuickFilterInput.addEventListener('input', quickFilter)

function quickFilter() {
    const tablePlugin = setTablePlugin();
    tablePlugin._onQuickFilterChanged();
}


function clearSelection() {
    const tablePlugin = setTablePlugin();
    tablePlugin._clearTableSelection();
}

function deleteSelected() {
    const tablePlugin = setTablePlugin();
    tablePlugin._deleteSelected();
}



// refs.fileBtnTwo.addEventListener('click', postSecondTable);
// refs.fileInputTwo.addEventListener('input', activateTableBtnTwo);
// refs.btnResetTwo.addEventListener('click', resetSecondTable);




// function resetSecondTable() {
//     refs.gridDivTwo.innerHTML = '';
//     dataRowSecondTable.clearTable();
//     mainRowSecondTable.clearData();
//     parseCsv.dataReset(parsedata);
//     refs.fileInputTwo.classList.remove('is-hidden');
//     refs.fileBtnTwo.disabled = true;
//     refs.fileInputTwo.hidden = false;
//     refs.btnResetTwo.disabled = true;
//     refs.gridDiv.style.width = '100%';
//     refs.gridDivTwo.classList.remove('table-shown');
// }

// function activateTableBtnTwo(e) {
//     if (e.target.value !== '') {
//         refs.fileBtnTwo.disabled = false;
//         refs.btnReset.disabled = false;
//     }
// }



// function postSecondTable() {
//     parseCsv.dataReset(parsedata);
//     refs.gridDiv.style.width = '49%';
//     postedTable(refs.gridDivTwo, mainRowSecondTable, dataRowSecondTable);
//     refs.btnResetTwo.disabled = false;
//     refs.fileInputTwo.hidden = true;
//     refs.gridDivTwo.classList.add('table-shown');
// }