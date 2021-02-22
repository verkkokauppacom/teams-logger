jest.mock('../lib/rawLogger', () =>
    jest.fn().mockReturnValue(Promise.resolve())
)

import rawLogger from '../lib/rawLogger'
/** @ts-expect-error - explicit .ts import for test coverage */
import commandDefault from '../lib/commandDefault.ts'

describe('commandDefault', () => {
    it('should call rawLogger', async () => {
        await commandDefault({
            link: [],
            message: 'test',
            webhook: 'https://example.com'
        })

        expect(rawLogger).toHaveBeenCalledTimes(1)
    })
})
