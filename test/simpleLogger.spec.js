const sinon = require('sinon')
const testdouble = require('testdouble')
const test = require('tape')

const rawLogger = sinon.fake()
testdouble.replace('../lib/rawLogger', rawLogger)

const simpleLogger = require('../lib/simpleLogger')

test('simpleLogger', (assert) => {
    assert.plan(4)

    simpleLogger({ message: 'test', webhook: 'https://example.com' })

    assert.true(rawLogger.calledOnce, 'called exactly once')

    assert.true(
        rawLogger.calledOnceWith({
            body: {
                '@type': 'MessageCard',
                '@context': 'http://schema.org/extensions',
                text: 'test'
            },
            webhook: 'https://example.com'
        }),
        'called with correct arguments'
    )

    rawLogger.resetHistory()

    simpleLogger({
        links: [{ label: 'label', href: 'href' }],
        message: 'test',
        webhook: 'https://example.com'
    })

    assert.true(rawLogger.calledOnce, 'called exactly once')

    assert.true(
        rawLogger.calledOnceWith({
            body: {
                '@type': 'MessageCard',
                '@context': 'http://schema.org/extensions',
                text: 'test',
                potentialAction: [
                    {
                        '@type': 'OpenUri',
                        name: 'label',
                        targets: [
                            {
                                os: 'default',
                                uri: 'href'
                            }
                        ]
                    }
                ]
            },
            webhook: 'https://example.com'
        }),
        'called with correct arguments'
    )
})
