/** @ts-expect-error - explicit .ts import for test coverage */
import coerceWebhook from '../lib/coerceWebhook.ts'

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
