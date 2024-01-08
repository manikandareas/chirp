describe('Login', () => {
    it('User should be able to login', () => {
        // Goto signin page
        cy.visit('/auth/signin');

        // fill in the from
        cy.get('[data-testid="input-email"]').type('manik@mail.com');
        cy.get('[data-testid="input-password"]').type('asdasdasd');

        // submit the from
        cy.get('[data-testid="button-signin"]').click();

        // Should be on home page
        cy.url().should('include', '/');
        // Should contain toast success
        cy.contains('Hey welcome back dude!');
    });

    it("User should't be able to login", () => {
        // Clear previous sessions
        cy.clearAllLocalStorage();
        cy.clearAllCookies();
        cy.clearAllSessionStorage();
        // Goto signin page
        cy.visit('/auth/signin');

        // fill in the from
        cy.get('[data-testid="input-email"]').type('manik@mail.com');
        cy.get('[data-testid="input-password"]').type('wrongpassword');

        // submit the from
        cy.get('[data-testid="button-signin"]').click();

        // Should be on signin page
        cy.url().should('include', '/auth/signin');
        // Should contain toast error
        cy.contains('Unable to sign in');
    });
});

describe('Sign up', () => {
    it('User should be able to signup', () => {
        // Goto signup page
        cy.visit('/auth/signup');

        // fill account form
    });
});
