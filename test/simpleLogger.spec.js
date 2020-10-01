const sinon = require('sinon')
const testdouble = require('testdouble')
const test = require('tape')

const rawLogger = sinon.fake()
testdouble.replace('../lib/rawLogger', rawLogger)

const simpleLogger = require('../lib/simpleLogger')

test('simpleLogger', (assert) => {
    assert.plan(4)

    simpleLogger({
        allowFailure: false,
        message: 'test',
        timeout: undefined,
        webhook: 'https://example.com'
    })

    assert.true(rawLogger.calledOnce, 'called exactly once')

    assert.true(
        rawLogger.calledOnceWith({
            allowFailure: false,
            json: {
                '@type': 'MessageCard',
                '@context': 'http://schema.org/extensions',
                text: 'test'
            },
            timeout: undefined,
            webhook: 'https://example.com'
        }),
        'called with correct arguments'
    )

    rawLogger.resetHistory()

    simpleLogger({
        allowFailure: true,
        links: [{ label: 'label', href: 'href' }],
        message: 'test',
        timeout: 30,
        webhook: 'https://example.com'
    })

    assert.true(rawLogger.calledOnce, 'called exactly once')

    assert.true(
        rawLogger.calledOnceWith({
            allowFailure: true,
            json: {
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
            timeout: 30,
            webhook: 'https://example.com'
        }),
        'called with correct arguments'
    )
})
