jest.mock('../lib/catchErrors', () =>
    jest.fn().mockReturnValue(Promise.resolve())
)

import catchErrors from '../lib/catchErrors'
import commandDefault from '../lib/commandDefault'

describe('commandDefault', () => {
    it('should call catchErrors', async () => {
        await commandDefault({
            link: [],
            message: 'test',
            webhook: 'https://example.com'
        })

        expect(catchErrors).toHaveBeenCalledTimes(1)
    })
})
