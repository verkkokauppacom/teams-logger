import type { Response } from 'got'

import got from 'got'

interface Args {
    allowFailure?: boolean /** Whether to exit with code 0 even when request failed */
    json: SerializableObject /** JSON Message */
    timeout?: number /** HTTP Request timeout in seconds */
    webhook: string /** Office 365 Incoming Webhook URL */
}

/**
 * Send raw JSON to Microsoft Teams
 */
const rawLogger = async ({
    allowFailure = false,
    json,
    timeout = 5,
    webhook
}: Args): Promise<Response | undefined> => {
    try {
        const timeoutMilliSeconds = timeout * 1000
        return got.post(webhook, { json, timeout: timeoutMilliSeconds })
    } catch (error) {
        console.error(error.message ? error.message : error)

        if (!allowFailure) {
            process.exitCode = 1
        }
    }
}

export default rawLogger
