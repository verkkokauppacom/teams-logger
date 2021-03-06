import got from 'got'

jest.spyOn(got, 'post').mockImplementation(
    jest.fn().mockReturnValue(Promise.resolve())
)

/** @ts-expect-error - explicit .ts import for test coverage */
import rawLogger from '../lib/rawLogger.ts'

describe('rawLogger', () => {
    it('should call got with correct arguments', async () => {
        await rawLogger({
            json: { foo: 'bar' },
            webhook: 'https://example.com',
            timeout: 30
        })

        expect(got.post).toHaveBeenCalledTimes(1)
        expect(got.post).toHaveBeenCalledWith('https://example.com', {
            json: { foo: 'bar' },
            timeout: 30000
        })

        await rawLogger({
            json: { foo: 'bar' },
            webhook: 'https://example.com'
        })

        expect(got.post).toHaveBeenLastCalledWith('https://example.com', {
            json: { foo: 'bar' },
            timeout: 5000
        })
    })
})
