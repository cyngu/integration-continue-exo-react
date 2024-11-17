"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
/**
 * Counter component that increments a count value each time the button is clicked.
 * @component
 */
function Counter() {
  let [count, setCount] = (0, _react.useState)(0);
  const clickOnMe = () => {
    setCount(count + 1);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: clickOnMe
  }, "Click me"), /*#__PURE__*/React.createElement("span", {
    "data-testid": "count"
  }, count));
}
var _default = exports.default = Counter;