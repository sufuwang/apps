import { Inject, Injectable } from '@nestjs/common';
import TaskEntity from './entities/task.entity';
import TaskDto from './dto/task.dto';
import { EntityManager } from 'typeorm';

const DataBaseReflect: Record<DataBaseName, typeof TaskEntity> = {
  task: TaskEntity,
};

@Injectable()
export class DataBaseService {
  @Inject()
  entityManager: EntityManager;

  getAll(dataBaseName: DataBaseName) {
    return this.entityManager.find(DataBaseReflect[dataBaseName]);
  }

  create(dataBaseName: DataBaseName, dto: TaskDto) {
    return this.entityManager.save(DataBaseReflect[dataBaseName], dto);
  }
}
