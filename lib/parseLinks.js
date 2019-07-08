const MARKDOWN_LINK = /(?:__|[*#])|\[(.+?)\]\((.+?)\)/

const parseLink = string => {
    try {
        const [, label, url] = MARKDOWN_LINK.exec(string)
        return [label, url]
    } catch (error) {
        throw 'Link syntax looks incorrect!'
    }
}

module.exports = links =>
    (links || []).map(link => {
        const [label, url] = parseLink(link)
        return [label, url]
    })
