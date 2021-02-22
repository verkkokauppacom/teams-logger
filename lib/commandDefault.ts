import catchErrors from './catchErrors'
import coerceLinks from './coerceLinks'
import simpleLogger from './simpleLogger'

export interface BaseArgs {
    webhook: string
    timeout?: number
    allowFailure?: boolean
}

interface DefaultArgs extends BaseArgs {
    link: ReturnType<typeof coerceLinks>
    message: string
}

const commandDefault = ({
    allowFailure,
    link,
    message,
    timeout,
    webhook
}: DefaultArgs): Promise<void> =>
    catchErrors(
        () =>
            simpleLogger({
                links: link,
                message,
                timeout,
                webhook
            }),
        allowFailure
    )

export default commandDefault
