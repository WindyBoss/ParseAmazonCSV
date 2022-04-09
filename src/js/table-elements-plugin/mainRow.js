import numberColumn from './table-components/number-column';
import { newMetricsSpliter } from './table-components/metrics';
import { percentage } from './table-components/percentage';
import { refs, refsFirstGrid, refsSecondGrid } from '../refs';

const tableParams = {
    marketingSales: 0,
    spend: 0,
    totalSales: 0,
    impression: 0,
    clicks: 0,
    sessions: 0,
    pageViews: 0,
    orders: 0,
    totalOrders: 0,
    marketingUnits: 0,
    totalUnits: 0,
    sum: 0,
    ntbOrders: 0,
    ntbSales: 0,
    buyBox: 0,
    rowNumber: 0,
    b2bUnitOrdered: 0,
    b2bTotalSales: 0,
    b2bTotalOrderedItem: 0,
    xraySales: 0,
    xrayRevenue: 0,
    fbaFees: 0,
    activeSellers: 0,
    rating: 0,
    reviewCount: 0,
    weight: 0,
    imagesNumber: 0,
    xrayPrice: 0,
    averageBSR: 0,
    viewableImpressions: 0,
    budget: 0,
    topOfsearchIs: 0,
    totalOfferCount: 0,
}

let totalRowKeys = [];
let totalRowValues = [];

class MainTableRow {
    constructor() {
        this.header = 'headerName';
        this.field = 'field';
        this.headerValue;
        this.fieldValue;
        this.sortable = true;
        this.filter = true;
        this.rowGroup = true;
        this.resizable = true;
        this.width = 200;
        this.row = []
        this.fields = [];
    };

    setHeaderAttributtes(counter) {
        return {
            'headerName': String(this.headerValue[counter]),
            'field': this.fieldNameConfig(this.fieldValue[counter]),
            'sortable': this.sortable,
            'filter': this.filter,
            'resizable': this.resizable,
            'width': this.width,
            'colId': this.fieldNameConfig(this.fieldValue[counter]),
            'unSortIcon': true,
            'rowDrag': true,
            'editable': true,
            'aggFunc': 'sum',
            'enableRowGroup': this.rowGroup,
            'enablePivot': true,
            'checkboxSelection': true,
            // 'wrapText': true,
            'autoHeight': true,
            // 'hide': true,
        }
    }

    makeColumnHeadLine() {

        const fields = [];
        for (let i = 0; i < this.headerValue.length; i++) {
            const headerAttributtes = this.setHeaderAttributtes(i);
            fields.push(headerAttributtes.headerName);
            if (numberColumn.includes(String(this.headerValue[i]).toLowerCase().trim())) {
                this.setAggfunc(headerAttributtes);
                headerAttributtes.filter = 'agNumberColumnFilter';
                headerAttributtes.valueParser = numberParser;
                headerAttributtes.valueGetter = ratioValueGetter;
            }
            if (i < 1) {
                headerAttributtes.aggFunc = this.firstColumnConclude;
            }
            if (i > 6) {
                headerAttributtes.chartDataType = 'series';
                headerAttributtes.enablePivot = true;
            }
            if (i > 7) {
                headerAttributtes.maxWidth = 180;
            }
            if (String(this.headerValue[i]).includes('date')) {
                headerAttributtes.filter = 'agDateColumnFilter';
                headerAttributtes.filterParams = {
                    comparator: (filterLocalDateAtMidnight, cellValue) => {
                        const dateParts = cellValue.split('/');
                        const day = Number(dateParts[0]);
                        const month = Number(dateParts[1]) - 1;
                        const year = Number(dateParts[2]);
                        const cellDate = new Date(year, month, day);
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    },
                };
            } else if (numberColumn.includes(String(this.headerValue[i]).toLowerCase().trim())) {
                headerAttributtes.filter = 'agTextColumnFilter';
            }
            this.row.push(headerAttributtes);
        }
        this.fields = fields.flat(1);
    };

