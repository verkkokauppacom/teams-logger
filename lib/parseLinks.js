const MARKDOWN_LINK = /(?:__|[*#])|\[(.+?)\]\((.+?)\)/

/**
 * Parse Markdown link into Array of `[label, url]` tuples
 * @param {string} string - Markdown link
 * @returns {[string, string]} - Parsed link as `[label, url]` tuple
 */
const parseLink = string => {
    try {
        const [, label, url] = MARKDOWN_LINK.exec(string)
        return [label, url]
    } catch (error) {
        throw 'Link syntax looks incorrect!'
    }
}

/**
 * Parse array of Markdown links into Array of `[label, url]` tuples
 *
 * @param {Array<string>} links - Array of Markdown links
 * @returns {Array<[string, string]>} - Parsed links as `[label, url]` tuples
 */
module.exports = links =>
    (links || []).map(link => {
        const [label, url] = parseLink(link)
        return [label, url]
    })
