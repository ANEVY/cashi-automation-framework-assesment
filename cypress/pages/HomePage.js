
require('cypress-xpath');
// Page Object for Home Page Navigation
// All main navigation locators and actions for https://www.getcashi.com

export class HomePage {
    // Top navigation bar
    navLogo = 'nav a[href="/"] img[alt="Cashi"]';
    navHome = 'nav a[href="/"]';
    navPersonal = 'nav a[href="/individuals"]';
    navBusiness = 'nav a[href="/businesses"]';
    navHelpCentre = 'nav a[href="/help-centre"]';
    navBlogMedia = 'nav a[href="/blog"]';
    navAbout = 'nav button:has-text("About")';
    navJoin = 'nav a[href="/join"]';
    navLanguageEN = 'nav input[type="radio"][value="EN"]';
    navLanguageAR = 'nav input[type="radio"][value="AR"]';

    // Main call-to-action
    getStartedBtn = '/html/body/div[2]/div/main/section[5]/div/a/button';

    // Section links
    exploredSection = '/html/body/div[2]/div/main/section[3]';
    explorePersonalBtn = '/html/body/div[2]/div/main/section[3]/div/div/div[1]/div/div/a/button';
    exploreBusinessBtn = '/html/body/div[2]/div/main/section[3]/div/div/div[2]/div/div/a/button';
    investorInfoBtn = '/html/body/div[2]/div/main/section[3]/div/div/div[3]/div/div/a/button';

    // Footer navigation
    footerSection = 'footer';
    footerIndividuals = 'footer a[href="/individuals"]';
    footerBusinesses = 'footer a[href="/businesses"]';
    footerAbout = 'footer a[href="/about"]';
    footerBlog = 'footer a[href="/blog"]';
    footerLegal = 'footer a[href="/legal"]';
    footerCareers = 'footer a[href^="mailto:recruitment@alsoug.com"]';
    footerHelpCentre = 'footer a[href="/help-centre"]';

    // Footer social links
    footerFacebook = 'footer a[href="https://www.facebook.com/getcashi"]';
    footerInstagram = 'footer a[href="https://www.instagram.com/getcashi/"]';
    footerLinkedIn = 'footer a[href*="linkedin.com"]';
    footerX = 'footer a[href="https://x.com/GetCashi"]';
    footerTikTok = 'footer a[href="https://www.tiktok.com/@getcashi"]';
    footerYouTube = 'footer a[href="https://www.youtube.com/@getcashi"]';
    footerSnapchat = 'footer a[href="https://www.snapchat.com/@getcashi"]';

    // Example navigation action
    visit() {
        cy.visit('/');
    }

    clickNavHome() {
        cy.get(this.navHome).click();
    }

    clickNavPersonal() {
        cy.get(this.navPersonal).click();
    }

    clickNavBusiness() {
        cy.get(this.navBusiness).click();
    }

    clickNavHelpCentre() {
        cy.get(this.navHelpCentre).click();
    }

    clickNavBlogMedia() {
        cy.get(this.navBlogMedia).click();
    }

    clickNavAbout() {
        cy.get(this.navAbout).click();
    }

    clickNavJoin() {
        cy.get(this.navJoin).click();
    }
}
