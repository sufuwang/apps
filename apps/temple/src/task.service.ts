import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';
import { compressDataBaseFile } from '@repo/tools/folder';

@Injectable()
export class TaskService {
  @Inject(HttpService)
  private httpService: HttpService;
  @Inject(AppService)
  private appService: AppService;

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const { path, compressedFileName } = await compressDataBaseFile();
    console.info('start: ', path, compressedFileName);
    const data = this.appService.getHello();
    console.log('TaskService 定时任务: ', data);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async backupReadMeData() {
    console.info('backupReadMeData start');
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:3000/api/email'),
    );
    console.log('TaskService backupReadMeData 定时任务: ', data);
  }

  onModuleInit() {
    // this.backupReadMeData();
  }
}