    setAggfunc(headerAttributtes) {
        headerAttributtes.aggFunc = ratioAggFunc;
    }

    addColumnSelect() {
        const labels = this.fields.map(field => {
            let label = [];
            if (field.length > 15) {
                label = [
                    `${field.slice(0, 15)}...`
                ];
            } else if (field.includes(',')) {
                label = [field.replace(',', '')];
            } else {
                label = [field];
            }
            return `<label class='label'><input type="checkbox" value=${field} id="${field}" class='ag-checked checkbox ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper'><span class='label-name'>${label}</span></label>`
        })
        return labels;
    }

    getRowConfig() {
        this.clearData();
        this.makeColumnHeadLine();
        return this.row
    }
    setHeaderName(newHeaderName) {
        this.headerValue = newHeaderName;
    };
    setField(newField) {
        this.fieldValue = newField;
    };
    getField() {
        return this.fieldValue;
    };

    tableReset() {
        this.row = [];
        this.field = [];
    }

    clearData() {
        totalRowKeys = [];
        totalRowValues = [];
        this.fields = [];
        this.row = [];
    }

    getFields() {
        return this.fields;
    }

    fieldNameConfig(str) {
        let newStr = String(str);
        newStr = newStr.replace('(USD)', '');
        newStr = newStr.replace('(EUR)', '');
        newStr = newStr.replace('(GBP)', '');

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
        // // console.log(str);
        return str;
    }

    firstColumnConclude() {
        return 'Total Data';
    }

}

function pasteTotal(tableParams) {
    refsFirstGrid.columnTotal.innerHTML = '';
    // console.log(tableParams);
    tableParams.forEach(param => {
        const renderedParam = `
        <div class='column-total__container'>
            <div class='column-total__wrap'>
                <p class='column-total__key'>${param.key}</p>
                <p class='column-total__value'>${param.value}</p>
            </div>
        </div>`
        refsFirstGrid.columnTotal.insertAdjacentHTML('afterbegin', renderedParam);
    })
}


function makeTotalRow(keys, values) {

    const resultArray = [];
    keys.forEach((key, i) =>
        resultArray.push({
            key: key,
            value: values[i],
        })
    );

    pasteTotal(resultArray.reverse());
}


function clearTableParams() {
    tableParams.marketingSales = 0;
    tableParams.spend = 0;
    tableParams.totalSales = 0;
    tableParams.impression = 0;
    tableParams.clicks = 0;
    tableParams.sessions = 0;
    tableParams.pageViews = 0;
    tableParams.orders = 0;
    tableParams.totalOrders = 0;
    tableParams.marketingUnits = 0;
    tableParams.totalUnits = 0;
    tableParams.sum = 0;
    tableParams.ntbOrders = 0;
    tableParams.ntbSales = 0;
    tableParams.buyBox = 0;
    tableParams.rowNumber = 0;
    tableParams.b2bUnitOrdered = 0;
    tableParams.b2bTotalSales = 0;
    tableParams.b2bTotalOrderedItem = 0;
    tableParams.xraySales = 0;
    tableParams.xrayRevenue = 0;
    tableParams.fbaFees = 0;
    tableParams.activeSellers = 0;
    tableParams.rating = 0;
    tableParams.reviewCount = 0;
    tableParams.weight = 0;
    tableParams.imagesNumber = 0;
    tableParams.xrayPrice = 0;
    tableParams.averageBSR = 0;
    tableParams.viewableImpressions = 0;
    tableParams.budget = 0;
    tableParams.topOfsearchIs = 0;
    tableParams.totalOfferCount = 0;
}

