
// Custom logger for Cypress tests
// Use this logger to output custom logs to the Cypress runner and terminal.

/**
 * Log a message with a custom tag
 * @param {string} message
 */
export function log(message) {
	// Log to Cypress runner
	Cypress.log({ name: 'custom-log', message });
	// Log to browser console
	// eslint-disable-next-line no-console
	console.log(`[CYPRESS LOG]: ${message}`);
}
