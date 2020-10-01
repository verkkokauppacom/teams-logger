'use strict'

const got = require('got')

/**
 * Send raw JSON to Microsoft Teams
 *
 * @param {Object} options
 * @param {boolean} [options.allowFailure] - Whether to exit with code 0 even when request failed
 * @param {JSON} options.json - JSON Message
 * @param {Number} [options.timeout] - HTTP Request timeout in seconds
 * @param {string} options.webhook - Office 365 Incoming Webhook URL
 * @returns {Promise} - Response
 */
module.exports = async ({ allowFailure = false, json, timeout, webhook }) => {
    try {
        const timeoutMilliSeconds = timeout * 1000
        await got.post(webhook, { json, timeout: timeoutMilliSeconds })
    } catch (error) {
        console.error(error.message ? error.message : error)

        if (!allowFailure) {
            process.exitCode = 1
        }
    }
}