function ratioAggFunc(params) {
    tableParams.rowNumber = params.values.length;

    setTimeout(() => {
        makeTotalRow(totalRowKeys, totalRowValues);
    }, 0)
    setTimeout(() => {
        clearTableParams();
    }, 0)

    if (newMetricsSpliter.marketingSales.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.marketingSales += value;
        });
        return dataFormatter(tableParams.marketingSales, params.colDef.headerName);
    };
    if (newMetricsSpliter.totalSales.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.totalSales += value;
        });
        return createValueObjectWithoutPercentage(tableParams.totalSales, 1, params.colDef.headerName);
    };
    if (newMetricsSpliter.totalSalesB2B.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.b2bTotalSales += value;
        });
        return createValueObjectWithoutPercentage(tableParams.b2bTotalSales, 1, params.colDef.headerName);
    };
    if (newMetricsSpliter.totalUnitsB2B.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.b2bTotalOrderedItem += value;
        });
        return createValueObjectWithoutPercentage(tableParams.b2bTotalOrderedItem, 1, params.colDef.headerName);
    };
    if (newMetricsSpliter.spend.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.spend += value;
        });
        return dataFormatter(tableParams.spend, params.colDef.headerName);
    };
    if (newMetricsSpliter.impression.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            tableParams.impression += value;

        });
        return dataFormatter(tableParams.impression, params.colDef.headerName);
    };
    if (newMetricsSpliter.totalSessions.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.sessions += value;
        });
        return dataFormatter(tableParams.sessions, params.colDef.headerName);
    };
    if (newMetricsSpliter.totalPageViews.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.pageViews += value;
        });
        return dataFormatter(tableParams.pageViews, params.colDef.headerName);
    };
    if (newMetricsSpliter.orders.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.orders += value;
        });
        return dataFormatter(tableParams.orders, params.colDef.headerName);
    };
    if (newMetricsSpliter.marketingUnits.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.marketingUnits += value;
        });
        return dataFormatter(tableParams.marketingUnits, params.colDef.headerName);
    };
    if (newMetricsSpliter.totalUnits.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.totalUnits += value;
        });
        return dataFormatter(tableParams.totalUnits, params.colDef.headerName);
    };
    if (newMetricsSpliter.marketingClicks.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            };
            tableParams.clicks += value;
        });
        return dataFormatter(tableParams.clicks, params.colDef.headerName);
    };
    if (newMetricsSpliter.ntbOrders.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            };
            tableParams.ntbOrders += value;
        });
        return dataFormatter(tableParams.ntbOrders, params.colDef.headerName);
    };
    if (newMetricsSpliter.ntbSales.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.ntbSales += value;
        });
        return dataFormatter(tableParams.ntbSales, params.colDef.headerName);
    };
    if (newMetricsSpliter.totalUnitOrdered.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.totalOrders += value;
        });
        return dataFormatter(tableParams.totalOrders, params.colDef.headerName);
    };
    if (newMetricsSpliter.viewableImpressions.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.viewableImpressions += value;
        });
        return dataFormatter(tableParams.viewableImpressions, params.colDef.headerName);
    };
    if (newMetricsSpliter.vcpm.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.spend, tableParams.viewableImpressions / 1000, params.colDef.headerName);
    };
    if (newMetricsSpliter.averageBuyBox.includes(params.colDef.colId)) {
        // console.log(params.values);
        params.values.forEach((value) => {
            const newValue = Number(value.replace('%', ''));
            if (isNaN(newValue)) {
                return;
            }
            tableParams.buyBox += newValue;
        });
        return averageValueObject(tableParams.buyBox, tableParams.rowNumber, params.colDef.headerName);
    }

    if (newMetricsSpliter.unitOrderedB2B.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.b2bUnitOrdered += value;
        });
        return dataFormatter(tableParams.b2bUnitOrdered, params.colDef.headerName);
    };
    if (newMetricsSpliter.revenue.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.xrayRevenue += value;
        });
        return createValueObjectWithoutPercentage(tableParams.xrayRevenue, 1, params.colDef.headerName);
    };
    if (newMetricsSpliter.sales.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.xraySales += value;
        });
        return createValueObjectWithoutPercentage(tableParams.xraySales, 1, params.colDef.headerName);
    };
    if (newMetricsSpliter.fbaFees.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.fbaFees += value;
        });
        return createValueObjectWithoutPercentage(tableParams.fbaFees, tableParams.rowNumber, params.colDef.headerName);
    };
    if (newMetricsSpliter.activeSellers.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.activeSellers += value;
        });
        return createValueObjectWithoutPercentage(tableParams.activeSellers, tableParams.rowNumber, params.colDef.headerName);
    };
    if (newMetricsSpliter.rating.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.rating += value;
        });
        return createValueObjectWithoutPercentage(tableParams.rating, tableParams.rowNumber, params.colDef.headerName);
    };

    if (newMetricsSpliter.reviewCount.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.reviewCount += value;
        });
        return createValueObjectWithoutPercentage(tableParams.reviewCount, tableParams.rowNumber, params.colDef.headerName);
    };
    if (newMetricsSpliter.weight.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.weight += value;
        });
        return createValueObjectWithoutPercentage(tableParams.weight, tableParams.rowNumber, params.colDef.headerName);
    };
    if (newMetricsSpliter.images.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.imagesNumber += value;
        });
        return createValueObjectWithoutPercentage(tableParams.imagesNumber, tableParams.rowNumber, params.colDef.headerName);
    };
    if (newMetricsSpliter.price.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.xrayPrice += value;
        });
        return createValueObjectWithoutPercentage(tableParams.xrayPrice, tableParams.rowNumber, params.colDef.headerName);
    };
    if (newMetricsSpliter.bsr.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.averageBSR += value;
        });
        return createValueObjectWithoutPercentage(tableParams.averageBSR, tableParams.rowNumber, params.colDef.headerName);
    };
    if (newMetricsSpliter.budget.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.budget += value;
        });
        return dataFormatter(tableParams.budget, params.colDef.headerName);
    };
    if (newMetricsSpliter.topOfsearchIs.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.topOfsearchIs += value;
        });
        return createValueObjectWithoutPercentage(tableParams.topOfsearchIs, tableParams.rowNumber, params.colDef.headerName);

    };
    if (newMetricsSpliter.averageOfferCount.includes(params.colDef.colId)) {
        params.values.forEach((value) => {
            if (isNaN(value)) {
                return;
            }
            tableParams.totalOfferCount += value;
        });
        return createValueObjectWithoutPercentage(tableParams.totalOfferCount, tableParams.rowNumber, params.colDef.headerName);

    };


    if (newMetricsSpliter.acos.includes(params.colDef.colId)) {
        return createValueObject(tableParams.spend, tableParams.marketingSales, params.colDef.headerName);
    }
    if (newMetricsSpliter.roas.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.marketingSales, tableParams.spend, params.colDef.headerName);
    }
    if (newMetricsSpliter.ctr.includes(params.colDef.colId)) {
        return createValueObject(tableParams.clicks, tableParams.impression, params.colDef.headerName);
    }
    if (newMetricsSpliter.cr.includes(params.colDef.colId)) {
        return createValueObject(tableParams.orders, tableParams.clicks, params.colDef.headerName);
    }
    if (newMetricsSpliter.unitSessionPercentage.includes(params.colDef.colId)) {
        return createValueObject(tableParams.sessions, tableParams.sessions, params.colDef.headerName);
    }
    if (newMetricsSpliter.cpc.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.spend, tableParams.clicks, params.colDef.headerName);
    }
    if (newMetricsSpliter.NTBPercentageOrders.includes(params.colDef.colId)) {
        return createValueObject(tableParams.orders - tableParams.ntbOrders, tableParams.orders, params.colDef.headerName);
    }
    if (newMetricsSpliter.NTBPercentageSales.includes(params.colDef.colId)) {
        return createValueObject(tableParams.marketingSales - tableParams.ntbSales, tableParams.marketingSales, params.colDef.headerName);
    }
    if (newMetricsSpliter.sessionPercentage.includes(params.colDef.colId)) {
        return createValueObject(tableParams.sessions, tableParams.sessions, params.colDef.headerName);
    }
    if (newMetricsSpliter.totalPageViews.includes(params.colDef.colId)) {
        return createValueObject(tableParams.pageViews, 1, params.colDef.headerName);
    }
    if (newMetricsSpliter.pageViewPercentage.includes(params.colDef.colId)) {
        return createValueObject(tableParams.pageViews, tableParams.pageViews, params.colDef.headerName);
    }
    if (newMetricsSpliter.unitSessionPercentageB2B.includes(params.colDef.colId)) {
        return createValueObject(tableParams.b2bUnitOrdered, tableParams.sessions, params.colDef.headerName);
    }
    if (newMetricsSpliter.orderItemSessionPercentage.includes(params.colDef.colId)) {
        return createValueObject(tableParams.totalUnits, tableParams.sessions, params.colDef.headerName);
    }
    if (newMetricsSpliter.orderItemSessionPercentageB2b.includes(params.colDef.colId)) {
        return createValueObject(tableParams.b2bTotalOrderedItem, tableParams.sessions, params.colDef.headerName);
    }
    if (newMetricsSpliter.averageSalesPerOrder.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.totalSales, tableParams.totalUnits, params.colDef.headerName);
    };
    if (newMetricsSpliter.averageSalesPerOrderB2B.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.b2bTotalSales, tableParams.b2bTotalOrderedItem, params.colDef.headerName);
    };
    if (newMetricsSpliter.averageUnitPerOrder.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.totalOrders, tableParams.totalUnits, params.colDef.headerName);
    };
    if (newMetricsSpliter.averageUnitPerOrderB2B.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.b2bUnitOrdered, tableParams.b2bTotalOrderedItem, params.colDef.headerName);
    };
    if (newMetricsSpliter.averageSellingPrice.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.totalSales, tableParams.totalOrders, params.colDef.headerName);
    };

    if (newMetricsSpliter.averageSellingPriceB2B.includes(params.colDef.colId)) {
        return createValueObjectWithoutPercentage(tableParams.b2bTotalSales, tableParams.b2bUnitOrdered, params.colDef.headerName);
    };

    totalRowKeys = [];
    totalRowValues = [];

}

