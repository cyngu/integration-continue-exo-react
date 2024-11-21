import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UserForm from "./UserForm"; // Adjust the path as necessary
import { toast } from "react-toastify";
import { UserAPI } from "./api.service";


jest.mock("./api.service", () => ({
  UserAPI: {
    createUser: jest.fn(),
  },
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("UserForm", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("should submit form data, store it in localStorage, and show a success toast", async () => {
    render(<UserForm />);

    fireEvent.change(screen.getByLabelText("Nom"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Prénom"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Date de naissance"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Ville"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText("Code postal"), {
      target: { value: "75001" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Soumettre" }));



    await waitFor(() => {
      expect(UserAPI.createUser).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        birthDate: "2000-01-01",
        city: "Paris",
        zipCode: "75001",
      });
      expect(toast.success).toHaveBeenCalledWith("Données enregistrées dans le localStorage !");
    });
  });

  it("should show an error toast when the form data is invalid", async () => {
    render(<UserForm />);

    fireEvent.change(screen.getByLabelText("Nom"), {
      target: { value: "ng[" },
    });
    fireEvent.change(screen.getByLabelText("Prénom"), {
      target: { value: "gh{" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText("Date de naissance"), {
      target: { value: "2010-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Ville"), {
      target: { value: "<sefs<" },
    });
    fireEvent.change(screen.getByLabelText("Code postal"), {
      target: { value: "5458a" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Soumettre" }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Certaines données n'ont pas le correct format !"
      )
    );
    expect(UserAPI.createUser).not.toHaveBeenCalled();
  });

  it("should show an error toast when API call fails", async () => {
    // Mock the API call to fail
    const errorMessage = "API Error";
    UserAPI.createUser.mockRejectedValueOnce(new Error(errorMessage));

    render(<UserForm />);

    fireEvent.change(screen.getByLabelText("Nom"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Prénom"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Date de naissance"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Ville"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText("Code postal"), {
      target: { value: "75001" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Soumettre" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
          "Une erreur est survenue lors de la création de l'utilisateur"
      );
    });
  });
});
