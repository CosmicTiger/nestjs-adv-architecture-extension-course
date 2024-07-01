import { Module } from '@nestjs/common';
import { SharedInfrastuctureModule } from './infrastructure/shared-infrastucture.module';

@Module({
  imports: [SharedInfrastuctureModule],
  exports: [SharedInfrastuctureModule],
})
export class SharedModule {}
