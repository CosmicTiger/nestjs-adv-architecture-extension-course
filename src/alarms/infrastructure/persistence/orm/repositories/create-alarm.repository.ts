import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class CreateOrmCreateAlarmRepository implements CreateAlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly CreateAlarmRepository: Repository<AlarmEntity>,
  ) {}

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    const newEntity = await this.CreateAlarmRepository.save(persistenceModel);
    return AlarmMapper.toDomain(newEntity);
  }
}
