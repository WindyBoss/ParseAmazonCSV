// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5Q7uF":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "f95fbaf95d427d07";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"emowe":[function(require,module,exports) {
var _notiflixNotifyAio = require("notiflix/build/notiflix-notify-aio");
var _spinJs = require("spin.js");
// import '../scss/main.scss';
var _refs = require("./refs");
var _spin = require("./style-components/spin");
var _loadingModal = require("./style-components/loading-modal");
var _uploadCSV = require("./uploadCSV");
var _secondTableSetPlugin = require("./secondTableSetPlugin");
var _btnSwitch = require("./style-components/btn-switch");
/*------ Spinner Set-up ------*/ // const waitSpinnerContainer = document.querySelector('[data-loading]');
// const waitSpinner = new Spinner(spinnerOptions).spin(document.querySelector('.waiting-module-window-spin'));
// const loadingModal = new LoadingModal(waitSpinnerContainer);
// parseCsv.getCsv();
/*------- Object --------------*/ // loadingModal.hideModal();
const tableDOMelements = new _btnSwitch.DOMTableElementManagement({
    inputSelector: _refs.refsSecondGrid.fileInput,
    sendBtnSelector: _refs.refsSecondGrid.fileBtn,
    resetBtnSelector: _refs.refsSecondGrid.btnReset,
    containerSelector: _refs.refsSecondGrid.gridDiv,
    tableShowSelector: 'table-shown'
});
// /*------- Table Making --------------*/
function setTablePlugin() {
    const firstTable = new _secondTableSetPlugin.TableSet({
        container: _refs.refsSecondGrid.gridDiv,
        data: _uploadCSV.parsedata,
        columnFilterContainer: _refs.refsSecondGrid.columnFilterContainer,
        quickFilterId: '#quickFilter-two'
    });
    return firstTable;
}
function postTable() {
    const tablePlugin = setTablePlugin();
    try {
        tablePlugin._postTable();
        // clearFileInput();
        tableDOMelements._blockElement(_refs.refsSecondGrid.fileBtn);
        tableDOMelements._tablePost();
        switchOnResetBtn();
        tableDOMelements._changeElWidth(_refs.refsFirstGrid.gridDiv, '49%');
        tablePlugin._showTableData();
        _refs.refsSecondGrid.columnFilterContainer.addEventListener('click', removeColumn);
    } catch (error) {
        _notiflixNotifyAio.Notify.failure('Sorry, something went wrong, please reset the table and try again');
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
    _uploadCSV.parseCsv.getCsv('dealCsv-two');
    // loadingModal.showModal();
    tableDOMelements._switchOnElement(_refs.refsSecondGrid.fileBtn);
    if (e.target.value !== '') {
        tableDOMelements._switchOnElement(_refs.refsSecondGrid.fileBtn);
        setTimeout(()=>{
            _refs.refsSecondGrid.fileBtn.addEventListener('click', postTable);
        }, 500);
    // loadingModal.hideModal();
    }
}
function clearFileInput() {
    tableDOMelements._clearInput();
    _refs.refsSecondGrid.fileInput.classList.add('is-hidden');
}
function switchOnResetBtn() {
    tableDOMelements._switchOnElement(_refs.refsSecondGrid.btnReset);
    _refs.refsSecondGrid.btnReset.addEventListener('click', tableReset);
}
function tableReset() {
    const tablePlugin = setTablePlugin();
    tableDOMelements._tableReset();
    tablePlugin._clearTable();
    _uploadCSV.parseCsv.dataReset(_uploadCSV.parsedata);
    tableDOMelements._blockElement(_refs.refsSecondGrid.fileBtn);
    tableDOMelements._changeElWidth(_refs.refsFirstGrid.gridDiv, '100%');
    _refs.refsSecondGrid.fileInput.classList.remove('is-hidden');
}
/*------- Add EventListeners --------------*/ _refs.refsSecondGrid.fileInput.addEventListener('input', allowBtn);
_refs.refsSecondGrid.tableClearSelectBtn.addEventListener('click', clearSelection);
_refs.refsSecondGrid.tableDeleteSelection.addEventListener('click', deleteSelected);
_refs.refsSecondGrid.tableQuickFilterInput.addEventListener('input', quickFilter);
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
} // refs.fileBtnTwo.addEventListener('click', postSecondTable);
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

},{"notiflix/build/notiflix-notify-aio":"heCpW","spin.js":"kKL8g","./refs":"cfXjd","./style-components/spin":"aLrfe","./style-components/loading-modal":"edOxH","./uploadCSV":"ebRpn","./secondTableSetPlugin":"4PYs7","./style-components/btn-switch":"dyxwx"}],"4PYs7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TableSet", ()=>TableSet
);
var _mainRow = require("./table-elements-plugin/mainRow");
var _tableCells = require("./table-elements-plugin/table-cells");
var _cellConverter = require("./table-elements-plugin/cell/cell-converter");
var _notiflixNotifyAio = require("notiflix/build/notiflix-notify-aio");
var _spin = require("./style-components/spin");
const mainRow = new _mainRow.MainTableRow();
const dataRow = new _tableCells.SimpleRow();
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
    chartThemes: [
        'ag-pastel',
        'ag-material-dark',
        'ag-vivid-dark',
        'ag-solar'
    ],
    // onFirstDataRendered: onFirstDataRendered,
    // pagination: true,  -> impossible with dragging rows
    // 10 rows per page (default is 100)
    paginationPageSize: 50,
    sideBar: {
        toolPanels: [
            {
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
        customLoadingCellRenderer: _spin.CustomLoadingCellRenderer
    },
    loadingCellRenderer: 'customLoadingCellRenderer',
    loadingCellRendererParams: {
        loadingMessage: 'One moment please...',
        footerValueGetter: 'myFooterValueGetter'
    },
    autoGroupColumnDef: {
        minWidth: 300,
        cellRendererParams: {
            innerRenderer: (params)=>{
                if (params.node.footer) {
                    const isRootLevel = params.node.level === -1;
                    if (isRootLevel) return `<span style="color:red; font-weight:bold background-color:green">Grand Total</span>`;
                    return `<span style="color:blue background-color:green">Sub Total ${params.value}</span>`;
                }
                return params.value;
            }
        }
    }
};
class TableSet {
    constructor({ container , data , columnFilterContainer , quickFilterId ,  }){
        this._data = data;
        this._dataConverter = {
        };
        this._table = [];
        this._tableHeaderList = [];
        this._tableColumnValues = [];
        this._container = container;
        this._tableDataContainer = {
        };
        this._columnFilterContainer = columnFilterContainer;
        this._quickFilterId = quickFilterId;
        this._removedColumns = [];
    }
    _setHeaderList() {
        this._tableHeaderList = this._table[0];
    }
    _setTableRowPlugin() {
        this._dataConverter = new _cellConverter.MakeTableRow({
            data: this._data
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
        labels.map((label)=>{
            this._columnFilterContainer.insertAdjacentHTML('afterbegin', label);
        });
    }
    _removeColumn(columnId) {
        const newColumnDefs = [];
        const newColumnTitles = [];
        const allColumns = [];
        const remadeColumnId = this.fieldNameConfig(columnId);
        gridOptions.columnDefs.forEach((column)=>{
            allColumns.push(column.field);
            if (remadeColumnId === column.field && !removedColumns.includes(remadeColumnId)) removedColumns.push(column.field);
            else if (removedColumns.includes(remadeColumnId) && column.field === remadeColumnId) {
                newColumnTitles.push(column.field);
                removedColumns.splice(removedColumns.indexOf(`${column.field}`, 1));
            } else if (removedColumns.includes(column.field)) newColumnTitles.splice(newColumnTitles.indexOf(`${column.field}`, 1));
            else newColumnTitles.push(column.field);
        });
        allColumns.forEach((columnName)=>{
            if (!newColumnTitles.includes(columnName) && !removedColumns.includes(columnName)) newColumnTitles.push(columnName);
        });
        gridOptions.columnDefs.forEach((column)=>{
            if (newColumnTitles.includes(column.field)) newColumnDefs.push(column);
        });
        gridOptions.api.setColumnDefs(newColumnDefs);
    }
    fieldNameConfig(str) {
        let newStr = String(str);
        newStr = newStr.replace('(USD)', '');
        newStr = newStr.replace('(EUR)', '');
        newStr = newStr.replace('-', ' ');
        for (let letter of newStr)if (letter === '(' || letter === ')' || letter === '-') newStr = newStr.replace(letter, '').trim();
        for (let letter1 of newStr){
            if (letter1 === '(' || letter1 === ')' || letter1 === '-') newStr = newStr.replace(letter1, '').trim();
            newStr = newStr.replace('  ', ' ').trim();
        }
        const splitStr = newStr.toLowerCase().split(" ");
        for(let i = 0; i < splitStr.length; i++){
            if (i > 0) splitStr[i] = splitStr[i][0].toUpperCase() + splitStr[i].substr(1);
            else splitStr[i] = splitStr[i].toLowerCase();
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
            checkbox: this._checkboxSelection
        };
        gridOptions.defaultColDef = {
            headerCheckboxSelection: this._isFirstColumn,
            checkboxSelection: this._isFirstColumn
        };
        new agGrid.Grid(this._container, gridOptions);
    }
    _getData() {
        return mainRow.getRowConfig();
    }
    _checkboxSelection(params) {
        return params.node.group === true;
    }
    _isFirstColumn(params1) {
        const displayedColumns = params1.columnApi.getAllDisplayedColumns();
        const thisIsFirstColumn = displayedColumns[0] === params1.column;
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
            if (!selectedRows || selectedRows.length === 0) _notiflixNotifyAio.Notify.failure('No rows selected');
            gridOptions.api.deselectAll();
        } catch (error) {
            _notiflixNotifyAio.Notify.failure('No file detected');
            return;
        }
    }
    _deleteSelected() {
        try {
            const api = gridOptions.api;
            const selectedRows = api.getSelectedRows();
            if (!selectedRows || selectedRows.length === 0) _notiflixNotifyAio.Notify.failure('No rows selected');
            else this._timeOperation('Delete', function() {
                api.applyTransaction({
                    remove: selectedRows
                });
            });
        } catch (error) {
            _notiflixNotifyAio.Notify.failure('No file detected');
            return;
        }
    }
    _timeOperation(name, operation) {
        // var start = new Date().getTime();
        operation();
    // var end = new Date().getTime();
    }
}

},{"./table-elements-plugin/mainRow":"dJaJI","./table-elements-plugin/table-cells":"kPN7M","./table-elements-plugin/cell/cell-converter":"7fWb7","notiflix/build/notiflix-notify-aio":"heCpW","./style-components/spin":"aLrfe","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["5Q7uF","emowe"], "emowe", "parcelRequired7c6")

//# sourceMappingURL=index.5d427d07.js.map
