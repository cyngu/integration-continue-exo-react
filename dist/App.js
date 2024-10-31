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
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO subscribers list
function App() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("header", {
      className: "App-header",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _logo.default,
        className: "App-logo",
        alt: "logo"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        children: ["Edit ", /*#__PURE__*/(0, _jsxRuntime.jsx)("code", {
          children: "src/App.js"
        }), " and save to reload."]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        className: "App-link",
        href: "https://reactjs.org",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "Learn React"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Counter.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactToastify.ToastContainer, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        pauseOnFocusLoss: true,
        theme: "colored"
      })]
    })
  });
}
var _default = exports.default = App;