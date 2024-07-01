import { Type } from '@nestjs/common';

export class EventClsRegistry {
  private static readonly eventClsMap = new Map<string, any>();

  static add(eventCls: Type): void {
    this.eventClsMap.set(eventCls.name, eventCls);
  }

  static get(eventType: string): any {
    const eventCls = this.eventClsMap.get(eventType);
    if (!eventCls) {
      throw new Error(`Event class "${eventCls}" not registered`);
    }
    return eventCls;
  }
}
