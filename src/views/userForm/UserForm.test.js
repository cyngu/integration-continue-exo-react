import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";


const mockRegisterUser = jest.fn();
jest.mock('../../api/UserApiService', () => ({
  UserApiService: {
    registerUser: (...args) => mockRegisterUser(...args)
  }
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: ({children}) => <a>{children}</a>
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}));


describe("UserForm", () => {
  let navigate;
  beforeEach(() => {
    jest.clearAllMocks();
    mockRegisterUser.mockClear();
  });

  it("should submit form data successfully and redirect", async () => {
    mockRegisterUser.mockResolvedValueOnce({success: true});

    render(<UserForm/>);

    fireEvent.change(screen.getByLabelText(/Nom/), {
      target: {value: "Doe"},
    });
    fireEvent.change(screen.getByLabelText(/Prénom/), {
      target: {value: "John"},
    });
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: {value: "john.doe@example.com"},
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: {value: "password123"},
    });
    fireEvent.change(screen.getByLabelText(/Date de naissance/), {
      target: {value: "2000-01-01"},
    });
    fireEvent.change(screen.getByLabelText(/Ville/), {
      target: {value: "Paris"},
    });
    fireEvent.change(screen.getByLabelText(/Code postal/), {
      target: {value: "75001"},
    });

    fireEvent.click(screen.getByText(/S'inscrire/));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        name: "Doe",
        firstname: "John",
        email: "john.doe@example.com",
        password: "password123",
        birthDate: new Date("2000-01-01").toISOString(), // Assurez-vous que le format est correct
        city: "Paris",
        zipcode: "75001"
      });
    });
  });


  it("should show validation errors for invalid data", async () => {
    render(<UserForm/>);

    fireEvent.change(screen.getByLabelText(/Nom/), {
      target: {value: "D@e"},
    });
    fireEvent.change(screen.getByLabelText(/Prénom/), {
      target: {value: "John23"},
    });
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: {value: "invalid-email"},
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: {value: "pass"},
    });
    fireEvent.change(screen.getByLabelText(/Date de naissance/), {
      target: {value: "2010-01-01"},
    });
    fireEvent.change(screen.getByLabelText(/Ville/), {
      target: {value: "Paris1"},
    });
    fireEvent.change(screen.getByLabelText(/Code postal/), {
      target: {value: "abcde"},
    });

    fireEvent.click(screen.getByText(/S'inscrire/));

    await waitFor(() => {
      expect(screen.getByText("Votre nom n'est pas dans un format valide.")).toBeInTheDocument();
      expect(screen.getByText("Votre email n'est pas dans un format valide.")).toBeInTheDocument();
      expect(screen.getByText("Vous devez avoir au moins 18 ans pour vous inscrire.")).toBeInTheDocument();
    });
  });


  it("should enable submit button when form is complete", async () => {
    render(<UserForm/>);

    const submitButton = screen.getByText(/S'inscrire/);
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/Nom/), {
      target: {value: "Doe"},
    });
    fireEvent.change(screen.getByLabelText(/Prénom/), {
      target: {value: "John"},
    });
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: {value: "john.doe@example.com"},
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: {value: "password123"},
    });
    fireEvent.change(screen.getByLabelText(/Date de naissance/), {
      target: {value: "2000-01-01"},
    });
    fireEvent.change(screen.getByLabelText(/Ville/), {
      target: {value: "Paris"},
    });
    fireEvent.change(screen.getByLabelText(/Code postal/), {
      target: {value: "75001"},
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });


  it("should handle registration failure", async () => {
    mockRegisterUser.mockRejectedValueOnce(new Error("Erreur lors de l'inscription"));
    const toastError = jest.spyOn(require('react-toastify').toast, 'error');

    render(<UserForm/>);

    fireEvent.change(screen.getByLabelText(/Nom/), {
      target: {value: "Doe"},
    });
    fireEvent.change(screen.getByLabelText(/Prénom/), {
      target: {value: "John"},
    });
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: {value: "john.doe@example.com"},
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/), {
      target: {value: "password123"},
    });
    fireEvent.change(screen.getByLabelText(/Date de naissance/), {
      target: {value: "2000-01-01"},
    });
    fireEvent.change(screen.getByLabelText(/Ville/), {
      target: {value: "Paris"},
    });
    fireEvent.change(screen.getByLabelText(/Code postal/), {
      target: {value: "75001"},
    });

    fireEvent.click(screen.getByText(/S'inscrire/));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Erreur lors de l'inscription");
      expect(mockRegisterUser).toHaveBeenCalledWith(expect.objectContaining({
        name: "Doe",
        firstname: "John",
        email: "john.doe@example.com",
        password: "password123",
        birthDate: expect.any(String),
        city: "Paris",
        zipcode: "75001"
      }));
    });
  });
});