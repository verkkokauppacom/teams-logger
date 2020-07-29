# `@verkkokauppacom/teams-logger`

```bash
# npm
npm install --global @verkkokauppacom/teams-logger

# yarn
yarn add --global @verkkokauppacom/teams-logger
```

```bash
❯ npx teams-logger --help
teams-logger [message]

Post Markdown to Microsoft Teams

Commands:
  teams-logger [message]     Post Markdown to Microsoft Teams          [default]
  teams-logger raw [json]    Post JSON message to Microsoft Teams

Positionals:
  message  Markdown message.

Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --webhook, -w  Microsoft Teams Webhook [TEAMS_LOGGER_WEBHOOK]       [required]
  --link, -l     Add link buttons with Markdown syntax [Title](url)      [array]
```

Send messages to Microsoft Teams via a [custom incoming webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/connectors/connectors-using#setting-up-a-custom-incoming-webhook).

The simple usage is to post messages formatted in Markdown, with optional link buttons that are added to the bottom of messages. More advanced usage is possible by sending the entire [Office 365 Connector JSON](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/connectors/connectors-using#creating-messages-through-office-365-connectors).

## Configuration

The only required configuration is the Webhook URL for posting messages a to a certain channel. After creating a Webhook connector to a channel, save its webhook URL and specify it to `teams-logger` via the `TEAMS_LOGGER_WEBHOOK` env variable or the `--webhook` command line flag.

## Usage

### Simple

Post a message to a channel:

```bash
export WEBHOOK_URL="https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY"
teams-logger "Hello, world\!"
```

Post Markdown to a channel:

```bash
export WEBHOOK_URL="https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY"
echo "# Hello, world\!
----
This is the message body.
" | teams-logger
```

Add Link button to a message:

```bash
teams-logger "Click the button\!" --button "[The Button](https://example.com)" --webhook "https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY"
```

### Advanced

You can learn how to create custom messages by following the [Post an actionable message card to an Office 365 group](https://docs.microsoft.com/en-us/outlook/actionable-messages/send-via-connectors) tutorial:

```bash
export WEBHOOK_URL="https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY"
cat my_json_message.json | teams-logger raw
```

### Node API

`teams-logger` can be used through Node.js via the exported `simpleLogger` or `rawLogger`:

```js
const { rawLogger, simpleLogger } = require('@verkkokauppacom/teams-logger')

/**
 * Send raw JSON to Microsoft Teams
 * 
 * @param {Object} options
 * @param {JSON} [options.body] - JSON Message
 * @param {String} [options.webhook] - Office 365 Incoming Webhook URL
 * @returns {Promise} - Response
 */
rawLogger({ body, webhook })

/**
 * Send Markdown message to Microsoft Teams
 * 
 * @param {Object} options
 * @param {Array<string>} [options.links] - Link buttons in the Markdown format `[Label](url)`
 * @param {String} [options.message] - Message formatted in Markdown
 * @param {String} [options.webhook] - Office 365 Incoming Webhook URL
 * @returns {Promise} - Response
 */
simpleLogger({ links, message, webhook })
```

## Docker container support

This repository contains a `Dockerfile` for building a small image based on [node:alpine](https://hub.docker.com/_/node/). The API of the container is the same as the cli:

```bash
❯ docker build --tag teams-logger .
❯ docker run teams-logger --help
```

## Development

Todo at this point...

### Publishing

This project adheres to the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0-beta.4/). To create a new version:

1. Run `npm run version` locally, and wait for the script to run
1. If all prerelease checks pass, a new commit containing the version number bump, `CHANGELOG.md` and git tag will be created
1. Push the new commit to git by running `git push --follow-tags`
1. Publish a new release to npm by running `npm publish`
