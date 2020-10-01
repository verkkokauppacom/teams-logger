const sinon = require('sinon')
const td = require('testdouble')
const test = require('tape')

const got = { post: sinon.fake.resolves('ok') }
td.replace('got', got)

const { rawLogger } = require('../')

test('rawLogger', (assert) => {
    assert.plan(2)

    rawLogger({ json: { foo: 'bar' }, webhook: 'https://example.com' })

    assert.true(got.post.calledOnce, 'called exactly once')

    assert.true(
        got.post.calledOnceWith('https://example.com', {
            json: { foo: 'bar' }
        }),
        'called with correct arguments'
    )
})
