const execa = require('execa')
const path = require('path')
const test = require('tape')

const pkg = require('../package.json')

const binPath = path.resolve(process.cwd(), './bin/teams-logger.js')

test('teams-logger', async (assert) => {
    assert.plan(3)

    const result1 = await execa.node(binPath, ['--version'])
    assert.deepEqual(
        result1.stdout,
        pkg.version,
        'prints correct version number'
    )

    const result2 = await execa.node(binPath, ['--help'])
    assert.deepEqual(
        result2.stdout,
        'teams-logger [message]\n\nPost Markdown to Microsoft Teams\n\nCommands:\n  teams-logger [message]     Post Markdown to Microsoft Teams          [default]\n  teams-logger raw [json]    Post JSON message to Microsoft Teams\n\nPositionals:\n  message  Markdown message.\n\nOptions:\n  --help         Show help                                             [boolean]\n  --version      Show version number                                   [boolean]\n  --webhook, -w  Microsoft Teams Webhook [TEAMS_LOGGER_WEBHOOK]       [required]\n  --link, -l     Add link buttons with Markdown syntax [Title](url)      [array]',
        'prints correct help text'
    )

    try {
        await execa.node(binPath, ['raw', '{"foo":"bar"}'])
    } catch ({ stderr }) {
        assert.true(
            /Missing required argument: webhook/.test(stderr),
            'exits when webhook is missing'
        )
    }
})
