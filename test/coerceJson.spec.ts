import test from 'tape'

/** @ts-expect-error - explicit .ts file for coverage calculation */
import coerceJson from '../lib/coerceJson.ts'

test('coerceJson', (assert) => {
    assert.plan(2)

    assert.deepEqual(
        coerceJson('{"foo":"bar"}'),
        { foo: 'bar' },
        'parses valid json'
    )

    assert.throws(
        () => coerceJson(),
        /Unable to parse JSON\!/,
        'throws when invalid JSON'
    )
})
