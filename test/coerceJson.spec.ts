import test from 'tape'

import coerceJson from '../lib/coerceJson.ts'

test('coerceJson', (assert) => {
    assert.plan(2)

    assert.deepEqual(
        coerceJson('{"foo":"bar"}'),
        { foo: 'bar' },
        'parses valid json'
    )

    assert.throws(
        /** @ts-expect-error: handles incorrect value */
        () => coerceJson(),
        /Unable to parse JSON\!/,
        'throws when invalid JSON'
    )
})
