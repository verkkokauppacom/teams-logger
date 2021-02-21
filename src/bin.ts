#!/usr/bin/env node

import { load } from 'pipe-args'
import yargs from 'yargs'

import coerceJson from './coerceJson'
import coerceLinks from './coerceLinks'
import coerceWebhook from './coerceWebhook'
import commandDefault from './commandDefault'
import commandRaw from './commandRaw'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json')
const ENV_PREFIX = 'TEAMS_LOGGER'

export const main = (): void => {
    load()

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
                        type: 'string'
                    })
            },
            commandDefault
        )
        .command(
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
            commandRaw
        ).argv
}

main()
