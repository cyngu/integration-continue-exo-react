import {act, render, screen} from "@testing-library/react";
import App from "./App";
/*
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Navigate: ({ to }) => <div data-testid="mock-navigate" data-to={to} />,
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <a>{children}</a>
}));

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('./services/UserApiService', () => ({
  UserApiService: {
    registerUser: jest.fn(),
    getAllUsers: jest.fn()
  }
}));

/*
describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the UserForm component", async () => {
    await act(async () => {
      render(<App />);
    });

    const userFormElement = screen.getByTestId("user-form");
    expect(userFormElement).toBeInTheDocument();
  });

 */
