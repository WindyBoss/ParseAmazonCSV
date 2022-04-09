const refs = {
    openModalBtn: document.querySelector('#open-modal-btn'),
    modalContainer: document.querySelector('.modal-container')
}


const refsFirstGrid = {
    fileInput: document.querySelector('.file-input'),
    fileBtn: document.querySelector('.file-btn'),
    btnReset: document.querySelector('.file-btn-reset'),
    gridDiv: document.querySelector('#myGrid'),
    deleteSelectedBtn: document.querySelector('#selection-delete'),
    clearSelectedBtn: document.querySelector('#selection-clear'),
    selectionContainer: document.querySelector('#selection-container'),
    tableQuickFilterInput: document.querySelector('#quickFilter'),
    columnFilterContainer: document.querySelector('.column-filter'),
    columnTotal: document.querySelector('.column-total'),
    addRemovedRows: document.querySelector('.file-btn-add-deleted-row'),
}

const refsSecondGrid = {
    fileInput: document.querySelector('.file-input-two'),
    fileBtn: document.querySelector('.file-btn-two'),
    btnReset: document.querySelector('.file-btn-reset-two'),
    gridDiv: document.querySelector('#myGrid-two'),
    btnContainerTable: document.querySelector('#second-table-btn-container'),
    tableActiveBtn: document.querySelector('#second-table-activate-btn'),
    tableClearSelectBtn: document.querySelector('#selection-clear-two'),
    tableDeleteSelection: document.querySelector('#selection-delete-two'),
    tableQuickFilterInput: document.querySelector('#quickFilter-two'),
    columnFilterContainer: document.querySelector('.column-filter-two'),
    columnTotal: document.querySelector('.column-total-two'),
    addRemovedRows: document.querySelector('.file-btn-add-deleted-row-two'),
}

export { refs, refsFirstGrid, refsSecondGrid };