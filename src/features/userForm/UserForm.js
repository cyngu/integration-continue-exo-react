import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {isUnderage, isValidEmail, isValidName, isValidZipcode,} from "./UserFormService";
import FormInput from "../../components/FormInput";
import {UserAPI} from "./api.service";

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = handleValidation();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Certaines données n'ont pas le correct format !");
            return;
        }

        try {
            setIsSubmitting(true);
            await UserAPI.createUser(formData);

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                birthDate: "",
                city: "",
                zipCode: "",
            });

            toast.success("Utilisateur créé avec succès !");
        } catch (error) {
            toast.error("Une erreur est survenue lors de la création de l'utilisateur");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const isComplete = Object.values(formData).every(
            (field) => field.trim() !== ""
        );
        setIsFormComplete(isComplete);
    }, [formData]);

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg" data-testid="user-form">
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
                />
                <FormInput
                    label="Prénom"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
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
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={errors.zipCode}
                    className="w-full"
                />

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg text-white ${
                        isFormComplete ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
                    }`}
                    disabled={!isFormComplete || isSubmitting}
                >
                    {isSubmitting ? "Envoi en cours..." : "Soumettre"}
                </button>
            </form>
        </div>
    );
}

export default UserForm;