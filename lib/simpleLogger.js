const addPotentialActions = require('./addPotentialActions')
const rawLogger = require('./rawLogger')

/**
 * Send Markdown message to Microsoft Teams
 *
 * @param {Object} options
 * @param {Array<string>} [options.links] - Link buttons in the Markdown format `[Label](url)`
 * @param {String} [options.message] - Message formatted in Markdown
 * @param {String} [options.webhook] - Office 365 Incoming Webhook URL
 * @returns {Promise} - Response
 */
module.exports = ({ links = [], message, webhook }) => {
    let json = {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        text: message
    }

    if (links.length > 0) {
        json = addPotentialActions(json, links)
    }

    return rawLogger({ json, webhook })
}
