import { CreateProjectTables1670786797513 } from '../migrations/1670786797513-CreateProjectTables';
import { Image } from '../projects/entities/Image';
import { Project } from '../projects/entities/Project';
import { TakeAway } from '../projects/entities/TakeAway';
import { CreateUserTable1670767893584 } from '../migrations/1670767893584-CreateUserTable';
import { User } from '../users/entities/User';

import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({
  path: `${process.cwd()}/src/env/${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [User, TakeAway, Project, Image],
  migrations: [CreateUserTable1670767893584, CreateProjectTables1670786797513],
});
