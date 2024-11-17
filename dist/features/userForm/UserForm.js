"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactToastify = require("react-toastify");
var _UserFormService = require("./UserFormService");
var _FormInput = _interopRequireDefault(require("../../components/FormInput"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * UserForm component handles the form input and validation for user data.
 * It stores form data saves data in the local storage.
 * @component
 */
function UserForm() {
  const [formData, setFormData] = (0, _react.useState)({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    zipCode: ""
  });
  const [isFormComplete, setIsFormComplete] = (0, _react.useState)(false);
  const [errors, setErrors] = (0, _react.useState)({});

  /**
   * Handles form input changes and updates.
   * @param {Object} e - The event object from the input field.
   */
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  /**
   * Validates the form data fields and returns an object with validation errors.
   * @returns {Object} errors - An object containing validation error messages for each field.
   */
  const handleValidation = () => {
    const errors = {};
    if (!(0, _UserFormService.isValidName)(formData.firstName)) {
      errors.firstName = "Votre prénom n'est pas dans un format valide.";
    }
    if (!(0, _UserFormService.isValidName)(formData.lastName)) {
      errors.lastName = "Votre nom n'est pas dans un format valide.";
    }
    if (!(0, _UserFormService.isValidEmail)(formData.email)) {
      errors.email = "Votre email n'est pas dans un format valide.";
    }
    if ((0, _UserFormService.isUnderage)(formData.birthDate)) {
      errors.birthDate = "Vous devez avoir au moins 18 ans pour vous inscrire.";
    }
    if (!(0, _UserFormService.isValidName)(formData.city)) {
      errors.city = "Votre ville n'est pas dans un format valide.";
    }
    if (!(0, _UserFormService.isValidZipcode)(formData.zipCode)) {
      errors.zipCode = "Votre code postal n'est pas dans un format valide.";
    }
    return errors;
  };

  /**
   * Handles form submission, validates form data, stores it in localStorage if valid, and clears the form.
   * @param {Object} e - The event object from the form submission.
   */
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Données du formulaire :", formData);
    const validationErrors = handleValidation();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    localStorage.setItem("formData", JSON.stringify(formData));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      city: "",
      zipCode: ""
    });
    _reactToastify.toast.success("Données enregistrées dans le localStorage !");
  };

  /**
   * useEffect hook that checks if the form is complete by verifying if all fields are filled.
   * Updates the `isFormComplete` state.
   */
  (0, _react.useEffect)(() => {
    const isComplete = Object.values(formData).every(field => field.trim() !== "");
    setIsFormComplete(isComplete);
  }, [formData]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Formulaire d'utilisateur"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_FormInput.default, {
    label: "Nom :",
    type: "text",
    name: "lastName",
    value: formData.lastName,
    onChange: handleChange,
    error: errors.lastName
  }), /*#__PURE__*/_react.default.createElement(_FormInput.default, {
    label: "Pr\xE9nom :",
    type: "text",
    name: "firstName",
    value: formData.firstName,
    onChange: handleChange,
    error: errors.firstName
  }), /*#__PURE__*/_react.default.createElement(_FormInput.default, {
    label: "Email :",
    type: "email",
    name: "email",
    value: formData.email,
    onChange: handleChange,
    error: errors.email
  }), /*#__PURE__*/_react.default.createElement(_FormInput.default, {
    label: "Date de naissance :",
    type: "date",
    name: "birthDate",
    value: formData.birthDate,
    onChange: handleChange,
    error: errors.birthDate
  }), /*#__PURE__*/_react.default.createElement(_FormInput.default, {
    label: "Ville :",
    type: "text",
    name: "city",
    value: formData.city,
    onChange: handleChange
  }), /*#__PURE__*/_react.default.createElement(_FormInput.default, {
    label: "Code postal :",
    type: "text",
    name: "zipCode",
    value: formData.zipCode,
    onChange: handleChange,
    error: errors.zipCode
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    disabled: !isFormComplete
  }, "Soumettre")));
}
var _default = exports.default = UserForm;