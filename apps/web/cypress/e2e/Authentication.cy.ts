describe('Register', () => {
    it('User should be able to signup', () => {
        // Goto signup page
        cy.visit('/auth/signup');
        // fill account form
        // email
        cy.get('[data-testid="input-email"]').type('tester@mail.com');
        // password
        cy.get('[data-testid="input-password"]').type('passussmanju123');
        // confirm password
        cy.get('[data-testid="input-confirm-password"]').type(
            'passussmanju123',
        );
        // Submit Form Account
        cy.get('[data-testid="account-form"]').submit();
        // username
        cy.get('[data-testid="input-username"]').type('tester_chirp');
        // first name
        cy.get('[data-testid="input-first-name"]').type('tester');
        // last name
        cy.get('[data-testid="input-last-name"]').type('chirp');
        // Gender
        // male for default
        // cy.get('[data-testid="input-gender"]').select('male');
        // date of birth
        cy.get('[data-testid="input-dob"]').type('07132004');
        // address
        cy.get('[data-testid="input-address"]').type('Tester street');
        // Submit Form Profile
        cy.get('[data-testid="profile-form"]').submit();
        // Should contain toast success
        cy.contains('Hey welcome to chirp world dude!');
        // Should be on home page
        cy.url().should('deep.equal', 'http://localhost:3000/');
    });

    it("User should't be able to signup, email already exist", () => {
        // Goto signup page
        cy.visit('/auth/signup');
        // fill account form
        // email
        cy.get('[data-testid="input-email"]').type('tester@mail.com');
        // password
        cy.get('[data-testid="input-password"]').type('passussmanju123');
        // confirm password
        cy.get('[data-testid="input-confirm-password"]').type(
            'passussmanju123',
        );
        // Submit Form Account
        cy.get('[data-testid="account-form"]').submit();
        cy.contains('Email already exist!');
    });

    it("User should't be able to signup, password doesn't match", () => {
        // Goto signup page
        cy.visit('/auth/signup');
        // fill account form
        // email
        cy.get('[data-testid="input-email"]').type('tester@mail.com');
        // password
        cy.get('[data-testid="input-password"]').type('passussmanju123');
        // confirm password
        cy.get('[data-testid="input-confirm-password"]').type(
            'passussmanju1234',
        );
        // Submit Form Account
        cy.get('[data-testid="account-form"]').submit();
        cy.contains("Passwords don't match");
    });
});

describe('Login', () => {
    it('User should be able to login', () => {
        // Clear previous sessions
        cy.clearAllLocalStorage();
        cy.clearAllCookies();
        cy.clearAllSessionStorage();
        // Goto signin page
        cy.visit('/auth/signin');
        // fill in the from
        cy.get('[data-testid="input-email"]').type('tester@mail.com');
        cy.get('[data-testid="input-password"]').type('passussmanju123');
        // submit the from
        cy.get('[data-testid="button-signin"]').click();
        // Should contain toast success
        cy.contains('Hey welcome back dude!');
        // Should be on home page
        cy.url().should('deep.equal', 'http://localhost:3000/');
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
