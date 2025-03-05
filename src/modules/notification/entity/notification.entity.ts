import { BaseEntity } from 'src/shared/entities';
import { Column, Entity } from 'typeorm';

export enum NotificationType {
  SCHEDULE = 'Schedule',
  CHAT = 'Chat',
}

@Entity('notification')
export class NotificationEntity extends BaseEntity {
  @Column()
  content: string;

  @Column()
  type: NotificationType;

  @Column({ nullable: true })
  user_id: string;

  @Column('jsonb', { nullable: true })
  metadata: any;

  @Column({ nullable: true })
  seen_at: Date;
}
