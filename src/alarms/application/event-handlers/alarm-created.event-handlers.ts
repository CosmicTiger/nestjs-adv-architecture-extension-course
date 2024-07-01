import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<AlarmCreatedEvent>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: AlarmCreatedEvent) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event.alarm)}`);

    /**
     * @description In a real-world application, ensuring that this operation is atomic for the creation of the alarm, being crucial.
     * Otherwise, the materialized view could be out of sync with the alarms (not reflecting) in the read model (e.g. because the database operation fails).
     * Always check about "Transaction inbox/outbox pattern" in order to remember deeper details regarding this.
     */
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity.value,
      triggeredAt: event.alarm.triggeredAt,
      items: event.alarm.items,
    });
  }
}
