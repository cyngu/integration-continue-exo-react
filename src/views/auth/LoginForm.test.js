import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import LoginForm from './LoginForm';
import { AuthApiService } from '../../api/AuthApiService';
import { useNavigate } from "react-router-dom";

jest.mock('../../api/AuthApiService');

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    Link: ({ children }) => <a>{children}</a>
}));

describe('LoginForm', () => {
    let navigate;
    beforeEach(() => {
        jest.clearAllMocks();
        navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
    });

    it('renders the login form', async () => {
        render(<LoginForm />);
        await waitFor(() => {
            expect(screen.getByText(/connexion/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
            const button = screen.getByRole('button', { name: 'Se connecter' });
            expect(button).toBeInTheDocument();
        });
    });

    it('submits the form and shows success message on successful login', async () => {


        AuthApiService.login.mockResolvedValueOnce({success: true});

        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });
        const button = screen.getByRole('button', { name: 'Se connecter' });
        fireEvent.click(button);

        await waitFor(() => {
            expect(AuthApiService.login).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(toast.success).toHaveBeenCalledWith('Connexion réussie !');
            expect(navigate).toHaveBeenCalledWith('/integration-continue-exo-react/users'); //

        });
    });

    it('displays an error message on failed login', async () => {
        AuthApiService.login.mockRejectedValueOnce(new Error('Erreur lors de la connexion'));

        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
        fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'wrong-password' } });
        const button = screen.getByRole('button', { name: 'Se connecter' });

        fireEvent.click(button);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Erreur lors de la connexion');
        });
    });
});
