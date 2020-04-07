/**
 * Coerse stringified JSON into object
 *
 * @param {string} json
 * @returns {Object}
 */
module.exports = (json) => {
    try {
        return JSON.parse(json)
    } catch (error) {
        throw 'Unable to parse JSON!'
    }
}
