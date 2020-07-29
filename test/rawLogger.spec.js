const sinon = require('sinon')
const testdouble = require('testdouble')
const test = require('tape')

const bent = sinon.fake.resolves('ok')
testdouble.replace('bent', () => bent)

const { rawLogger } = require('../')

test('rawLogger', (assert) => {
    assert.plan(2)

    rawLogger({ body: { foo: 'bar' }, webhook: 'https://example.com' })

    assert.true(bent.calledOnce, 'called exactly once')

    assert.true(
        bent.calledOnceWith('https://example.com', { foo: 'bar' }),
        'called with correct arguments'
    )
})
