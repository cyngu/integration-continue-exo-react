/**
 * Checks if the user is under 18 based on their birth date.
 * @param {string} birthDate - The birth date in a valid date string format.
 * @returns {boolean} - Returns `true` if the user is underage (less than 18), otherwise `false`.
 */
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

/**
 * Validates an email address format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns `true` if the email is valid, otherwise `false`.
 */
export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

/**
 * Validates a name format (supports letters, spaces, apostrophes, and dashes).
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns `true` if the name is valid, otherwise `false`.
 */
export const isValidName = (name) => {
  const namePattern = /^[A-Za-zÀ-ÿ'-]+(?:\s[A-Za-zÀ-ÿ'-]+)*$/; // Allow letters, spaces, apostrophes, dashes
  return namePattern.test(name);
};

/**
 * Validates a French zipcode format (must be exactly 5 digits).
 * @param {string} zipcode - The zipcode to validate.
 * @returns {boolean} - Returns `true` if the zipcode is valid, otherwise `false`.
 */
export const isValidZipcode = (zipcode) => {
  const zipcodePattern = /^[0-9]{5}$/;
  return zipcodePattern.test(zipcode);
};
