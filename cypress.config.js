const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

function getEnvConfig(env) {
  const configPath = path.resolve(__dirname, 'config', `${env}.json`);
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath));
  }
  return {};
}

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const envConfig = getEnvConfig(config.env.configEnv || 'dev');
      config.baseUrl = envConfig.baseUrl || config.baseUrl;
      config.env.apiUrl = envConfig.apiUrl || config.env.apiUrl;
      return config;
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'reports/screenshots',
    videosFolder: 'reports/videos',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'reports/mochawesome',
      overwrite: false,
      html: true
    }
  },
});
