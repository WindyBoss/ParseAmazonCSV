import { MainTableRow } from './table-elements-plugin/mainRow';
import { SimpleRow } from './table-elements-plugin/table-cells';
import { MakeTableRow } from './table-elements-plugin/cell/cell-converter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CustomLoadingCellRenderer, spinnerOptions } from './style-components/spin';

const mainRow = new MainTableRow();
const dataRow = new SimpleRow();
const removedColumns = [];


const gridOptions = {
    rowSelection: 'multiple',
    // multiSortKey: 'ctrl',
    animateRows: true,
    enableCellChangeFlash: true,
    rowDragManaged: true,
    rowDragMultiRow: true,
    rowDragEntireRow: true,
    resizable: true,
    enableRangeSelection: true,
    rowGroupPanelShow: 'always',
    enableCharts: true,
    showOpenedGroup: true,
    groupSelectsChildren: true,
    suppressRowClickSelection: true,
    chartThemes: ['ag-pastel', 'ag-material-dark', 'ag-vivid-dark', 'ag-solar'],
    // onFirstDataRendered: onFirstDataRendered,

    // pagination: true,  -> impossible with dragging rows

    // 10 rows per page (default is 100)
    paginationPageSize: 50,
    sideBar: {
        toolPanels: [{
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
                minWidth: 225,
                maxWidth: 225,
                width: 225
            },
            {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
                minWidth: 180,
                maxWidth: 400,
                width: 250
            }
        ],
        position: 'left',
        defaultToolPanel: 'filters'
    },
    columnHoverHighlight: true,
    suppressAggFuncInHeader: true,
    // suppressDragLeaveHidesColumns: true,
    suppressMakeColumnVisibleAfterUnGroup: true,
    groupIncludeFooter: true,
    groupIncludeTotalFooter: true,
    components: {
        customLoadingCellRenderer: CustomLoadingCellRenderer,
    },

    loadingCellRenderer: 'customLoadingCellRenderer',
    loadingCellRendererParams: {
        loadingMessage: 'One moment please...',
        footerValueGetter: 'myFooterValueGetter'
    },
    autoGroupColumnDef: {
        minWidth: 300,
        cellRendererParams: {
            innerRenderer: (params) => {
                if (params.node.footer) {
                    const isRootLevel = params.node.level === -1;
                    if (isRootLevel) {
                        return `<span style="color:red; font-weight:bold background-color:green">Grand Total</span>`;
                    }
                    return `<span style="color:blue background-color:green">Sub Total ${params.value}</span>`;
                }
                return params.value;
            },
        },

    },

}
class TableSet {
    constructor({
        container,
        data,
        columnFilterContainer,
        quickFilterId,
    }) {
        this._data = data;
        this._dataConverter = {};
        this._table = [];
        this._tableHeaderList = [];
        this._tableColumnValues = [];
        this._container = container;
        this._tableDataContainer = {};
        this._columnFilterContainer = columnFilterContainer;
        this._quickFilterId = quickFilterId;
        this._removedColumns = [];
    }

    _setHeaderList() {
        this._tableHeaderList = this._table[0];
    }

    _setTableRowPlugin() {
        this._dataConverter = new MakeTableRow({
            data: this._data,
        });
    }

    _convertTheTable() {
        this._setTableRowPlugin();
        this._table = this._dataConverter.getTableRow();
    }

    _setColumnValue() {
        this._tableColumnValues = this._table;
    }

    _setTable() {
        this._setTableRowPlugin();
        this._convertTheTable();
        this._setHeaderList();
        this._setColumnValue();
        mainRow.setHeaderName(this._tableHeaderList);
        mainRow.setField(this._tableHeaderList);
        dataRow.setColumnValue(this._tableColumnValues);
        dataRow.setColumnName(this._tableHeaderList);
        this._tableRecord();
        this._setColumnFilter();
    }

    _setColumnFilter() {
        const labels = mainRow.addColumnSelect();
        labels.map(label => {
            this._columnFilterContainer.insertAdjacentHTML('afterbegin', label);
        })
    }

