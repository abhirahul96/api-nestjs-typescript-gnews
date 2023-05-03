import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseInterceptors(CacheInterceptor) // Use the CacheInterceptor from NestJS cache manager
  @Get('/:limit')
  getNews(@Param('limit') recordLimit: number, @Query('query') query: string) {
    return this.newsService.getNews(recordLimit, query);
  }
}
