const sinon = require('sinon')
const td = require('testdouble')
const test = require('tape')

const got = { post: sinon.fake.resolves('ok') }
td.replace('got', got)

const { rawLogger } = require('../')

test('rawLogger', (assert) => {
    assert.plan(2)

    rawLogger({
        allowFailure: false,
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
})