function createValueObject(param1, param2, paramDef) {
    let forReturn = 0;

    if (param1 && param2) {
        forReturn = ratioFormatter(param1 / param2);

        if (forReturn !== 0) {
            if (totalRowKeys.includes(paramDef)) {
                totalRowValues.splice(totalRowKeys.indexOf(paramDef), 1, forReturn)
            } else {
                totalRowKeys.push(paramDef);
                totalRowValues.push(forReturn);
            }
        }
    } else {
        forReturn = 0
    }
    return {
        toString: () => forReturn,
    };
}

function averageValueObject(param1, param2, paramDef) {
    let forReturn = 0;

    if (param1 && param2) {
        forReturn = averageDataFormatter(param1 / param2);
        if (forReturn !== 0) {
            if (totalRowKeys.includes(paramDef)) {
                totalRowValues.splice(totalRowKeys.indexOf(paramDef), 1, forReturn)
            } else {
                totalRowKeys.push(paramDef);
                totalRowValues.push(forReturn);
            }
        }
    } else {
        forReturn = 0
    };

    return {
        toString: () => forReturn,
    };
}

function createValueObjectWithoutPercentage(param1, param2, paramDef) {
    let forReturn = 0;
    if (param1 && param2) {
        forReturn = Math.round((param1 / param2) * 100) / 100;
        if (forReturn !== 0) {
            if (totalRowKeys.includes(paramDef)) {
                totalRowValues.splice(totalRowKeys.indexOf(paramDef), 1, forReturn)
            } else {
                totalRowKeys.push(paramDef);
                totalRowValues.push(forReturn);
            }
        }
    } else {
        forReturn = 0
    };
    return {
        toString: () => forReturn,
    }
}

