import { Injectable, Type } from '@nestjs/common';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';
import { Event } from '../schemas/event.schema';
import { AlarmCreatedEvent } from '../../../../alarms/domain/events/alarm-created.event';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    const data = this.instantiateSerializedEvent(eventCls, event.data);

    if (!eventCls) {
      throw new Error(`Event class not found for type ${event.type}`);
    }

    if (!data) {
      throw new Error(`Event data not found for type ${event.type}`);
    }

    return {
      ...event,
      data,
    };
  }

  getEventClassByType(type: string) {
    // We'll show a more scalable approach later
    switch (type) {
      case AlarmCreatedEvent.name:
        return AlarmCreatedEvent;
    }
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls?.prototype), data);
  }
}
