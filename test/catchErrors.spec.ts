import catchErrors from '../src/catchErrors'

describe('catchErrors', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn())

    it('should handle resolve', async () => {
        await expect(catchErrors(async () => void true)).resolves.toBeFalsy()
    })

    it('should handle reject', async () => {
        await expect(
            catchErrors(async () => {
                throw new Error()
            })
        ).resolves.toBeFalsy()
    })

    it('should handle reject with allowFailure', async () => {
        await expect(
            catchErrors(async () => Promise.reject(new Error('error')), true)
        ).resolves.toBeFalsy()
    })
})
