import execa from 'execa'
import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json')

const binPath = path.resolve(process.cwd(), './src/bin.ts')

describe('teams-logger', () => {
    it('should print correct version number', async () => {
        const result = await execa('ts-node', [
            '--transpile-only',
            binPath,
            '--version'
        ])
        expect(result.stdout).toEqual(version)
    })

    it('should print correct help text', async () => {
        const result = await execa('ts-node', [
            '--transpile-only',
            binPath,
            '--help'
        ])
        expect(result.stdout).toEqual(
            'teams-logger [message]\n\nPost Markdown to Microsoft Teams\n\nCommands:\n  teams-logger [message]     Post Markdown to Microsoft Teams          [default]\n  teams-logger raw [json]    Post JSON message to Microsoft Teams\n\nPositionals:\n  message  Markdown message.                                            [string]\n\nOptions:\n      --help           Show help                                       [boolean]\n      --version        Show version number                             [boolean]\n  -w, --webhook        Microsoft Teams Webhook [TEAMS_LOGGER_WEBHOOK] [required]\n  -t, --timeout        Timeout in seconds before fail                   [number]\n      --allow-failure  Exit with code 0 when failed   [boolean] [default: false]\n  -l, --link           Add link buttons with Markdown syntax [Title](url)[array]'
        )
    })

    it('should exit when webhook is missing', async () => {
        await expect(
            execa('ts-node', [
                '--transpile-only',
                binPath,
                'raw',
                '{"foo":"bar"}'
            ])
        ).rejects.toThrowError('Missing required argument: webhook')
    })
})
