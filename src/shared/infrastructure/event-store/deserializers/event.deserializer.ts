import { Injectable, Type } from '@nestjs/common';
import { Event } from '../schemas/event.schema';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import { AlarmAcknowledgedEvent } from 'src/alarms/domain/events/alarm-acknowledged.event';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }
  getEventClassByType(type: string) {
    switch (type) {
      case AlarmCreatedEvent.name:
        return AlarmCreatedEvent;
      case AlarmAcknowledgedEvent.name:
        return AlarmAcknowledgedEvent;
    }
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
