import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersList from './UsersList';
import {toast} from "react-toastify";

jest.mock('../../api/UserApiService', () => ({
  UserApiService: {
    getAllUsers: () => mockGetAllUsers()
  }
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

jest.mock('../../api/AuthApiService', () => ({
  AuthApiService: {
    logout: () => mockLogout()
  }
}));
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  }
}));

const mockGetAllUsers = jest.fn();
const mockLogout = jest.fn();
const mockNavigate = jest.fn();

describe('UsersList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAllUsers.mockResolvedValue([]);
    mockLogout.mockResolvedValue();
  });

  it('renders loading state initially', async () => {
    mockGetAllUsers.mockImplementation(() => new Promise(() => {}));
    await act(async () => {
      render(<UsersList/>);
    });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders users when fetch succeeds', async () => {
    const mockUsers = [
      {
        _id: '1',
        name: 'John',
        firstname: 'Doe',
        email: 'john@example.com',
        city: 'Paris',
        zipcode: '75001'
      }
    ];
    mockGetAllUsers.mockResolvedValueOnce(mockUsers);
    render(<UsersList/>);
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
      expect(screen.getByText('75001')).toBeInTheDocument();
    });
  });

  it('renders error state when fetch fails', async () => {
    const errorMessage = 'Failed to fetch users';
    mockGetAllUsers.mockRejectedValueOnce(new Error(errorMessage));
    render(<UsersList/>);
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('handles logout', async () => {
    mockGetAllUsers.mockResolvedValueOnce([]);
    render(<UsersList/>);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    const logoutButton = screen.getByText('Déconnexion');
    await act(async () => {
      await userEvent.click(logoutButton);
    });

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/integration-continue-exo-react');
    });
  });
  it('handles logout failure', async () => {
    const errorMessage = 'Logout failed';
    mockLogout.mockRejectedValueOnce(new Error(errorMessage));
    mockGetAllUsers.mockResolvedValueOnce([]);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const toastErrorSpy = jest.spyOn(toast, 'error').mockImplementation(() => {});

    render(<UsersList/>);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    const logoutButton = screen.getByText('Déconnexion');
    await act(async () => {
      await userEvent.click(logoutButton);
    });

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Logout failed:', expect.any(Error));
      expect(toastErrorSpy).toHaveBeenCalledWith('Logout failed');
    });

    consoleErrorSpy.mockRestore();
    toastErrorSpy.mockRestore();
  });


});