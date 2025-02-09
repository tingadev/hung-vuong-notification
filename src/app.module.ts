import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './modules/notification/notification.module';
import { GlobalConfigModule } from './shared/global-config/global-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalConfigService } from './shared/global-config/global-config.service';
import { AblyModule } from './modules/ably/ably.module';

@Module({
  imports: [
    GlobalConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [GlobalConfigModule],
      inject: [GlobalConfigService],
      useFactory: (cf: GlobalConfigService) => cf.get('database'),
    }),
    NotificationModule,
    AblyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
