/** @ts-expect-error - explicit .ts import for test coverage */
import addPotentialActions from '../lib/addPotentialActions.ts'

describe('addPotentialActions', () => {
    it('should default to empty message', () => {
        expect(addPotentialActions()).toEqual({})
    })

    it('should not modify message without actions', () => {
        expect(addPotentialActions({})).toEqual({})
    })

    it('should not modify message with empty actions', () => {
        expect(addPotentialActions({}, [])).toEqual({})
    })

    it('should add actions to message', () => {
        expect(
            addPotentialActions({}, [{ label: 'label', href: 'href' }])
        ).toEqual({
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
        })
    })

    it('should throw when links not an array', () => {
        expect(() =>
            addPotentialActions({}, {})
        ).toThrowErrorMatchingInlineSnapshot(`"Links is not an array!"`)
    })

    it('should throw when links are invalid', () => {
        expect(() =>
            addPotentialActions({}, ['test'])
        ).toThrowErrorMatchingInlineSnapshot(`"Error parsing links!"`)
    })
})
