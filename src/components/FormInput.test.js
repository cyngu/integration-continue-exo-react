import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "./FormInput";

describe("FormInput", () => {
  const setup = (props = {}) => {
    render(<FormInput {...props} />);
  };

  test("renders the input field with a label", () => {
    setup({
      label: "Email",
      type: "email",
      name: "email",
      value: "",
      onChange: jest.fn(),
    });

    const labelElement = screen.getByText(/Email/i);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByRole("textbox", {name: /Email/i});
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "email");
  });

  test("displays an error message when provided", () => {
    setup({
      label: "Email",
      type: "email",
      name: "email",
      value: "",
      onChange: jest.fn(),
      error: "Invalid email address",
    });

    const errorElement = screen.getByText(/Invalid email address/i);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("text-sm text-red-500 mt-1");
  });
});
