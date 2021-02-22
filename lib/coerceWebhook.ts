const WEBHOOK_PREFIX = /^https:\/\/outlook\.office\.com\/webhook/

/**
 * Validate Microsoft Office 365 Connector incoming Webhook URL
 *
 * @param {string} - Microsoft Office 365 Connector incoming Webhook URL
 * @returns {string} - Microsoft Office 365 Connector incoming Webhook URL
 */
const coerceWebhook = (webhook: unknown): string => {
    if (typeof webhook === 'string' && WEBHOOK_PREFIX.test(webhook)) {
        return webhook
    } else {
        throw new Error('Invalid webhook!')
    }
}

export default coerceWebhook
