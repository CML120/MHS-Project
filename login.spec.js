describe('Login', () => {
    beforeEach(() => {
      cy.visit('/api/users/login'); // Assuming the login page is at the root URL
    });
  
    it('should successfully login with valid credentials', () => {
      cy.get('#username').type('sal@hotmail.com');
      cy.get('#password').type('password12345');
      cy.get('#login-button').click();
  
      
      cy.url().should('include', '/'); 
      cy.contains('Welcome, #username'); 
    });
  
    it('should display an error message with invalid credentials', () => {
      cy.get('#username').type('invalid-username');
      cy.get('#password').type('invalid-password');
      cy.get('#login-button').click();
  
      
      cy.contains('Invalid username or password');
    });
  });
  