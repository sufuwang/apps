import { Module } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { DataBaseController } from './data-base.controller';

@Module({
  controllers: [DataBaseController],
  providers: [DataBaseService],
})
export class DataBaseModule {}
