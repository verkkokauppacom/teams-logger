# `@verkkokauppacom/teams-logger`

[![@verkkokauppacom/teams-logger version](https://img.shields.io/npm/v/@verkkokauppacom/teams-logger)](https://www.npmjs.com/package/@verkkokauppacom/teams-logger)
[![@verkkokauppacom/teams-logger monthly downloads](https://img.shields.io/npm/dm/@verkkokauppacom/teams-logger)](https://www.npmjs.com/package/@verkkokauppacom/teams-logger)
[![@verkkokauppacom/teams-logger dependency status](https://img.shields.io/librariesio/release/npm/@verkkokauppacom/teams-logger)](https://github.com/verkkokauppacom/teams-logger)
[![@verkkokauppacom/teams-logger GitHub Stars](https://img.shields.io/github/stars/verkkokauppacom/teams-logger?label=GitHub%20Stars)](https://github.com/verkkokauppacom/teams-logger/stargazers)

A Node.js application for sending messages to Microsoft Teams via a [custom incoming webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/connectors/connectors-using#setting-up-a-custom-incoming-webhook).

The simple usage is to post messages formatted in Markdown, with optional link buttons that are added to the bottom of messages. More advanced usage is possible by sending the entire [Office 365 Connector JSON](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/connectors/connectors-using#creating-messages-through-office-365-connectors).

## Table of contents

1. [Installation](#installation)
1. [Usage](#usage)
    1. [Configuration](#configuration)
    1. [Simple CLI](#simple-cli)
    1. [Advanced CLI](#advanced-cli)
    1. [Node.js API](#nodejs-api)
    1. [Docker](#docker)
1. [Development](#development)
    1. [Publishing](#publishing)

## Installation

```bash
# npm
npm install --global @verkkokauppacom/teams-logger

# yarn
yarn add --global @verkkokauppacom/teams-logger

# Docker
docker pull ghcr.io/verkkokauppacom/teams-logger
```

## Usage

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
      --help           Show help                                       [boolean]
      --version        Show version number                             [boolean]
  -w, --webhook        Microsoft Teams Webhook [TEAMS_LOGGER_WEBHOOK] [required]
  -t, --timeout        Timeout in seconds before fail                   [number]
      --allow-failure  Exit with code 0 when failed   [boolean] [default: false]
  -l, --link           Add link buttons with Markdown syntax [Title](url)[array]
```

### Configuration

The only required configuration is the Webhook URL for posting messages to a certain channel. After creating a Webhook connector to a channel, save its webhook URL and specify it to `teams-logger` via the `TEAMS_LOGGER_WEBHOOK` env variable or the `--webhook` command line flag.


### Simple CLI

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

### Advanced CLI

You can learn how to create custom messages by following the [Post an actionable message card to an Office 365 group](https://docs.microsoft.com/en-us/outlook/actionable-messages/send-via-connectors) tutorial:

```bash
export WEBHOOK_URL="https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY"
cat my_json_message.json | teams-logger raw
```

### Node.js API

`teams-logger` can be used through Node.js via the exported `simpleLogger` or `rawLogger`:

```ts
import { simpleLogger } from '@verkkokauppacom/teams-logger'

interface SimpleArgs {
    allowFailure?: boolean /** Whether to exit with code 0 even when request failed */
    links?: { label: string; href: string }[] /** Link buttons to add to the message */
    message: string /** Message formatted in Markdown */
    timeout?: number /** HTTP Request timeout */
    webhook: string /** Office 365 Incoming Webhook URL */
}

try {
    await simpleLogger({ allowFailure, links, message, timeout, webhook }: SimpleArgs)
} catch (error) {
    console.error(error)
}
```

```ts
import { rawLogger } from '@verkkokauppacom/teams-logger'

interface RawArgs {
    allowFailure?: boolean /** Whether to exit with code 0 even when request failed */
    json: SerializableObject /** JSON Message as JavaScript object */
    timeout?: number /** HTTP Request timeout in seconds */
    webhook: string /** Office 365 Incoming Webhook URL */
}

try {
    await rawLogger({ allowFailure, json, timeout, webhook }: RawArgs)
} catch (error) {
    console.error(error)
}
```

### Docker

This repository contains a `Dockerfile` for building a small image based on [node:alpine](https://hub.docker.com/_/node/). The API of the container is the same as the cli:

```bash
❯ docker run ghcr.io/verkkokauppacom/teams-logger --help
```

## Development

### Publishing

This project adheres to the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0-beta.4/). To create a new version:

1. Run `npm run version` locally, and wait for the script to run
1. If all prerelease checks pass, a new commit containing the version number bump, `CHANGELOG.md` and git tag will be created
1. Push the new commit and tag by running `git push --follow-tags`
1. The [GitHub Actions](https://github.com/verkkokauppacom/teams-logger/actions/new) will take over and publish new npm packages and Docker images
