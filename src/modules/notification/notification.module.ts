import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { AblyModule } from '../ably/ably.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entity/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity]), AblyModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
