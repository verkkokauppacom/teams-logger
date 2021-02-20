import sinon from 'sinon'
import testdouble from 'testdouble'
import test from 'tape'

const rawLogger = sinon.fake()
testdouble.replace('../lib/rawLogger', rawLogger)

import simpleLogger from '../lib/simpleLogger.ts'

test('simpleLogger', async (assert) => {
    assert.plan(4)

    await simpleLogger({
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
            timeout: 5,
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