function numberParser(params) {
    return Number(params.newValue);
}

function dataFormatter(sum, paramDef) {
    const value = Math.round(sum * 100) / 100;
    if (value !== 0) {
        if (totalRowKeys.includes(paramDef)) {
            totalRowValues.splice(totalRowKeys.indexOf(paramDef), 1, value)
        } else {
            totalRowKeys.push(paramDef);
            totalRowValues.push(value);
        }
    }
    return value;
}

function dataFormatterNoTotal(sum) {
    return Math.round(sum * 100) / 100;
}

function stringFormatter(str) {
    return String(str);
}

function averageDataFormatter(value) {
    return Math.round(value * 100) / 100 + '%';
}

function ratioFormatter(value) {
    return Math.round(value * 10000) / 100 + '%';
}

function createValueObjectNoTotal(param1, param2) {
    let forReturn = 0;
    if (param1 && param2) {
        forReturn = ratioFormatter(param1 / param2);
    } else {
        forReturn = 0
    }
    return {
        toString: () => forReturn,
    };
}

function createValueObjectNoTotalWithoutPercentageNoTotal(param1, param2) {
    let forReturn = 0;

    if (param1 && param2) {
        forReturn = Math.round((param1 / param2) * 100) / 100;
    } else {
        forReturn = 0
    };
    return {
        toString: () => forReturn,
    }
}


