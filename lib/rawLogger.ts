import type { IncomingMessage } from 'http'
import type { RequestOptions } from 'https'
import type { SerializableObject } from './coerceJson'

import https from 'https'

export class RequestError extends Error {}

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
}: Args): Promise<IncomingMessage> =>
    new Promise((resolve, reject) => {
        const data = new TextEncoder().encode(JSON.stringify(json))

        const { hostname, pathname } = new URL(webhook)

        const options: RequestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            },
            hostname,
            method: 'POST',
            path: pathname,
            port: 443,
            timeout: timeout * 1000 /** milliseconds */
        }

        const request = https.request(options, (response) => {
            const { statusCode, statusMessage } = response

            if (!statusCode || statusCode < 200 || statusCode > 299) {
                reject(
                    new RequestError(
                        `Failed with status ${statusCode}: ${statusMessage}`
                    )
                )
            }

            response.on('end', () => {
                if (response.complete) {
                    resolve(response)
                } else {
                    reject(
                        new RequestError(
                            'The connection was terminated while the message was still being sent'
                        )
                    )
                }
            })
        })

        request.on('error', (error) => {
            reject(error)
        })

        request.on('timeout', () => {
            reject(new RequestError(`Timed out after ${timeout} seconds`))
        })

        request.write(data)
        request.end()
    })

export default rawLogger
