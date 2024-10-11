import React from "react";

/**
 * FormInput component renders an input field with an optional error message.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.type - The type of the input field (e.g., "text", "email", "date").
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - The function to call when the input value changes.
 * @param {string} [props.error] - Optional error message to display below the input field.
 */
function FormInput({ label, type, name, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default FormInput;
