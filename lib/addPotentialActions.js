module.exports = message => links => ({
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
