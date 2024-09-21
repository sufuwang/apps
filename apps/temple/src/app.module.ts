import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { DataBaseModule } from './data-base/data-base.module';
import TaskEntity from './data-base/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    DataBaseModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wo123456',
      database: 'temple',
      synchronize: true,
      logging: true,
      entities: [TaskEntity],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
