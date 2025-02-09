import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Ably from 'ably';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';

@Injectable()
export class AblyService {
  private ably: Ably.Realtime;
  private channel: Ably.RealtimeChannel;

  constructor(configService: ConfigService) {
    // Initialize the Ably Realtime service
    this.ably = new Ably.Realtime({ key: configService.get('ABLY_API_KEY') });
    this.channel = this.ably.channels.get(
      configService.get('ABLY_API_CHANNEL'),
    );
  }

  // Publish a message to the channel
  async publishMessage(data: CreateNotificationDto) {
    await this.channel.publish('broadcast', data);
  }

  // Subscribing to the channel (can be used for clients to listen for messages)
  subscribeToChannel(callback: (message: Ably.Message) => void) {
    this.channel.subscribe('broadcast', callback);
  }

  // Close the connection
  closeConnection() {
    this.ably.close();
  }
}
