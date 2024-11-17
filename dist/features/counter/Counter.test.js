"use strict";

var _react = require("@testing-library/react");
var _App = _interopRequireDefault(require("../../App"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
test("check counter on click me button", () => {
  (0, _react.render)(/*#__PURE__*/React.createElement(_App.default, null));
  const button = _react.screen.getAllByRole("button")[0];
  const counter = _react.screen.getByTestId("count");
  expect(button).toBeInTheDocument();
  expect(counter).toBeInTheDocument();
  expect(counter).toHaveTextContent("0");
  _react.fireEvent.click(button);
  expect(counter).toHaveTextContent("1");
});