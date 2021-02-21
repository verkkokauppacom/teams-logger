jest.mock('../src/rawLogger', () =>
    jest.fn().mockReturnValue(Promise.resolve())
)

import rawLogger from '../src/rawLogger'
import commandRaw from '../src/commandRaw'

describe('commandRaw', () => {
    it('should call rawLogger', async () => {
        await commandRaw({
            json: {},
            webhook: 'https://example.com'
        })

        expect(rawLogger).toHaveBeenCalledTimes(1)
    })
})
