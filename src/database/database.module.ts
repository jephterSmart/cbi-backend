import { Project } from '../projects/entities/Project';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        await ConfigModule.envVariablesLoaded;
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          database: configService.get<string>('DB_DATABASE'),
          password: configService.get<string>('DB_PASSWORD'),
          entities: [],
          autoLoadEntities: true,
          cli: {
            migrationsDir: '../migrations',
            entitiesDir: '../**/entities/*.ts',
          },
          migrations: ['../migrations/*.ts', '../migrations/*.js'],
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
class DatabaseModule {}

export default DatabaseModule;
