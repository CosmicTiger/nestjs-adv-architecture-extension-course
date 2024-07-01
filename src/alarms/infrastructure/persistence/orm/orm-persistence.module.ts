import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { AlarmEntity } from './entities/alarm.entity';
import { AlarmItemEntity } from './entities/alarm-item.entity';
import { CreateOrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarm.repository';
import { OrmFindAlarmsRepository } from './repositories/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { OrmUpsertMaterializedAlarmsRepository } from './repositories/upsert-materialized-alarm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: CreateOrmCreateAlarmRepository, // 💡 This is where we bind the port to an adapter
    },
    {
      provide: FindAlarmsRepository,
      useClass: OrmFindAlarmsRepository, // 💡 This is where we bind the port to an adapter
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmsRepository, // 💡 This is where we bind the port to an adapter
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class OrmAlarmPersistenceModule {}
