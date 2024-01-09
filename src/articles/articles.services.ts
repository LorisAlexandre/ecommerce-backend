import { Injectable } from '@nestjs/common';
import { ArticleDto } from './dtos';

@Injectable()
export class ArticlesServices {
  constructor() {}

  createArticle(articleDto: ArticleDto) {
    console.log(articleDto);
    return { result: true, article: articleDto };
  }
}
