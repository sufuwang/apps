import { Module } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { DataBaseController } from './data-base.controller';
import Entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wo123456',
      database: 'temple',
      synchronize: true,
      logging: true,
      entities: Entities,
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [DataBaseController],
  providers: [DataBaseService],
})
export class DataBaseModule {}
