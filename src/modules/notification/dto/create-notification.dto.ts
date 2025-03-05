import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { NotificationType } from '../entity/notification.entity';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  payload?: Record<string, any>;
}
