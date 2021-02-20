import type { Response } from 'got'
import type { Link } from './coerceLinks'

import addPotentialActions from './addPotentialActions'
import rawLogger from './rawLogger'

interface Args {
    allowFailure?: boolean /** Whether to exit with code 0 even when request failed */
    links?: Link[] /** Link buttons in the Markdown format `[Label](url)` */
    message: string /** Message formatted in Markdown */
    timeout?: number /** HTTP Request timeout */
    webhook: string /** Office 365 Incoming Webhook URL */
}

/** Send Markdown message to Microsoft Teams */
const simpleLogger = async ({
    allowFailure = false,
    links = [],
    message,
    timeout = 5,
    webhook
}: Args): Promise<Response<unknown> | undefined> => {
    let json: Record<string, any> = {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        text: message
    }

    if (links.length > 0) {
        json = addPotentialActions(json, links)
    }

    return rawLogger({ allowFailure, json, timeout, webhook })
}

export default simpleLogger
