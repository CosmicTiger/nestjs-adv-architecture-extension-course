import { AlarmSeverity } from './value-objects/alarm-serverity';

export class Alarm {
  constructor(
    public id: string,
    public name: string,
    public severity: AlarmSeverity,
  ) {}
}
