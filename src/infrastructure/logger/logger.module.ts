import { Module } from '@nestjs/common';
import { MyLoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: MyLoggerService,
      useClass: MyLoggerService,
    },
  ],
  exports: [MyLoggerService],
})
export class LoggerModule {}
