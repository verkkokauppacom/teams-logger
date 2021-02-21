jest.mock('../src/rawLogger', () =>
    jest.fn().mockReturnValue(Promise.resolve())
)

import rawLogger from '../src/rawLogger'
import commandDefault from '../src/commandDefault'

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
