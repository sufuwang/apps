import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';
import { backupDatabase } from '@repo/tools/email';

@Injectable()
export class TaskService {
  @Inject(HttpService)
  private httpService: HttpService;
  @Inject(AppService)
  private appService: AppService;

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    console.error('start');
    const data = this.appService.getHello();
    console.log('TaskService 定时任务: ', data);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async backupReadMeData() {
    const info = await backupDatabase();
    console.log('【backupReadMeData】', info);
  }

  async onModuleInit() {
    // this.backupReadMeData();
  }
}
