import React from "react";

function FormInput({ label, type, name, value, onChange, error }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
    </div>
  );
}

export default FormInput;
