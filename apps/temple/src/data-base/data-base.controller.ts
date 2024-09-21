import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import TaskEntity from './entities/task.entity';

@Controller('dataBase')
export class DataBaseController {
  @Inject(DataBaseService)
  private readonly dataBaseService: DataBaseService;

  @Get('ping')
  findAll() {
    return 'success';
  }

  @Get(':dataBaseName')
  getAll(@Param('dataBaseName') name: DataBaseName) {
    return this.dataBaseService.getAll(name);
  }

  @Post(':dataBaseName')
  create(
    @Param('dataBaseName') name: DataBaseName,
    @Body() entity: TaskEntity,
  ) {
    return this.dataBaseService.create(name, entity);
  }
}
