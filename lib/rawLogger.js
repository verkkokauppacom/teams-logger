'use strict'

const request = require('request-promise')

/**
 * Send raw JSON to Microsoft Teams
 *
 * @param {Object} options
 * @param {JSON} [options.body] - JSON Message
 * @param {String} [options.webhook] - Office 365 Incoming Webhook URL
 * @returns {Promise} - Request
 */
module.exports = ({ body, webhook }) =>
    request({ method: 'POST', uri: webhook, body, json: true })
