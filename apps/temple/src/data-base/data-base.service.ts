import { Inject, Injectable } from '@nestjs/common';
import TaskEntity from './entities/task.entity';
import TaskDto from './dto/task.dto';
import { EntityManager } from 'typeorm';
import ExpenditureEntity from './entities/readMe/expenditure.entity';

const DataBaseReflect: Record<DataBaseName, any> = {
  task: TaskEntity,
  expenditure: ExpenditureEntity,
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
