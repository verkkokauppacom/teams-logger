import simpleLogger from '../src/simpleLogger'
import rawLogger from '../src/rawLogger'

jest.mock('../src/rawLogger', () =>
    jest.fn().mockReturnValue(Promise.resolve())
)

const mockRawLogger = rawLogger as jest.Mock

describe('simpleLogger', () => {
    beforeEach(() => {
        mockRawLogger.mockClear()
    })

    it('should call rawLogger with default arguments', async () => {
        await simpleLogger({
            message: 'test',
            webhook: 'https://example.com'
        })

        expect(mockRawLogger).toHaveBeenCalledTimes(1)
        expect(mockRawLogger).toHaveBeenLastCalledWith({
            json: {
                '@type': 'MessageCard',
                '@context': 'http://schema.org/extensions',
                text: 'test'
            },
            timeout: 5,
            webhook: 'https://example.com'
        })
    })

    it('should call rawLogger with correct arguments', async () => {
        await simpleLogger({
            links: [{ label: 'label', href: 'href' }],
            message: 'test',
            timeout: 30,
            webhook: 'https://example.com'
        })

        expect(mockRawLogger).toHaveBeenCalledTimes(1)
        expect(mockRawLogger).toHaveBeenLastCalledWith({
            json: {
                '@type': 'MessageCard',
                '@context': 'http://schema.org/extensions',
                text: 'test',
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
            },
            timeout: 30,
            webhook: 'https://example.com'
        })
    })
})
