const test = require('tape')

const parseLinks = require('../lib/parseLinks')

test('parseLinks', assert => {
    assert.plan(4)

    assert.deepEqual(parseLinks(), [], 'returns empty array for no links')

    assert.deepEqual(
        parseLinks(['[example.com](https://example.com)']),
        [{ label: 'example.com', href: 'https://example.com' }],
        'parses link to label and href'
    )

    assert.throws(() => parseLinks('test'), 'throws when links not an array')

    assert.throws(
        () => parseLinks([{ foo: 'bar' }]),
        'throws with incorrect link'
    )
})
