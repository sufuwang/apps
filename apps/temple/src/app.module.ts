import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { DataBaseModule } from './data-base/data-base.module';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, DataBaseModule],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
