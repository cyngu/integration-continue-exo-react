export const isUnderage = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age < 18;
  }
  return age < 18;
};

export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const isValidName = (name) => {
  const namePattern = /^[A-Za-zÀ-ÿ'-]+(?:\s[A-Za-zÀ-ÿ'-]+)*$/; // Allow letters, spaces, apostrophees, dashes
  return namePattern.test(name);
};

export const isValidZipcode = (zipcode) => {
  const zipcodePattern = /^[0-9]{5}$/;
  return zipcodePattern.test(zipcode);
};
