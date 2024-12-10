import {act, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersList from './UsersList';

const mockGetAllUsers = jest.fn();
const mockLogout = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../services/UserApiService', () => ({
    UserApiService: {
        getAllUsers: () => mockGetAllUsers()
    }
}));

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}));

jest.mock('../services/AuthService', () => ({
    AuthService: {
        logout: () => mockLogout()
    }
}));

describe('UsersList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockGetAllUsers.mockResolvedValue([]);
    });

    it('renders loading state initially', async () => {
        mockGetAllUsers.mockImplementation(() => new Promise(() => {
        }));

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

        const logoutButton = await screen.findByText(/Déconnexion/i);
        await userEvent.click(logoutButton);

        expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/integration-continue-exo-react');
    });
});