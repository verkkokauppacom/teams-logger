import type { Link } from './coerceLinks'

/**
 * Add Office 365 Connector message OpenUri actions to JSON message
 * @param {Object} message - Office 365 Connector JSON
 * @param {Array<[string, string]>} links - Parsed links as `[label, url]` tuples
 * @returns {Object} - Office 365 Connector JSON
 */
const addPotentialActions = (
    message: SerializableObject = {},
    links: Link[] = []
): SerializableObject => {
    if (!Array.isArray(links)) {
        throw new Error('Links is not an array!')
    }

    if (links.length === 0) {
        return message
    }

    const potentialAction = links.map(({ label, href }) => {
        if (!(typeof label === 'string' && typeof href === 'string')) {
            throw new Error('Error parsing links!')
        }

        return {
            '@type': 'OpenUri',
            name: label,
            targets: [
                {
                    os: 'default',
                    uri: href
                }
            ]
        }
    })

    return { ...message, potentialAction }
}

export default addPotentialActions
