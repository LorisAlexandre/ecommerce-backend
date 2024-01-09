import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { Article } from './schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleDto } from './dtos';
import { ArticlesServices } from './articles.services';

@Controller('articles')
export class ArticlesControllers {
  constructor(
    private articlesServices: ArticlesServices,
    @InjectModel(Article.name) private articleModel = Model<Article>,
  ) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createArticle(articleDto: ArticleDto) {
    return this.articlesServices.createArticle(articleDto);
  }
}
