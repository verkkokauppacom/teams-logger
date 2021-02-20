import type { BaseArgs } from './commandDefault'

import catchErrors from './catchErrors'
import coerceJson from './coerceJson'
import rawLogger from './rawLogger'

interface RawArgs extends BaseArgs {
    json: ReturnType<typeof coerceJson>
}

const commandRaw = ({
    allowFailure,
    json,
    timeout,
    webhook
}: RawArgs): Promise<void> =>
    catchErrors(rawLogger({ json, timeout, webhook }), allowFailure)

export default commandRaw
