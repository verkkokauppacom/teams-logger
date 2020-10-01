const addPotentialActions = require('./addPotentialActions')
const rawLogger = require('./rawLogger')

/**
 * Send Markdown message to Microsoft Teams
 *
 * @param {Object} options
 * @param {boolean} [options.allowFailure] - Whether to exit with code 0 even when request failed
 * @param {Array<string>} [options.links] - Link buttons in the Markdown format `[Label](url)`
 * @param {String} options.message - Message formatted in Markdown
 * @param {Number} [options.timeout] - HTTP Request timeout
 * @param {String} options.webhook - Office 365 Incoming Webhook URL
 * @returns {Promise} - Response
 */
module.exports = ({ allowFailure, links = [], message, timeout, webhook }) => {
    let json = {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        text: message
    }

    if (links.length > 0) {
        json = addPotentialActions(json, links)
    }

    return rawLogger({ allowFailure, json, timeout, webhook })
}
