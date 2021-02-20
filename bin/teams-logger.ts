#!/usr/bin/env node

import { load } from 'pipe-args'
import yargs from 'yargs'

import { version } from '../package.json'
import coerceJson from '../lib/coerceJson'
import coerceLinks from '../lib/coerceLinks'
import coerceWebhook from '../lib/coerceWebhook'
import rawLogger from '../lib/rawLogger'
import simpleLogger from '../lib/simpleLogger'

const ENV_PREFIX = 'TEAMS_LOGGER'

load()

interface Args {
    webhook: string
    timeout?: number
    allowFailure?: boolean
}

interface DefaultArgs extends Args {
    link: ReturnType<typeof coerceLinks>
    message: string
}

interface RawArgs extends Args {
    json: ReturnType<typeof coerceJson>
}

yargs
    .env(ENV_PREFIX)
    .scriptName('teams-logger')
    .version(version)
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
    .command<DefaultArgs>(
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
                    type: 'string'
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
    .command<RawArgs>(
        'raw [json]',
        'Post JSON message to Microsoft Teams',
        (yargs) => {
            yargs.positional('json', {
                describe: 'Valid Microsoft Teams JSON message.',
                require: true,
                type: 'string',
                coerce: coerceJson
            })
        },
        ({ allowFailure, json, timeout, webhook }) =>
            rawLogger({ allowFailure, json, timeout, webhook })
    ).argv
