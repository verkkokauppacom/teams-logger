const sinon = require('sinon')
const testdouble = require('testdouble')
const test = require('tape')

const request = sinon.fake.resolves('ok')
testdouble.replace('request-promise', request)

const { rawLogger } = require('../')

test('rawLogger', (assert) => {
    assert.plan(2)

    rawLogger({ body: { foo: 'bar' }, webhook: 'https://example.com' })

    assert.true(request.calledOnce, 'called exactly once')

    assert.true(
        request.calledOnceWith({
            body: { foo: 'bar' },
            json: true,
            method: 'POST',
            uri: 'https://example.com'
        }),
        'called with correct arguments'
    )
})
