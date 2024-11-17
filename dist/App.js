"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _logo = _interopRequireDefault(require("./logo.svg"));
require("./App.css");
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var _UserForm = _interopRequireDefault(require("./features/userForm/UserForm"));
var _Counter = _interopRequireDefault(require("./features/counter/Counter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO subscribers list

function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/React.createElement("img", {
    src: _logo.default,
    className: "App-logo",
    alt: "logo"
  }), /*#__PURE__*/React.createElement("p", null, "Edit ", /*#__PURE__*/React.createElement("code", null, "src/App.js"), " and save to reload."), /*#__PURE__*/React.createElement("a", {
    className: "App-link",
    href: "https://reactjs.org",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Learn React"), /*#__PURE__*/React.createElement(_Counter.default, null), /*#__PURE__*/React.createElement(_UserForm.default, null), /*#__PURE__*/React.createElement(_reactToastify.ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    pauseOnFocusLoss: true,
    theme: "colored"
  })));
}
var _default = exports.default = App;