
// Page Object for Login Page
// Encapsulates selectors and actions for the login page.

export class LoginPage {
    usernameField = 'input[name="username"]';
    passwordField = 'input[name="password"]';
    submitButton = 'button[type="submit"]';

    /**
     * Visit the login page
     */
    visit() {
        cy.visit('/login');
    }

    /**
     * Fill in username
     */
    enterUsername(username) {
        cy.get(this.usernameField).type(username);
    }

    /**
     * Fill in password
     */
    enterPassword(password) {
        cy.get(this.passwordField).type(password);
    }

    /**
     * Submit the login form
     */
    submit() {
        cy.get(this.submitButton).click();
    }
}
