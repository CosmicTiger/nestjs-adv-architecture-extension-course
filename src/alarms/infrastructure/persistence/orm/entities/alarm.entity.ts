import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AlarmItemEntity } from './alarm-item.entity';

@Entity('alarms')
export class AlarmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  @Column()
  triggeredAt: Date;

  @Column()
  isAcknowledged: boolean;

  @OneToMany(() => AlarmItemEntity, (item) => item.alarm, { cascade: true })
  items: AlarmItemEntity[];
}
