"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Counter component that increments a count value each time the button is clicked.
 * @component
 */function Counter() {
  let [count, setCount] = (0, _react.useState)(0);
  const clickOnMe = () => {
    setCount(count + 1);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: clickOnMe,
      children: "Click me"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      "data-testid": "count",
      children: count
    })]
  });
}
var _default = exports.default = Counter;