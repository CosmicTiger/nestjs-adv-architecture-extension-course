import { Injectable } from '@nestjs/common';
import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';
import { EventClsRegistry } from '../event-cls.registry';

@Injectable()
export class EventSerializer {
  serialize<T>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ): SerializableEvent<T> {
    const eventType = event.constructor?.name;
    if (!eventType) {
      throw new Error('Incompatible event type');
    }

    const aggregateId = dispatcher.id;

    return {
      streamId: aggregateId,
      type: eventType,
      position: dispatcher.version.value,
      data: this.toJSON(event),
    };
  }

  getEventClassByType(type: string) {
    return EventClsRegistry.get(type);
  }

  private toJSON<T>(data: T) {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if ('toJSON' in data && typeof data.toJSON === 'function') {
      return data.toJSON();
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.toJSON(item));
    }

    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = this.toJSON(value);
      return acc;
    }, {});
  }
}
