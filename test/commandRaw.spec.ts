jest.mock('../lib/rawLogger', () =>
    jest.fn().mockReturnValue(Promise.resolve())
)

import rawLogger from '../lib/rawLogger'
/** @ts-expect-error - explicit .ts import for test coverage */
import commandRaw from '../lib/commandRaw.ts'

describe('commandRaw', () => {
    it('should call rawLogger', async () => {
        await commandRaw({
            json: {},
            webhook: 'https://example.com'
        })

        expect(rawLogger).toHaveBeenCalledTimes(1)
    })
})
