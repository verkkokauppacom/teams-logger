import type { IncomingMessage } from 'http'
import type { SerializableObject } from './coerceJson'
import type { Link } from './coerceLinks'

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
}: Args): Promise<IncomingMessage> => {
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
