exports.ids = [0];
exports.modules = {

/***/ "./Components/Layout/FooterNav.js":
/*!****************************************!*\
  !*** ./Components/Layout/FooterNav.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_row_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/row/style/css */ "antd/lib/row/style/css");
/* harmony import */ var antd_lib_row_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_row_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/row */ "antd/lib/row");
/* harmony import */ var antd_lib_row__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_row__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_col_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/col/style/css */ "antd/lib/col/style/css");
/* harmony import */ var antd_lib_col_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_col_style_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_col__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/col */ "antd/lib/col");
/* harmony import */ var antd_lib_col__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_col__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../style.css */ "./style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_5__);




var _jsxFileName = "/Users/zhangwei/Desktop/kanseefoil/Components/Layout/FooterNav.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var array = [{
  title: "IT基础",
  items: [{
    name: "网络通信",
    link: "/doc/internet/index"
  }, {
    name: "JavaScript",
    link: "/doc/javascript/index"
  }, {
    name: "Github",
    link: "/doc/github/index"
  }, {
    name: "shell",
    link: "/doc/shell/index"
  }, {
    name: "Webpack",
    link: "/doc/webpack/index"
  }]
}, {
  title: "关于嘉竹文库",
  items: [{
    name: "作者简介",
    link: "/author"
  }, {
    name: "设计文档",
    link: "/doc/architecture/index"
  }, {
    name: "后台展示",
    link: "/monitor"
  }, {
    name: "NEXT7",
    link: "/doc/next7/index"
  }]
}, {
  title: "更多技术",
  items: [{
    name: "less",
    link: "/doc/less/index"
  }, {
    name: "React 高级用法",
    link: "/doc/react/index"
  }, {
    name: "算法",
    link: "/doc/algorithm/index"
  }, {
    name: "React Native Navigator",
    link: "/doc/react-native-navigator/Getting-started"
  }]
}, {
  title: "联系我们",
  items: [{
    name: "Email: kanseefoil@gmail.com",
    link: "/author"
  }]
}];

var FooterNav =
/*#__PURE__*/
function (_Component) {
  _inherits(FooterNav, _Component);

  function FooterNav() {
    _classCallCheck(this, FooterNav);

    return _possibleConstructorReturn(this, _getPrototypeOf(FooterNav).apply(this, arguments));
  }

  _createClass(FooterNav, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        className: "footer",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        className: "footer-content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_row__WEBPACK_IMPORTED_MODULE_1___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        },
        __self: this
      }, array.map(function (obj) {
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_col__WEBPACK_IMPORTED_MODULE_3___default.a, {
          lg: 6,
          key: obj.title,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("strong", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          },
          __self: this
        }, obj.title)), obj.items.map(function (item) {
          return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("a", {
            href: item.link,
            key: item.name,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 43
            },
            __self: this
          }, item.name));
        }));
      })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("center", {
        style: {
          marginTop: "50px"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }, "\u5609\u7AF9\u6587\u5E93\u7248\u6743\u6240\u6709\xA9 2018 \u5907\u6848\u53F7\uFF1A\u6CAAICP\u590718022274\u53F7-1")));
    }
  }]);

  return FooterNav;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (FooterNav);

/***/ })

};;
//# sourceMappingURL=0.js.map