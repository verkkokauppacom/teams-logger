import sinon from 'sinon'
import testdouble from 'testdouble'
import test from 'tape'

const catchErrors = sinon.fake()
testdouble.replace('../lib/catchErrors', catchErrors)

/** @ts-expect-error - explicit .ts file for coverage calculation */
import commandDefault from '../lib/commandDefault.ts'

test('commandDefault', async (assert) => {
    assert.plan(1)

    await commandDefault({
        message: 'test',
        timeout: undefined,
        webhook: 'https://example.com'
    })

    assert.true(catchErrors.calledOnce, 'called exactly once')
})
