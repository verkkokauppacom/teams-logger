declare type SerializableScalar = string | number | boolean | null

declare type SerializableObject = {
    [key: string]: SerializableValue
}

declare type SerializableArray = SerializableValue[]

declare type SerializableValue =
    | SerializableScalar
    | SerializableObject
    | SerializableArray

declare type Serializable =
    | SerializableScalar
    | SerializableObject
    | SerializableArray
