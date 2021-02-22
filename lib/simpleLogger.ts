import type { Response } from 'got'
import type { Link } from './coerceLinks'
import type { SerializableObject } from './coerceJson'

import addPotentialActions from './addPotentialActions'
import rawLogger from './rawLogger'

interface Args {
    links?: Link[] /** Link buttons to add to the message */
    message: string /** Message formatted in Markdown */
    timeout?: number /** HTTP Request timeout */
    webhook: string /** Office 365 Incoming Webhook URL */
}

/** Send Markdown message to Microsoft Teams */
const simpleLogger = ({
    links = [],
    message,
    timeout = 5,
    webhook
}: Args): Promise<Response> => {
    let json: SerializableObject = {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        text: message
    }

    if (links.length > 0) {
        json = addPotentialActions(json, links)
    }

    return rawLogger({ json, timeout, webhook })
}

export default simpleLogger
