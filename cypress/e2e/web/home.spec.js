// Example UI test for Home Page
// Demonstrates usage of Page Object
import { HomePage } from '../../pages/HomePage';
require('cypress-xpath');

describe('Home Page UI Test', () => {
    const homePage = new HomePage();

    beforeEach(() => {
        homePage.visit();
    });
    // Add test case to access home page and verify elements' presence
    //verify all elements defined in HomePage.js are visible on the home page
    it('should display home page elements correctly', () => {
        cy.get(homePage.navLogo).should('be.visible');
        cy.xpath(homePage.getStartedBtn).should('be.visible');

        cy.xpath(homePage.exploredSection).scrollIntoView();
        cy.xpath(homePage.explorePersonalBtn).should('be.visible');
        cy.xpath(homePage.exploreBusinessBtn).should('be.visible');
        cy.xpath(homePage.investorInfoBtn).should('be.visible');

        cy.get(homePage.footerSection).scrollIntoView();

        cy.get(homePage.footerIndividuals).should('be.visible');
        cy.get(homePage.footerBusinesses).should('be.visible');
        cy.get(homePage.footerAbout).should('be.visible');
        cy.get(homePage.footerBlog).should('be.visible');
        cy.get(homePage.footerLegal).should('be.visible');
        cy.get(homePage.footerCareers).should('be.visible');
        cy.get(homePage.footerHelpCentre).should('be.visible');
        cy.get(homePage.footerFacebook).should('be.visible');
        cy.get(homePage.footerInstagram).should('be.visible');
        cy.get(homePage.footerLinkedIn).should('be.visible');
        cy.get(homePage.footerX).should('be.visible');
        cy.get(homePage.footerTikTok).should('be.visible');
        cy.get(homePage.footerYouTube).should('be.visible');
        cy.get(homePage.footerSnapchat).should('be.visible');
    });

    // Add test case to scroll to "Get Started" section and verify content
    it('should scroll to Get Started section and verify content', () => {
        const getStartedBtn = cy.xpath(homePage.getStartedBtn);
        getStartedBtn.scrollIntoView();
        getStartedBtn.should('be.visible');
    });

    // Add test case to navigate to personal page
    it('should navigate to Personal page when Explore Personal is clicked', () => {
        homePage.visit();
        cy.xpath(homePage.explorePersonalBtn).click();
        cy.url().should('include', '/individuals');
    });

    // Add test case to navigate to business page
    it('should navigate to Business page when Explore Business is clicked', () => {
        homePage.visit();
        cy.xpath(homePage.exploreBusinessBtn).click();
        cy.url().should('include', '/businesses');
    });
});
