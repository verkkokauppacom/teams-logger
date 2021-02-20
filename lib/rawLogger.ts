import type { Response } from 'got'

import got from 'got'

interface Args {
    json: SerializableObject /** JSON Message as JavaScript object */
    timeout?: number /** HTTP Request timeout in seconds */
    webhook: string /** Office 365 Incoming Webhook URL */
}

/**
 * Send raw JSON to Microsoft Teams
 */
const rawLogger = async ({
    json,
    timeout = 5,
    webhook
}: Args): Promise<Response> => {
    const timeoutMilliSeconds = timeout * 1000
    const options = { json, timeout: timeoutMilliSeconds }
    const response = await got.post(webhook, options)
    return response
}

export default rawLogger
