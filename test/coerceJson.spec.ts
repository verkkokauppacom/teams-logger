import coerceJson from '../lib/coerceJson'

describe('coerceJson', () => {
    it('should parse valid JSON', () => {
        expect(coerceJson('{"foo":"bar"}')).toEqual({
            foo: 'bar'
        })
    })

    it('should throw when invalid JSON', () => {
        /** @ts-expect-error - invalid argument */
        expect(() => coerceJson()).toThrowErrorMatchingInlineSnapshot(
            `"Unable to parse JSON!"`
        )
    })
})
