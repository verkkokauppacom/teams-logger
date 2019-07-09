const test = require('tape')

const coerceLinks = require('../lib/coerceLinks')

test('coerceLinks', assert => {
    assert.plan(4)

    assert.deepEqual(coerceLinks(), [], 'returns empty array for no links')

    assert.deepEqual(
        coerceLinks(['[example.com](https://example.com)']),
        [{ label: 'example.com', href: 'https://example.com' }],
        'parses link to label and href'
    )

    assert.throws(() => coerceLinks('test'), 'throws when links not an array')

    assert.throws(
        () => coerceLinks([{ foo: 'bar' }]),
        'throws with incorrect link'
    )
})
