import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { isUnderage, isValidEmail, isValidName, isValidZipcode, } from "./UserFormService";
import { UserApiService } from "../../api/UserApiService";
import FormInput from "../../components/FormInput";


/**
 * UserForm component handles the form input and validation for user data.
 * It stores form data saves data in the local storage.
 * @component
 */
function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    name: "",
    email: "",
    password: "",
    birthDate: "",
    city: "",
    zipcode: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles form input changes and updates.
   * @param {Object} e - The event object from the input field.
   */
  const handleChange = (e) => {
    const {name, value} = e.target;
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

    if (!isValidName(formData.name)) {
      errors.name = "Votre nom n'est pas dans un format valide.";
    }

    if (!isValidName(formData.firstname)) {
      errors.firstname = "Votre prénom n'est pas dans un format valide.";
    }

    if (!isValidEmail(formData.email)) {
      errors.email = "Votre email n'est pas dans un format valide.";
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (isUnderage(formData.birthDate)) {
      errors.birthDate = "Vous devez avoir au moins 18 ans pour vous inscrire.";
    }

    if (!isValidName(formData.city)) {
      errors.city = "Votre ville n'est pas dans un format valide.";
    }

    if (!isValidZipcode(formData.zipcode)) {
      errors.zipcode = "Votre code postal n'est pas dans un format valide.";
    }

    return errors;
  };

  /**
   * Handles form submission, validates form data, stores it in localStorage if valid, and clears the form.
   * @param {Object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = handleValidation();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Certaines données n'ont pas le correct format !");
      return;
    }

    setIsLoading(true);

    try {
      //TODO verify password
      const userData = {
        ...formData,
        birthDate: new Date(formData.birthDate).toISOString(),
      };

      await UserApiService.registerUser(userData);

      const users = await UserApiService.getAllUsers();

      toast.success("Inscription réussie !");
      navigate('/integration-continue-exo-react/users', {state: {users}});

    } catch (error) {
      toast.error(error.message || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg" data-testid="user-form">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Formulaire d'inscription
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Nom"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          className="w-full"
        />
        <FormInput
          label="Prénom"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          error={errors.firstname}
          className="w-full"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          className="w-full"
        />
        <FormInput
          label="Mot de passe"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          className="w-full"
        />
        <FormInput
          label="Date de naissance"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          error={errors.birthDate}
          className="w-full"
        />
        <FormInput
          label="Ville"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          className="w-full"
        />
        <FormInput
          label="Code postal"
          type="text"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          error={errors.zipcode}
          className="w-full"
        />

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white ${
            isFormComplete && !isLoading
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300"
          }`}
          disabled={!isFormComplete || isLoading}
        >
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <Link
          to="/integration-continue-exo-react/login"
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Déjà un compte ? Connectez-vous ici
        </Link>
      </div>
    </div>
  );
}

export default UserForm;