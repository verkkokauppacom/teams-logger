import sinon from 'sinon'
import testdouble from 'testdouble'
import test from 'tape'

const catchErrors = sinon.fake()
testdouble.replace('../lib/catchErrors', catchErrors)

/** @ts-expect-error - explicit .ts file for coverage calculation */
import commandRaw from '../lib/commandRaw.ts'

test('commandRaw', async (assert) => {
    assert.plan(1)

    await commandRaw({
        message: 'test',
        timeout: undefined,
        webhook: 'https://example.com'
    })

    assert.true(catchErrors.calledOnce, 'called exactly once')
})
