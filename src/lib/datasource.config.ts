import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from './database.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GlobalConfigModule } from 'src/shared/global-config/global-config.module';

GlobalConfigModule.forRoot();

const options = databaseConfig() as TypeOrmModuleOptions as DataSourceOptions;
export default new DataSource({
  ...options,
});