    _removeColumn(columnId) {
        const newColumnDefs = [];
        const newColumnTitles = [];
        const allColumns = [];
        const remadeColumnId = this.fieldNameConfig(columnId);
        gridOptions.columnDefs.forEach(column => {
            allColumns.push(column.field);
            if (remadeColumnId === column.field && !removedColumns.includes(remadeColumnId)) {
                removedColumns.push(column.field);
            } else if (removedColumns.includes(remadeColumnId) && column.field === remadeColumnId) {
                newColumnTitles.push(column.field);
                removedColumns.splice(removedColumns.indexOf(`${column.field}`, 1));
            } else if (removedColumns.includes(column.field)) {
                newColumnTitles.splice(newColumnTitles.indexOf(`${column.field}`, 1));
            } else {
                newColumnTitles.push(column.field);
            }
        });

        allColumns.forEach(columnName => {
            if (!newColumnTitles.includes(columnName) && !removedColumns.includes(columnName)) {
                newColumnTitles.push(columnName);
            }
        });
        gridOptions.columnDefs.forEach(column => {
            if (newColumnTitles.includes(column.field)) {
                newColumnDefs.push(column);
            }
        });
        gridOptions.api.setColumnDefs(newColumnDefs);
    }

    fieldNameConfig(str) {
        let newStr = String(str);
        newStr = newStr.replace('(USD)', '');
        newStr = newStr.replace('(EUR)', '');
        newStr = newStr.replace('-', ' ');
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
        str = str.replace(/\s+/g, '');
        // console.log(str);
        return str;
    }

    _tableRecord() {
        if (Object.keys(this._tableDataContainer).length === 0) {
            this._tableDataContainer.tableHeadlineRow = mainRow.getRowConfig();
            this._tableDataContainer.tableDataRows = dataRow.getTable();
        }

    }

    _onQuickFilterChanged() {
        gridOptions.api.setQuickFilter(document.getElementById('quickFilter-two').value);
    }

    _showTableData() {
        this._tableRecord();
        return this._tableDataContainer;
    }

    _postTable() {
        this._setTable();
        this._tableSwitch();
        gridOptions.columnDefs = mainRow.getRowConfig();
        gridOptions.rowData = dataRow.getTable();
        gridOptions.cellRendererParams = {
            checkbox: this._checkboxSelection,
        }

        gridOptions.defaultColDef = {
            headerCheckboxSelection: this._isFirstColumn,
            checkboxSelection: this._isFirstColumn,
        }
        new agGrid.Grid(this._container, gridOptions);
    }

    _getData() {
        return mainRow.getRowConfig()
    }

    _checkboxSelection(params) {
        return params.node.group === true;
    }

    _isFirstColumn(params) {
        const displayedColumns = params.columnApi.getAllDisplayedColumns();
        const thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    }

    _clearTable() {
        mainRow.clearData();
        dataRow.clearTable();

        this._table = [];
        this._tableHeaderList = [];
        this._tableColumnValues = [];
    }

    _tableSwitch() {
        gridOptions.columnDefs = [];
        gridOptions.rowData = [];
    }

    _clearTableSelection() {
        try {
            const selectedRows = gridOptions.api.getSelectedRows();
            if (!selectedRows || selectedRows.length === 0) {
                Notify.failure('No rows selected');
            }
            gridOptions.api.deselectAll();

        } catch (error) {
            Notify.failure('No file detected');
            return;
        }
    }

    _deleteSelected() {
        try {
            const api = gridOptions.api;
            const selectedRows = api.getSelectedRows();
            if (!selectedRows || selectedRows.length === 0) {
                Notify.failure('No rows selected');
            } else {
                this._timeOperation('Delete', function() {
                    api.applyTransaction({ remove: selectedRows });
                });
            }
        } catch (error) {
            Notify.failure('No file detected');
            return;
        }

    }

    _timeOperation(name, operation) {
        // var start = new Date().getTime();
        operation();
        // var end = new Date().getTime();
    }
}


export { TableSet };