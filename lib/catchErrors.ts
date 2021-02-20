const catchErrors = async (
    promise: Promise<unknown>,
    allowFailure = false
): Promise<void> => {
    try {
        await promise
    } catch (error) {
        console.error(error.message ? error.message : error)

        if (!allowFailure) {
            process.exitCode = 1
        }
    }
}

export default catchErrors
