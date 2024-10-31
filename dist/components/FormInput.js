"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * FormInput component renders an input field with an optional error message.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.type - The type of the input field (e.g., "text", "email", "date").
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - The function to call when the input value changes.
 * @param {string} [props.error] - Optional error message to display below the input field.
 */function FormInput(_ref) {
  let {
    label,
    type,
    name,
    value,
    onChange,
    error
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      htmlFor: name,
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      id: name,
      type: type,
      name: name,
      value: value,
      onChange: onChange
    }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: {
        color: "red"
      },
      children: error
    })]
  });
}
var _default = exports.default = FormInput;