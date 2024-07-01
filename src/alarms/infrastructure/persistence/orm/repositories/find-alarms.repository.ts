import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarm.repository';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll(): Promise<MaterializedAlarmView[]> {
    return await this.alarmModel.find().exec();
  }
}
