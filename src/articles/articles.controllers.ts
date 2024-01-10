import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { Article } from './schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto, UpdateArticleDto } from './dtos';
import { ArticlesServices } from './articles.services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('articles')
export class ArticlesControllers {
  constructor(
    private articlesServices: ArticlesServices,
    @InjectModel(Article.name) private articleModel = Model<Article>,
  ) {}

  @UseGuards(JwtGuard)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('topographicMap'))
  @Post('create')
  createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.articlesServices.createArticle(createArticleDto, file);
  }

  @UseGuards(JwtGuard)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('topographicMap'))
  @Post('update/:id')
  updateArticle(
    @Param('id') id: string,
    @Body()
    updateArticleDto: UpdateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.articlesServices.updateArticle(id, updateArticleDto, file);
  }

  @UseGuards(JwtGuard)
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  deleteArticle(@Param('id') id: string) {
    return this.articlesServices.deleteArticle(id);
  }

  @Get('all')
  async getAllrticles() {
    return this.articlesServices.getAllArticles();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.articlesServices.getById(id);
  }
}
