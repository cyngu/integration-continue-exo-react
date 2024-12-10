describe('Authentication and User Management', () => {
  const testUser = {
    firstname: 'John',
    name: 'Doe',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    birthDate: '1990-01-01',
    city: 'Paris',
    zipcode: '75001'
  };

  beforeEach(() => {
    cy.visit('http://localhost:8080/integration-continue-exo-react');
    // Clear localStorage before each test
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    // Configure longer timeout for network requests
    cy.intercept('http://localhost:3000/**').as('apiRequest');
  });

  describe('Registration Flow', () => {
    it('should show validation errors for invalid inputs', () => {
      // Try submitting with invalid data
      cy.get('input[name="firstname"]').type('123'); // Invalid name
      cy.get('input[name="name"]').type('456'); // Invalid name
      cy.get('input[name="email"]').type('invalid-email'); // Invalid email
      cy.get('input[name="password"]').type('12345'); // Too short password
      cy.get('input[name="birthDate"]').type('2010-01-01'); // Underage
      cy.get('input[name="city"]').type('123'); // Invalid city
      cy.get('input[name="zipcode"]').type('abc'); // Invalid zipcode

      cy.get('form').submit();

      // Check for error messages
      cy.contains("Votre prénom n'est pas dans un format valide").should('be.visible');
      cy.contains("Votre nom n'est pas dans un format valide").should('be.visible');
      cy.contains("Votre email n'est pas dans un format valide").should('be.visible');
      cy.contains("Le mot de passe doit contenir au moins 6 caractères").should('be.visible');
      cy.contains("Vous devez avoir au moins 18 ans").should('be.visible');
      cy.contains("Votre ville n'est pas dans un format valide").should('be.visible');
      cy.contains("Votre code postal n'est pas dans un format valide").should('be.visible');
    });

    it('should successfully register a new user', () => {
      // Fill registration form with valid data
      cy.get('input[name="firstname"]').type(testUser.firstname);
      cy.get('input[name="name"]').type(testUser.name);
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('input[name="birthDate"]').type(testUser.birthDate);
      cy.get('input[name="city"]').type(testUser.city);
      cy.get('input[name="zipcode"]').type(testUser.zipcode);

      cy.get('form').submit();

      // Wait for API response
      cy.wait('@apiRequest');

      // Check for success toast
      cy.contains('Inscription réussie !').should('be.visible');

      // Should redirect to users page
      cy.url().should('include', '/users');

      // Verify user is in the table
      cy.contains('td', testUser.email).should('exist');
    });
  });

  describe('Login Flow', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/integration-continue-exo-react/login');
    });

    it('should successfully login with valid credentials', () => {
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);

      cy.get('form').submit();

      // Wait for API response
      cy.wait('@apiRequest');

      // Check for success toast
      cy.contains('Connexion réussie !').should('be.visible');

      // Should redirect to users page
      cy.url().should('include', '/users');
    });

    it('should show error for invalid credentials', () => {
      cy.get('input[name="email"]').type('wrong@example.com');
      cy.get('input[name="password"]').type('wrongpassword');

      cy.get('form').submit();

      // Wait for API response
      cy.wait('@apiRequest');

      // Look for any toast error message
      cy.get('.Toastify').then(($toast) => {
        // Check for multiple possible error messages
        const errorMessages = [
          'Erreur lors de la connexion',
          'Login failed',
          'Invalid credentials'
        ];

        const hasError = errorMessages.some(msg =>
          $toast.text().includes(msg)
        );

        expect(hasError).to.be.true;
      });
    });
  });

  describe('Users List', () => {
    beforeEach(() => {
      // Login before testing users list
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/auth/login',
        body: {
          email: testUser.email,
          password: testUser.password
        },
        credentials: 'include'
      }).then((response) => {
        window.localStorage.setItem('token', response.body.token);
      });

      cy.visit('http://localhost:8080/integration-continue-exo-react/users');

      // Wait for the users data to load
      cy.wait('@apiRequest');
    });

    it('should display users table', () => {
      // Force scroll into view and check visibility
      cy.get('table').scrollIntoView().should('be.visible');

      // Check table headers exist
      cy.get('th').contains('Nom').should('exist');
      cy.get('th').contains('Prénom').should('exist');
      cy.get('th').contains('Email').should('exist');
      cy.get('th').contains('Ville').should('exist');
      cy.get('th').contains('Code Postal').should('exist');

      // Check if at least one user is displayed
      cy.get('tbody tr').should('have.length.at.least', 1);
    });

    it('should successfully logout', () => {
      // Click logout button
      cy.contains('button', 'Déconnexion').click();

      // Wait for API response
      cy.wait('@apiRequest');

      // Should redirect to registration page
      cy.url().should('include', '/integration-continue-exo-react');

      // Local storage token should be removed
      cy.window().its('localStorage').invoke('getItem', 'token').should('be.null');
    });
  });
});