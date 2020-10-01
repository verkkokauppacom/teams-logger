#!/usr/bin/env node

'use strict'

require('pipe-args').load()

const pkg = require('../package.json')

const coerceJson = require('../lib/coerceJson')
const coerceLinks = require('../lib/coerceLinks')
const coerceWebhook = require('../lib/coerceWebhook')

const { rawLogger, simpleLogger } = require('../')

const ENV_PREFIX = 'TEAMS_LOGGER'

require('yargs')
    .env(ENV_PREFIX)
    .scriptName('teams-logger')
    .version(pkg.version)
    .option('webhook', {
        alias: 'w',
        describe: `Microsoft Teams Webhook [${ENV_PREFIX}_WEBHOOK]`,
        require: true,
        coerce: coerceWebhook
    })
    .option('timeout', {
        alias: 't',
        describe: `Timeout in seconds before fail`,
        type: 'number'
    })
    .option('allow-failure', {
        describe: `Exit with code 0 when failed`,
        type: 'boolean',
        default: false
    })
    .command(
        '* [message]',
        'Post Markdown to Microsoft Teams',
        (yargs) => {
            yargs
                .option('link', {
                    alias: 'l',
                    describe:
                        'Add link buttons with Markdown syntax [Title](url)',
                    type: 'array',
                    coerce: coerceLinks
                })
                .positional('message', {
                    describe: 'Markdown message.',
                    require: true,
                    type: 'markdown'
                })
        },
        ({ allowFailure, link, message, timeout, webhook }) =>
            simpleLogger({
                allowFailure,
                links: link,
                message,
                timeout,
                webhook
            })
    )
    .command(
        'raw [json]',
        'Post JSON message to Microsoft Teams',
        (yargs) => {
            yargs.positional('json', {
                describe: 'Valid Microsoft Teams JSON message.',
                require: true,
                type: 'json',
                coerce: coerceJson
            })
        },
        ({ allowFailure, json, timeout, webhook }) =>
            rawLogger({ allowFailure, json, timeout, webhook })
    ).argv
