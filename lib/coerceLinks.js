const MARKDOWN_LINK = /(?:__|[*#])|\[(.+?)\]\((.+?)\)/

/**
 * Parse Markdown link into Array of `[label, url]` tuples
 * @param {string} string - Markdown link
 * @returns {[string, string]} - Parsed link as `[label, url]` tuple
 */
const parseLink = string => {
    try {
        const [, label, href] = MARKDOWN_LINK.exec(string)
        return { label, href }
    } catch (error) {
        throw 'Error parsing link!'
    }
}

/**
 * Coerse array of Markdown links into Array of `[label, url]` tuples
 *
 * @param {Array<string>} links - Array of Markdown links
 * @returns {Array<[string, string]>} - Parsed links as `[label, url]` tuples
 */
module.exports = (links = []) => {
    if (!Array.isArray(links)) {
        throw 'Links is not an array!'
    }

    return links.map(parseLink)
}
