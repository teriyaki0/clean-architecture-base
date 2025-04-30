import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './infrastructure/common/filter/exeption.filter';
import { MyLoggerService } from './infrastructure/logger/logger.service';
import * as cookieParser from 'cookie-parser';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './infrastructure/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: true });

  app.use(cookieParser());

  app.useLogger(app.get(MyLoggerService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new LoggingInterceptor(app.get(MyLoggerService)));
  
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
