import coerceWebhook from '../lib/coerceWebhook'

describe('coerceWebhook', () => {
    it('should return valid webhook URL', () => {
        const url = 'https://outlook.office.com/webhook/XXX/IncomingWebhook/YYY'
        expect(coerceWebhook(url)).toEqual(url)
    })

    it('should throw when invalid webhook URL', () => {
        expect(() =>
            coerceWebhook('https://example.com')
        ).toThrowErrorMatchingInlineSnapshot(`"Invalid webhook!"`)
    })
})
