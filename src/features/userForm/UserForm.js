import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  isUnderage,
  isValidEmail,
  isValidName,
  isValidZipcode,
} from "./UserFormService";
import FormInput from "../../components/FormInput";

/**
 * UserForm component handles the form input and validation for user data.
 * It stores form data saves data in the local storage.
 * @component
 */
function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    zipCode: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Handles form input changes and updates.
   * @param {Object} e - The event object from the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Validates the form data fields and returns an object with validation errors.
   * @returns {Object} errors - An object containing validation error messages for each field.
   */
  const handleValidation = () => {
    const errors = {};

    if (!isValidName(formData.firstName)) {
      errors.firstName = "Votre prénom n'est pas dans un format valide.";
    }

    if (!isValidName(formData.lastName)) {
      errors.lastName = "Votre nom n'est pas dans un format valide.";
    }

    if (!isValidEmail(formData.email)) {
      errors.email = "Votre email n'est pas dans un format valide.";
    }

    if (isUnderage(formData.birthDate)) {
      errors.birthDate = "Vous devez avoir au moins 18 ans pour vous inscrire.";
    }

    if (!isValidName(formData.city)) {
      errors.city = "Votre ville n'est pas dans un format valide.";
    }

    if (!isValidZipcode(formData.zipCode)) {
      errors.zipCode = "Votre code postal n'est pas dans un format valide.";
    }

    return errors;
  };

  /**
   * Handles form submission, validates form data, stores it in localStorage if valid, and clears the form.
   * @param {Object} e - The event object from the form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire :", formData);

    const validationErrors = handleValidation();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Certaines données ne sont pas dans le correct format !");
      return;
    }

    localStorage.setItem("formData", JSON.stringify(formData));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      city: "",
      zipCode: "",
    });

    toast.success("Données enregistrées dans le localStorage !");
  };

  /**
   * useEffect hook that checks if the form is complete by verifying if all fields are filled.
   * Updates the `isFormComplete` state.
   */
  useEffect(() => {
    const isComplete = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    setIsFormComplete(isComplete);
  }, [formData]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Formulaire d'utilisateur
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Nom"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          className="w-full"
          required="true"
        />
        <FormInput
          label="Prénom"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          className="w-full"
          required="true"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          className="w-full"
          required="true"
        />
        <FormInput
          label="Date de naissance"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          error={errors.birthDate}
          className="w-full"
          required="true"
        />
        <FormInput
          label="Ville"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          className="w-full"
          required="true"
        />
        <FormInput
          label="Code postal"
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          error={errors.zipCode}
          className="w-full"
          required="true"
        />

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white ${
            isFormComplete ? "bg-blue-900 hover:bg-blue-950" : "bg-gray-300"
          }`}
          disabled={!isFormComplete}
        >
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default UserForm;
