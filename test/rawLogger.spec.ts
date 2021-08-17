import type { ClientRequest, IncomingMessage, RequestOptions } from 'http'

import https from 'https'

/**
 * Very ugly mock for https.request
 */
jest.spyOn(https, 'request').mockImplementation(
    /** @ts-expect-error: return type */
    jest.fn(
        (
            _: RequestOptions | string | URL,
            responseCallback: (res: IncomingMessage) => void
        ) => {
            if (responseCallback)
                responseCallback({
                    /** @ts-expect-error: return type */
                    on: jest.fn((name, callback) => {
                        if (name === 'end') callback()
                    }),
                    statusCode: 200,
                    complete: true
                })

            return {
                on: jest.fn(),
                write: jest.fn(),
                end: jest.fn()
            } as any as ClientRequest
        }
    )
)

/** @ts-expect-error - explicit .ts import for test coverage */
import rawLogger from '../lib/rawLogger.ts'

describe('rawLogger', () => {
    it('should call https.request with correct arguments', async () => {
        await rawLogger({
            json: { foo: 'bar' },
            webhook: 'https://example.com',
            timeout: 30
        })

        expect(https.request).toHaveBeenCalledTimes(1)
        expect(https.request).toHaveBeenCalledWith(
            {
                headers: {
                    'Content-Length': 13,
                    'Content-Type': 'application/json'
                },
                hostname: 'example.com',
                method: 'POST',
                path: '/',
                port: 443,
                timeout: 30000
            },
            expect.any(Function)
        )

        await rawLogger({
            json: { foo: 'bar' },
            webhook: 'https://example.com'
        })

        expect(https.request).toHaveBeenLastCalledWith(
            {
                headers: {
                    'Content-Length': 13,
                    'Content-Type': 'application/json'
                },
                hostname: 'example.com',
                method: 'POST',
                path: '/',
                port: 443,
                timeout: 5000
            },
            expect.any(Function)
        )
    })
})
