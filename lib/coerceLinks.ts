const MARKDOWN_LINK = /(?:__|[*#])|\[(.+?)\]\((.+?)\)/

export type Link = {
    label: string
    href: string
}

/**
 * Parse Markdown link into Array of `[label, url]` tuples
 * @param {string} string - Markdown link
 * @returns {[string, string]} - Parsed link as `[label, url]` tuple
 */
const parseLink = (string: string): Link => {
    try {
        /** Inside try/catch, so assume it works */
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [, label, href] = MARKDOWN_LINK.exec(string)!
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
const coerceLinks = (links: unknown = []): Link[] => {
    if (!Array.isArray(links)) {
        throw 'Links is not an array!'
    }

    return links.map(parseLink)
}

export default coerceLinks
