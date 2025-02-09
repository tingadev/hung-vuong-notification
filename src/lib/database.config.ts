import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

function getDbConfig() {
  // deployed
  return {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

export default registerAs<TypeOrmModuleOptions>('database', () => ({
  type: 'postgres',
  ...getDbConfig(),
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  autoLoadEntities: true,
  synchronize: false,
  migrations: [join(__dirname, '../../migrations/*{.ts,.js}')],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: true,
}));
