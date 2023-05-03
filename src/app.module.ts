import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import winston from 'winston';
import moment from 'moment';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60, // seconds
      max: 10, // maximum number of items in cache
      // Store-specific configuration:
      store: redisStore,
      host: 'localhost',
      port: 6379,
      isGlobal: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        // Configuring Winston File Transport for logging.
        transports: [
          new winston.transports.File({
            filename: `${process.cwd()}/logs/log-${moment().format(
              'YYYY-MM-DD',
            )}.log`,
          }),
          // Configuring Winston Console Transport for logging.
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
