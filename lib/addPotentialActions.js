/**
 * Add Office 365 Connector message OpenUri actions to JSON message
 * @param {Object} message - Office 365 Connector JSON
 * @param {Array<[string, string]>} links - Parsed links as `[label, url]` tuples
 * @returns {Object} - Office 365 Connector JSON
 */
module.exports = (message = {}, links = []) => {
    if (!Array.isArray(links)) {
        throw 'Links is not an array!'
    }

    if (links.length === 0) {
        return message
    }

    const potentialAction = links.map(({ label, href }) => {
        if (!(typeof label === 'string' && typeof href === 'string')) {
            throw 'Error parsing links!'
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
