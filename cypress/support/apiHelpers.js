
// API helper functions for Cypress API testing
// Use this file to define reusable functions for API requests and assertions.

/**
 * Helper to perform a login API request
 */

// refactor this to be a metho to make API post request it should be generic and reusable for any endpoint and payload
export const apiPostRequest = (endpoint, payload) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/${endpoint}`,
        body: payload,
        failOnStatusCode: false // allows negative test validation
    });
}

// create helper function for api get request
export const apiGetRequest = (endpoint) => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/${endpoint}`,
        failOnStatusCode: false // allows negative test validation
    });
}

// create helper function for api put request
export const apiPutRequest = (endpoint, payload) => {
    return cy.request({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}/${endpoint}`,
        body: payload,
        failOnStatusCode: false // allows negative test validation
    });
}

// create helper function for api delete request
export const apiDeleteRequest = (endpoint) => {
    return cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/${endpoint}`,
        failOnStatusCode: false // allows negative test validation
    });
}