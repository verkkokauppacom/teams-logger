import sinon from 'sinon'
import td from 'testdouble'
import test from 'tape'

const got = { post: sinon.fake.resolves('ok') }
td.replace('got', got)

/** @ts-expect-error - explicit .ts file for coverage calculation */
import rawLogger from '../lib/rawLogger.ts'

test('rawLogger', async (assert) => {
    assert.plan(3)

    await rawLogger({
        json: { foo: 'bar' },
        webhook: 'https://example.com',
        timeout: 30
    })

    assert.true(got.post.calledOnce, 'called exactly once')

    assert.true(
        got.post.calledOnceWith('https://example.com', {
            json: { foo: 'bar' },
            timeout: 30000
        }),
        'called with correct arguments'
    )

    got.post.resetHistory()

    await rawLogger({
        json: { foo: 'bar' },
        webhook: 'https://example.com'
    })

    assert.true(got.post.calledOnce, 'called exactly once')
})
