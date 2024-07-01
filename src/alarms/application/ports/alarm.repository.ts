import { Alarm } from 'src/alarms/domain/alarm';

// NOTE: Even though the AlarmRepository could be an interface. They are not usable
// in runtime due to being a Typescript construct. An abstract class is used for the token
// dependencies injections in the NestJS framework.
export abstract class AlarmRepository {
  abstract findAll(): Promise<Alarm[]>;
  abstract save(alarm: Alarm): Promise<Alarm>;
}
