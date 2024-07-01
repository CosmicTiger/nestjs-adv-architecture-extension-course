/**
 * @description In real world application the read model would not have the redundancy of data
 * than the domain models defined for write processes. This is because the read model is optimized
 * for reading data and not for writing data. The read model is a projection of the domain model
 * this has been built like this just for demonstration and practice purposes.
 */
export class AlarmReadModel {
  id: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  isAcknowledged: boolean;
  items: Array<{
    name: string;
    type: string;
  }>;
}
