function exportToCsv(id, btnId, nameFileCsv, btnDualSubId, btnMainId, btnSecId) {
  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _createForOfIteratorHelper(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
        var i = 0;

        var F = function F() {};

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

    var it,
        normalCompletion = true,
        didErr = false,
        err;
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
        } finally {
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

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var TableCSVExporter = /*#__PURE__*/function () {
    "use strict";

    function TableCSVExporter(table) {
      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _classCallCheck(this, TableCSVExporter);

      this.table = table;
      this.rows = Array.from(table.querySelectorAll('tr'));

      if (!includeHeaders && this.rows[0].querySelectorAll('th').length) {
        this.rows.shift();
      }
    }

    _createClass(TableCSVExporter, [{
      key: "convertToCSV",
      value: function convertToCSV() {
        var lines = [];

        var numCols = this._findLongestRowLength();

        var _iterator = _createForOfIteratorHelper(this.rows),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var row = _step.value;
            var line = '';

            for (var i = 0; i < numCols; i++) {
              if (row.children[i] !== undefined) {
                line += TableCSVExporter.parseCell(row.children[i]);
              }

              line += i !== numCols - 1 ? '#' : '';
            }

            lines.push(line);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return lines.join('\n');
      }
    }, {
      key: "_findLongestRowLength",
      value: function _findLongestRowLength() {
        return this.rows.reduce(function (l, row) {
          return row.childElementCount > l ? row.childElementCount : l;
        }, 0);
      }
    }], [{
      
      key: "parseCell",
      value: function parseCell(tableCell) {
        var parsedValue = tableCell.textContent; // Replace all double quotes with two double quotes
        // parsedValue = parsedValue.replace(/"/g, '""'); // If value contains comma, new-line or double-quote, enclose in double quotes
        // parsedValue = /[",\n]/.test(parsedValue) ? "\"".concat(parsedValue, "\"") : parsedValue;

        return parsedValue;
      }
    }]);

    return TableCSVExporter;
  }();

  function padLeft(value, length = 2) {
    return value.toString().padStart(length, 0);
  }

  function toSrtTime(timestamp) {
    if (isNaN(timestamp)) {
      return timestamp;
    }

    const date = new Date(0, 0, 0, 0, 0, 0, timestamp);
    const hours = padLeft(date.getHours());
    const minutes = padLeft(date.getMinutes());
    const seconds = padLeft(date.getSeconds());
    const ms = timestamp - (hours * 3600000 + minutes * 60000 + seconds * 1000);
    return `${hours}:${minutes}:${seconds},${padLeft(ms, 3)}`;
  }

  function stringify(captions) {
    return captions.map((caption, index) => {
      return (index > 0 ? '\n' : '') + [index + 1, `${toSrtTime(caption.start)} --> ${toSrtTime(caption.end)}`, caption.text].join('\n');
    }).join('\n') + '\n';
  }

  function stringifyDual(captions) {
    return captions.map((caption, index) => {
      return (index > 0 ? '\n' : '') + [index + 1, `${toSrtTime(caption.start)} --> ${toSrtTime(caption.end)}`, caption.text, '--- ' + caption.textSec].join('\n');
    }).join('\n') + '\n';
  }

  var dataTable = document.getElementById(id);
  var btnExportToCsv = document.getElementById(btnId);
  var title = document.querySelector('.title').getAttribute('data-title');

  btnExportToCsv.addEventListener('click', function () {
    var exporter = new TableCSVExporter(dataTable);
    var csvOutput = exporter.convertToCSV();
    var csvBlob = new Blob([csvOutput], {
      type: 'text/csv'
    });
    var blobUrl = URL.createObjectURL(csvBlob);
    var anchorElement = document.createElement('a');
    anchorElement.href = blobUrl;
    anchorElement.download = "".concat(nameFileCsv, ".csv");
    anchorElement.click();
    setTimeout(function () {
      URL.revokeObjectURL(blobUrl);
    }, 500);
  });
  
  var btnExportDualSubToSrt = document.getElementById(btnDualSubId);

  if (btnExportDualSubToSrt) {
    btnExportDualSubToSrt.addEventListener('click', function () {
      const stringDualSub = btnExportDualSubToSrt.getAttribute('data-data')
      
      var _stringDualSub = stringifyDual(JSON.parse(stringDualSub));

      var srtBlob = new Blob([_stringDualSub], {
        type: 'text/plain;charset=windows-1256'
      });
      var blobUrl = URL.createObjectURL(srtBlob);
      var anchorElement = document.createElement('a');
      anchorElement.href = blobUrl;
      anchorElement.download = "".concat(title + '-dual-sub', ".srt");
      anchorElement.click();
      setTimeout(function () {
        URL.revokeObjectURL(blobUrl);
      }, 500);
    });
  }
  
  var btnExportMainToSrt = document.getElementById(btnMainId);

  if (btnExportMainToSrt) {
    btnExportMainToSrt.addEventListener('click', function () {
      const stringMainSub = btnExportMainToSrt.getAttribute('data-data')
      var _stringMainSub = stringify(JSON.parse(stringMainSub));

      var srtBlob = new Blob([_stringMainSub], {
        type: 'text/plain;charset=windows-1256'
      });
      var blobUrl = URL.createObjectURL(srtBlob);
      var anchorElement = document.createElement('a');
      anchorElement.href = blobUrl;
      anchorElement.download = "".concat(title + '-main-sub', ".srt");
      anchorElement.click();
      setTimeout(function () {
        URL.revokeObjectURL(blobUrl);
      }, 500);
    });
  }

  var btnExportSecToSrt = document.getElementById(btnSecId);

  if (btnExportSecToSrt) {
    btnExportSecToSrt.addEventListener('click', function () {
      const stringSecSub = btnExportSecToSrt.getAttribute("data-data")
      var _stringSecSub = stringify(JSON.parse(stringSecSub));

      var srtSecBlob = new Blob([_stringSecSub], {
        type: 'text/plain;charset=windows-1256'
      });
      var blobUrl = URL.createObjectURL(srtSecBlob);
      var anchorElement = document.createElement('a');
      anchorElement.href = blobUrl;
      anchorElement.download = "".concat(title + '-second-sub', ".srt");
      anchorElement.click();
      setTimeout(function () {
        URL.revokeObjectURL(blobUrl);
      }, 500);
    });
  }
}

exportToCsv("dataTable", "btnExportToCsv", "subtitle-export", "btnExportDualSubStr", "btnExportMainToStr", "btnExportSecToStr")