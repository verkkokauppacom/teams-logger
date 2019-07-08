'use strict'

const request = require('request-promise')

module.exports = ({ body, webhook }) =>
    request({ method: 'POST', uri: webhook, body, json: true })
