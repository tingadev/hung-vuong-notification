import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/lib/database.config';
import { GlobalConfigService } from './global-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      load: [databaseConfig],
    }),
  ],
})
export class GlobalConfigModule {
  static forRoot() {
    return {
      module: GlobalConfigModule,
      providers: [GlobalConfigService],
      exports: [GlobalConfigService],
    };
  }
}
