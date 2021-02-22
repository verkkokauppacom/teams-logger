/** @ts-expect-error - explicit .ts import for test coverage */
import coerceLinks from '../lib/coerceLinks.ts'

describe('coerceLinks', () => {
    it('should return empty array for no links', () => {
        expect(coerceLinks()).toEqual([])
    })

    it('should parse link to label and href', () => {
        expect(coerceLinks(['[example.com](https://example.com)'])).toEqual([
            { label: 'example.com', href: 'https://example.com' }
        ])
    })

    it('should throw when links not an array', () => {
        expect(() => coerceLinks('test')).toThrowErrorMatchingInlineSnapshot(
            `"Links is not an array!"`
        )
    })

    it('should throw with incorrect link', () => {
        expect(() =>
            coerceLinks([{ foo: 'bar' }])
        ).toThrowErrorMatchingInlineSnapshot(`"Error parsing link!"`)
    })
})
