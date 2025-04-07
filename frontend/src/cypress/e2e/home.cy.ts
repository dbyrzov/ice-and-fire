describe('Home Page', () => {
  it('should load the landing page', () => {
    cy.visit('/');
    cy.contains('Welcome to Ice and Fire App');
  });
});
