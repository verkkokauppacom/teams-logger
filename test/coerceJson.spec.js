const test = require('tape')

const coerceJson = require('../lib/coerceJson')

test('coerceJson', (assert) => {
    assert.plan(2)

    assert.deepEqual(
        coerceJson('{"foo":"bar"}'),
        { foo: 'bar' },
        'parses valid json'
    )

    assert.throws(
        () => coerceJson(),
        'Unable to parse JSON!',
        'throws when invalid JSON'
    )
})
