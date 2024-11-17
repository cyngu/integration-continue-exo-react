"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
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
 */
function FormInput(_ref) {
  let {
    label,
    type,
    name,
    value,
    onChange,
    error
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: name
  }, label), /*#__PURE__*/_react.default.createElement("input", {
    id: name,
    type: type,
    name: name,
    value: value,
    onChange: onChange
  }), error && /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: "red"
    }
  }, error));
}
var _default = exports.default = FormInput;