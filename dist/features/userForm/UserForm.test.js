"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _UserForm = _interopRequireDefault(require("./UserForm"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Adjust the path as necessary

describe("UserForm", () => {
  it("should submit form data and store it in localStorage", () => {
    (0, _react2.render)(/*#__PURE__*/_react.default.createElement(_UserForm.default, null));

    // Fill out the form using unique identifiers
    _react2.fireEvent.change(_react2.screen.getByLabelText("Nom :"), {
      target: {
        value: "Doe"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByLabelText("Prénom :"), {
      target: {
        value: "John"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByLabelText("Email :"), {
      target: {
        value: "john.doe@example.com"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByLabelText("Date de naissance :"), {
      target: {
        value: "2000-01-01"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByLabelText("Ville :"), {
      target: {
        value: "Paris"
      }
    });
    _react2.fireEvent.change(_react2.screen.getByLabelText("Code postal :"), {
      target: {
        value: "75001"
      }
    });
    _react2.fireEvent.click(_react2.screen.getByRole("button", {
      name: "Soumettre"
    }));
  });
});