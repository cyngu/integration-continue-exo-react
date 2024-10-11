import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserForm from "./UserForm"; // Adjust the path as necessary

describe("UserForm", () => {
  it("should submit form data and store it in localStorage", () => {
    render(<UserForm />);

    // Fill out the form using unique identifiers
    fireEvent.change(screen.getByLabelText("Nom :"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Prénom :"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Email :"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Date de naissance :"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Ville :"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText("Code postal :"), {
      target: { value: "75001" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Soumettre" }));
  });
});
