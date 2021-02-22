/** @ts-expect-error - explicit .ts import for test coverage */
import coerceJson from '../lib/coerceJson.ts'

describe('coerceJson', () => {
    it('should parse valid JSON', () => {
        expect(coerceJson('{"foo":"bar"}')).toEqual({
            foo: 'bar'
        })
    })

    it('should throw when invalid JSON', () => {
        expect(() => coerceJson()).toThrowErrorMatchingInlineSnapshot(
            `"Unable to parse JSON!"`
        )
    })
})
