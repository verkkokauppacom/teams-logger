const test = require('tape')

const coerceWebhook = require('../lib/coerceWebhook')

test('coerceWebhook', (assert) => {
    assert.plan(2)

    const url = 'https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY'
    assert.deepEqual(coerceWebhook(url), url, 'returns valid webhook URL')

    assert.throws(
        () => coerceWebhook('https://example.com'),
        'Invalid webhook!',
        'throws when invalid webhook URL'
    )
})
