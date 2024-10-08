import React, { useState } from "react";
import { toast } from 'react-toastify';
import {
  isUnderage,
  isValidEmail,
  isValidName,
  isValidZipcode,
} from "./UserFormService";

function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire :", formData);

    if (!isValidName(formData.firstName)) {
      alert("Votre prénom n'est pas dans un format valide.");
      return;
    }

    if (!isValidName(formData.lastName)) {
      alert("Votre nom n'est pas dans un format valide.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Votre email n'est pas dans un format valide.");
      return;
    }

    if (isUnderage(formData.birthDate)) {
      alert("Vous devez avoir au moins 18 ans pour vous inscrire.");
      return;
    }

    if (!isValidZipcode(formData.zipCode)) {
      alert("Votre code postal n'est pas dans un format valide.");
      return;
    }

    localStorage.setItem("formData", JSON.stringify(formData));

    toast.success('Données enregistrées dans le localStorage !');
  };

  return (
    <div>
      <h2>Formulaire d'utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date de naissance :</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ville :</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Code postal :</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
}

export default UserForm;
