/**
 * @description Serialized event payload
 * Iterates over all the properties of the event payload and serializes them.
 * If a property has a toJSON method, it will infer the return type of that object and serialize it.
 * @template T Event data type
 */
export type SerializedEventPayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializedEventPayload<T[K]>;
    }
  : T;

/**
 * @description Serializable event that can be stored in the event store.
 * @template T Event data type
 */
export interface SerializableEvent<T = any> {
  streamId: string;
  type: string;
  position: number;
  data: SerializedEventPayload<T>;
}
