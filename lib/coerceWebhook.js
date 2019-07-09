const WEBHOOK_PREFIX = /^https:\/\/outlook\.office\.com\/webhook/

/**
 * Validate Microsoft Office 365 Connector incoming Webhook URL
 *
 * @param {string} - Microsoft Office 365 Connector incoming Webhook URL
 * @returns {string} - Microsoft Office 365 Connector incoming Webhook URL
 */
module.exports = webhook => {
    if (
        typeof webhook === 'string' &&
        WEBHOOK_PREFIX.test(webhook)
    ) {
        return webhook
    } else {
        throw 'Invalid webhook!'
    }
}
