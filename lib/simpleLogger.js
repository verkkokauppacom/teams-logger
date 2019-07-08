const addPotentialActions = require('./addPotentialActions')
const rawLogger = require('./rawLogger')

module.exports = ({ links, message, webhook }) => {
    let body = {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        text: message
    }

    if (links.length > 0) {
        body = addPotentialActions(body)(links)
    }

    return rawLogger({ body, webhook })
}
