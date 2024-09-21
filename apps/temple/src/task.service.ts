import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TaskService {
  @Inject(HttpService)
  private httpService: HttpService;

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    console.info('start');
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:9000/'),
    );
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
