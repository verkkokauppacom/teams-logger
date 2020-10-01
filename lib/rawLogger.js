'use strict'

const got = require('got')

/**
 * Send raw JSON to Microsoft Teams
 *
 * @param {Object} options
 * @param {JSON} options.json - JSON Message
 * @param {string} options.webhook - Office 365 Incoming Webhook URL
 * @returns {Promise} - Response
 */
module.exports = ({ json, webhook }) => got.post(webhook, { json })
