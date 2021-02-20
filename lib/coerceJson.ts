/** Coerce stringified JSON into object */
const coerceJson = (json: unknown): SerializableObject => {
    try {
        return JSON.parse(json as string)
    } catch (error) {
        throw 'Unable to parse JSON!'
    }
}

export default coerceJson
