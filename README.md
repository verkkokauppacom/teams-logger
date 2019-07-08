# `teams-logger`

A cli for sending Microsoft Teams messages via a [custom incoming webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/connectors/connectors-using#setting-up-a-custom-incoming-webhook).

The simple usage is to post messages formatted in Markdown, with optional link buttons that are added to the bottom of messages. More advanced usage is possible by sending the entire [Office 365 Connector JSON](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/connectors/connectors-using#creating-messages-through-office-365-connectors).

## Configuration

The only required configuration is the Webhook URL for posting messages a to a certain channel. After creating a Webhook connector to a channel, save its webhook URL and specify it to `teams-logger` via the `TEAMS_LOGGER_WEBHOOK` env variable or the `--webhook` command line flag.

## Simple usage

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
export WEBHOOK_URL="https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY"
teams-logger "Click the button\!" --button "[The Button](https://example.com)"
```

## Advanced usage

You can learn how to create custom messages by following the [Post an actionable message card to an Office 365 group](https://docs.microsoft.com/en-us/outlook/actionable-messages/send-via-connectors) tutorial:

```bash
export WEBHOOK_URL="https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY"
cat my_json_message.json | teams-logger raw
```
