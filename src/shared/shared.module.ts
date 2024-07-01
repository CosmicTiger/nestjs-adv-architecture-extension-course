import { Module } from '@nestjs/common';
import { SharedInfrastuctureModule } from './infrastructure/shared-infrastucture.module';
import { AggregateRehydrator } from './application/aggregate-rehydrator';

@Module({
  imports: [SharedInfrastuctureModule],
  providers: [AggregateRehydrator], // 👈
  exports: [
    SharedInfrastuctureModule,
    AggregateRehydrator, // 👈
  ],
})
export class SharedModule {}
