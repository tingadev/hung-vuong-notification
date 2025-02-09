import { Controller, Get, Post, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Request } from 'express';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Crud, CrudController } from '@dataui/crud';
import { NotificationEntity } from './entity/notification.entity';
@Crud({
  model: {
    type: NotificationEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    sort: [{ field: 'created_at', order: 'DESC' }], // Ensure sorting is allowed
  },
})
@Controller('notification')
export class NotificationController
  implements CrudController<NotificationEntity>
{
  constructor(public service: NotificationService) {}

  @Post('send')
  async sendNotification(@Req() request: Request) {
    const body: CreateNotificationDto = request.body;
    return this.service.saveNotification(body);
  }

  @Get('/total-unseen')
  async totalUnSeen() {
    return this.service.countUnSeenNotification();
  }
}
