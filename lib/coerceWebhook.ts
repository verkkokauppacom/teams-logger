const WEBHOOK_PREFIX = /^https:\/\/outlook\.office\.com\/webhook/
const WEBHOOK_V2_PREFIX = /^https:\/\/(?:.*)\.webhook\.office\.com\//

/**
 * Validate Microsoft Office 365 Connector incoming Webhook URL
 *
 * @param {string} - Microsoft Office 365 Connector incoming Webhook URL
 * @returns {string} - Microsoft Office 365 Connector incoming Webhook URL
 */
const coerceWebhook = (webhook: unknown): string => {
    if (
        typeof webhook === 'string' &&
        (WEBHOOK_V2_PREFIX.test(webhook) || WEBHOOK_PREFIX.test(webhook))
    ) {
        return webhook
    } else {
        throw new Error('Invalid webhook!')
    }
}

export default coerceWebhook
