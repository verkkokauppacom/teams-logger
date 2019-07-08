/**
 * Add Office 365 Connector message OpenUri actions to JSON message
 * @param {Object} message - Office 365 Connector JSON
 * @param {Array<[string, string]>} links - Parsed links as `[label, url]` tuples
 * @returns {Object} - Office 365 Connector JSON
 */
module.exports = (message, links) => ({
    ...message,
    potentialAction: links.map(([name, uri]) => ({
        '@type': 'OpenUri',
        name,
        targets: [
            {
                os: 'default',
                uri
            }
        ]
    }))
})
