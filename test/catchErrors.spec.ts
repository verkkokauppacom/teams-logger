import sinon from 'sinon'
import test from 'tape'

/** @ts-expect-error - explicit .ts file for coverage calculation */
import catchErrors from '../lib/catchErrors.ts'

test('catchErrors', async (assert) => {
    assert.plan(3)

    const sandbox = sinon.createSandbox()
    sandbox.stub(console, 'error')

    assert.doesNotThrow(() => catchErrors(Promise.resolve()))
    assert.doesNotThrow(() => catchErrors(Promise.reject(new Error())))
    assert.doesNotThrow(() =>
        catchErrors(Promise.reject(new Error('error')), true)
    )
})
