import React, { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    zipCode: "",
  });

  const isUnderage = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      return age < 18;
    }
    return age < 18;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailPattern.test(email))
    return emailPattern.test(email);
  };

  const isValidName = (name) => {
    const namePattern = new RegExp('^[A-Za-zÀ-ÿ]+(\\s[A-Za-zÀ-ÿ]+)?$'); // Allow letters, spaces, apostrophees, dashes
    return namePattern.test(name);
  };

  const isValidZipcode = (zipcode) => {
    const zipcodePattern = /^[0-9]{5}$/;
    return zipcodePattern.test(zipcode);
};

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

    if(!isValidName(formData.firstName)) {
      alert("Votre prénom n'est pas dans un format valide.")
    }

    if(!isValidName(formData.lastName)) {
      alert("Votre nom n'est pas dans un format valide.")
    }

    if(!isValidEmail(formData.email)) {
      alert("Votre email n'est pas dans un format valide.")
    }

    if (isUnderage(formData.birthDate)) {
      alert('Vous devez avoir au moins 18 ans pour vous inscrire.');
      return;
    }

    if (!isValidZipcode(formData.zipCode)) {
      alert("Votre code postal n'est pas dans un format valide.");
      return;
    }
    
    localStorage.setItem("formData", JSON.stringify(formData));

    alert("Enregistré dans le LocalStorage");
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
