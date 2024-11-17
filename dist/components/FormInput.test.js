"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _FormInput = _interopRequireDefault(require("./FormInput"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe("FormInput", () => {
  const setup = function () {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _react2.render)(/*#__PURE__*/_react.default.createElement(_FormInput.default, props));
  };
  test("renders the input field with a label", () => {
    setup({
      label: "Email",
      type: "email",
      name: "email",
      value: "",
      onChange: jest.fn()
    });

    // Vérifie si le label est affiché
    const labelElement = _react2.screen.getByText(/Email/i);
    expect(labelElement).toBeInTheDocument();

    // Vérifie si le champ d'entrée est affiché
    const inputElement = _react2.screen.getByRole("textbox", {
      name: /Email/i
    });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "email");
  });
  test("displays an error message when provided", () => {
    setup({
      label: "Email",
      type: "email",
      name: "email",
      value: "",
      onChange: jest.fn(),
      error: "Invalid email address"
    });
    const errorElement = _react2.screen.getByText(/Invalid email address/i);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveStyle({
      color: "red"
    });
  });
});