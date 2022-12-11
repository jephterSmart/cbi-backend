import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Project')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  allProjects() {
    const dbUserName = this.configService.get<string>('DB_USERNAME');
    return [dbUserName];
  }
}
