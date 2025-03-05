import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './entity/notification.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AblyService } from '../ably/ably.service';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class NotificationService extends TypeOrmCrudService<NotificationEntity> {
  constructor(
    @InjectRepository(NotificationEntity)
    repo: Repository<NotificationEntity>,
    private readonly ablyService: AblyService,
  ) {
    super(repo);
  }

  async saveNotification(data: CreateNotificationDto) {
    // Save notification to the database
    const entity = new NotificationEntity();
    entity.content = data.content;
    entity.type = data.type;
    entity.metadata = data.payload;
    entity.user_id = data.user_id;
    const result = await this.repo.save(entity);
    this.ablyService.publishMessage(entity);
    return result;
  }

  async countUnSeenNotification(user_id: string) {
    const unseen = await this.repo.count({
      where: {
        seen_at: IsNull(),
        user_id: user_id,
      },
    });
    return unseen;
  }
}