function ratioValueGetter(params) {
    if (!params.node.group) {

        if (newMetricsSpliter.marketingSales.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.sales);
        };
        if (newMetricsSpliter.totalSales.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.orderedProductSales);
        };
        if (newMetricsSpliter.totalSalesB2B.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.orderedProductSalesB2b);
        };
        if (newMetricsSpliter.totalUnitsB2B.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.totalOrderItemsB2b);
        };
        if (newMetricsSpliter.spend.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.spend);
        };
        if (newMetricsSpliter.impression.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.impressions);
        };
        if (newMetricsSpliter.totalSessions.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.sessions);
        };
        if (newMetricsSpliter.totalPageViews.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.pageViews);
        };
        if (newMetricsSpliter.orders.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.orders);
        };
        if (newMetricsSpliter.marketingUnits.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.marketingUnits);
        };
        if (newMetricsSpliter.totalUnits.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.totalOrderItems);
        };
        if (newMetricsSpliter.marketingClicks.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.clicks);
        };
        if (newMetricsSpliter.ntbOrders.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.ntbOrders);
        };
        if (newMetricsSpliter.ntbSales.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.ntbSales);
        };
        if (newMetricsSpliter.totalUnitOrdered.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.unitsOrdered);
        };
        if (newMetricsSpliter.averageBuyBox.includes(params.colDef.colId)) {
            return params.data.featuredOfferBuyBoxPercentage;
        }

        if (newMetricsSpliter.unitOrderedB2B.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.unitsOrderedB2b);
        };
        if (newMetricsSpliter.revenue.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.xrayRevenue);
        };
        if (newMetricsSpliter.sales.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.xraySales);
        };
        if (newMetricsSpliter.fbaFees.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.fbaFees);
        };
        if (newMetricsSpliter.activeSellers.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.activeSellers);
        };
        if (newMetricsSpliter.rating.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.rating);
        };
        if (newMetricsSpliter.reviewCount.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.reviewCount);
        };
        if (newMetricsSpliter.weight.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.weight);
        };
        if (newMetricsSpliter.images.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.imagesNumber);
        };
        if (newMetricsSpliter.price.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.xrayPrice);
        };
        if (newMetricsSpliter.bsr.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.averageBSR);
        };

        if (newMetricsSpliter.acos.includes(params.colDef.colId)) {
            return createValueObjectNoTotal(params.data.spend, params.data.sales);
        }
        if (newMetricsSpliter.roas.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.sales, params.data.spend);
        }
        if (newMetricsSpliter.ctr.includes(params.colDef.colId)) {
            return createValueObjectNoTotal(params.data.clicks, params.data.impressions);
        }
        if (newMetricsSpliter.cr.includes(params.colDef.colId)) {
            return createValueObjectNoTotal(params.data.orders, params.data.clicks);
        }
        if (newMetricsSpliter.unitSessionPercentage.includes(params.colDef.colId)) {
            return params.data.unitSessionPercentage;
        }

        if (newMetricsSpliter.cpc.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.spend, params.data.clicks);
        }
        if (newMetricsSpliter.budget.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.budget);
        };

        if (newMetricsSpliter.NTBPercentageOrders.includes(params.colDef.colId)) {
            return createValueObjectNoTotal(params.data.orders - params.data.ntbOrders, params.data.orders);
        }

        if (newMetricsSpliter.NTBPercentageSales.includes(params.colDef.colId)) {
            return createValueObjectNoTotal(params.data.sales - params.data.ntbSales, params.data.sales);
        }

        if (newMetricsSpliter.sessionPercentage.includes(params.colDef.colId)) {
            return params.data.sessionPercentage;
        }

        if (newMetricsSpliter.totalPageViews.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.pageViews);
        }
        if (newMetricsSpliter.pageViewPercentage.includes(params.colDef.colId)) {
            return params.data.pageViewsPercentage;
        }

        if (newMetricsSpliter.unitSessionPercentageB2B.includes(params.colDef.colId)) {
            return params.data.unitSessionPercentageB2b;
        }
        if (newMetricsSpliter.viewableImpressions.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.viewableImpressions);
        };
        if (newMetricsSpliter.vcpm.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.spend, params.data.viewableImpressions / 1000);
        };

        if (newMetricsSpliter.orderItemSessionPercentage.includes(params.colDef.colId)) {
            return createValueObjectNoTotal(params.data.totalOrderItems, params.data.sessions);
        };
        if (newMetricsSpliter.orderItemSessionPercentageB2b.includes(params.colDef.colId)) {
            return createValueObjectNoTotal(params.data.totalOrderItemsB2b, params.data.sessions);
        };
        if (newMetricsSpliter.averageOfferCount.includes(params.colDef.colId)) {
            return dataFormatterNoTotal(params.data.averageOfferCount);
        };

        if (newMetricsSpliter.averageSalesPerOrder.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.orderedProductSales, params.data.totalOrderItems);
        };
        if (newMetricsSpliter.averageSalesPerOrderB2B.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.orderedProductSalesB2b, params.data.totalOrderItemsB2b);
        };
        if (newMetricsSpliter.averageUnitPerOrder.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.unitsOrdered, params.data.totalOrderItems);
        };
        if (newMetricsSpliter.averageUnitPerOrderB2B.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.unitsOrderedB2b, params.data.totalOrderItemsB2b);
        };
        if (newMetricsSpliter.averageSellingPrice.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.orderedProductSales, params.data.unitsOrdered);
        };
        if (newMetricsSpliter.averageSellingPriceB2B.includes(params.colDef.colId)) {
            return createValueObjectNoTotalWithoutPercentageNoTotal(params.data.orderedProductSalesB2b, params.data.unitsOrderedB2b);
        };

        if (newMetricsSpliter.topOfsearchIs.includes(params.colDef.colId)) {
            let newParam = '';


            try {
                if (params.data.topofsearchIs.includes('%')) {
                    newParam = params.data.topofsearchIs.replace('%', '');
                } else {
                    newParam = params.data.topofsearchIs;
                }

                if (!isNaN(Number(newParam))) {
                    return averageDataFormatter(Number(newParam));
                } else {
                    return stringFormatter(params.data.topofsearchIs);
                }
            } catch (err) {
                return stringFormatter('No Data');
            }

        };

    }
}


export { MainTableRow };