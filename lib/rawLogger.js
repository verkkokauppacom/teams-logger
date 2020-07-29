'use strict'

const bent = require('bent')

const postJson = bent('POST', 'json')

/**
 * Send raw JSON to Microsoft Teams
 *
 * @param {Object} options
 * @param {JSON} options.body - JSON Message
 * @param {string} options.webhook - Office 365 Incoming Webhook URL
 * @returns {Promise} - Response
 */
module.exports = ({ body, webhook }) => postJson(webhook, body)
