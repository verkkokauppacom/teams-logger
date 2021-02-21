jest.mock('../lib/catchErrors', () =>
    jest.fn().mockReturnValue(Promise.resolve())
)

import catchErrors from '../lib/catchErrors'
import commandRaw from '../lib/commandRaw'

describe('commandRaw', () => {
    it('should call catchErrors', async () => {
        await commandRaw({
            json: {},
            webhook: 'https://example.com'
        })

        expect(catchErrors).toHaveBeenCalledTimes(1)
    })
})
