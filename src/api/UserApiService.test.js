import { AuthApiService } from './AuthApiService';
import { UserApiService } from './UserApiService';

const mockUsers = [
  {
    _id: "6758471a91480f3222c1c18e",
    name: "fenoll",
    firstname: "loise",
    email: "loise.fenoll@ynov.com",
    password: "$2y$10$nAu77dNUfmDtWDARTPRESu4jeDzHRVJiQOQs1T9qCXOS",
    birthDate: "1990-01-01T00:00:00.000Z",
    city: "Paris",
    zipcode: "75001",
    role: "6758471a91480f3222c1c18c",
  },
  {
    _id: "67a327f7490068324455bbc1",
    name: "admin",
    firstname: "admin",
    email: "admin@email.com",
    password: "$2a$10$vRAiNyvAdQbed6hJUcNPkem9uNhhH1wd9xBtG3AhkEzMLe4vd.wo2",
    birthDate: "1995-02-07T00:00:00.000Z",
    city: "Montpellier",
    zipcode: "34000",
    role: "6758471a91480f3222c1c18d",
    __v: 0,
  }
];

describe('AuthApiService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
    process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
  });

  describe('login', () => {
    it('should successfully login and store token', async () => {
      const mockToken = 'test-token';
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({token: mockToken})
        })
      );

      const result = await AuthApiService.login('test@email.com', 'password123');

      expect(result.token).toBe(mockToken);
      expect(localStorage.getItem('token')).toBe(mockToken);
      expect(fetch).toHaveBeenCalledWith(
        'http://test-api.com/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            email: 'test@email.com',
            password: 'password123'
          })
        })
      );
    });

    it('should throw error when login fails', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({message: 'Invalid credentials'})
        })
      );

      await expect(AuthApiService.login('test@email.com', 'wrong-password'))
        .rejects
        .toThrow('Login failed: Invalid credentials');
    });
  });

  describe('getCurrentUser', () => {
    it('should fetch current user successfully', async () => {
      const mockUser = mockUsers[0];
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser)
        })
      );

      const result = await AuthApiService.getCurrentUser();
      expect(result).toEqual(mockUser);
    });

    it('should throw error when fetching current user fails', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false
        })
      );

      await expect(AuthApiService.getCurrentUser())
        .rejects
        .toThrow('Failed to get user info');
    });
  });

  describe('getToken and isAuthenticated', () => {
    it('should return token from localStorage', () => {
      localStorage.setItem('token', 'test-token');
      expect(AuthApiService.getToken()).toBe('test-token');
    });

    it('should return null when no token exists', () => {
      localStorage.clear();
      expect(AuthApiService.getToken()).toBeNull();
    });

    it('should return true when authenticated', () => {
      localStorage.setItem('token', 'test-token');
      expect(AuthApiService.isAuthenticated()).toBe(true);
    });

    it('should return false when not authenticated', () => {
      localStorage.clear();
      expect(AuthApiService.isAuthenticated()).toBe(false);
    });
  });

  describe('logout', () => {
    it('should successfully logout and remove token', async () => {
      localStorage.setItem('token', 'test-token');
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true
        })
      );

      await AuthApiService.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(fetch).toHaveBeenCalledWith(
        'http://test-api.com/auth/logout',
        expect.objectContaining({
          method: 'POST',
          credentials: 'include'
        })
      );
    });

    it('should throw error when logout fails', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.reject(new Error('Network error'))
      );

      await expect(AuthApiService.logout())
        .rejects
        .toThrow('Logout failed');
    });
  });
});

describe('UserApiService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
    process.env.REACT_APP_BACKEND_URL = 'http://test-api.com';
  });

  describe('registerUser', () => {
    const mockUserData = {
      email: 'new@user.com',
      password: 'password123',
      name: 'New',
      firstname: 'User'
    };

    it('should successfully register user and return all users', async () => {
      // Mock registration request
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({message: 'User registered'})
        })
      );

      // Mock login request
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({token: 'new-token'})
        })
      );

      // Mock getAllUsers request
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers)
        })
      );

      const result = await UserApiService.registerUser(mockUserData);

      expect(result).toEqual(mockUsers);
      expect(localStorage.getItem('token')).toBe('new-token');
      expect(fetch).toHaveBeenCalledTimes(3);
    });

    it('should throw error when registration fails', async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({message: 'Email already exists'})
        })
      );

      await expect(UserApiService.registerUser(mockUserData))
        .rejects
        .toThrow('Email already exists');
    });
  });

  describe('getAllUsers', () => {
    it('should successfully fetch all users', async () => {
      localStorage.setItem('token', 'test-token');

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers)
        })
      );

      const result = await UserApiService.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(fetch).toHaveBeenCalledWith(
        'http://test-api.com/users',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Authorization': 'Bearer test-token',
            'Content-Type': 'application/json'
          }
        })
      );
    });

    it('should throw error when fetching users fails', async () => {
      localStorage.setItem('token', 'test-token');

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({message: 'Unauthorized'})
        })
      );

      await expect(UserApiService.getAllUsers())
        .rejects
        .toThrow('Failed to fetch users');
    });
  });
});