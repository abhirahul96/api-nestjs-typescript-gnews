import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class NewsService {
  constructor(private configService: ConfigService) {}
  // Method for fetching news data.
  async getNews(recordLimit: number, query?: string) {
    try {
      // Building the API URL using configuration values.
      const apiUrl = `${this.configService.get(
        'BASE_URL',
      )}/search?q=${query}&lang=en&country=us&max=${recordLimit}&apikey=${this.configService.get(
        'API_KEY',
      )}`;
      // Fetching news data from the API.
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
