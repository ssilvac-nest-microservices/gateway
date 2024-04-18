import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {
  @Get()
  check(): string {
    return 'Client gateway is up and running!';
  }
}
