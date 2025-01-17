import { act, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock('./views/userForm/UserForm', () => () => (
  <div data-testid="user-form">User Form</div>
));

jest.mock('./views/usersList/UsersList', () => () => (
  <div data-testid="users-list">Users List</div>
));

jest.mock('./views/auth/LoginForm', () => () => (
  <div data-testid="login-form">Login Form</div>
));

jest.mock('./guards/ProtectedRoute', () => ({ children }) => (
  <div data-testid="protected-route">{children}</div>
));

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ path, element }) => <div data-testid={`route-${path}`}>{element}</div>,
  Navigate: ({ to }) => <div data-testid="mock-navigate" data-to={to} />,
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <div data-testid="mock-link">{children}</div>
}));

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.pushState({}, '', '/');
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });

  it("renders the UserForm on the correct route", async () => {
    window.history.pushState({}, '', '/integration-continue-exo-react');

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('user-form')).toBeInTheDocument();
  });

  it("renders the LoginForm on the login route", async () => {
    window.history.pushState({}, '', '/integration-continue-exo-react/login');

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it("renders the UsersList within ProtectedRoute", async () => {
    window.history.pushState({}, '', '/integration-continue-exo-react/users');

    await act(async () => {
      render(<App />);
    });

    const protectedRoute = screen.getByTestId('protected-route');
    expect(protectedRoute).toBeInTheDocument();
    expect(protectedRoute.querySelector('[data-testid="users-list"]')).toBeInTheDocument();
  });
});