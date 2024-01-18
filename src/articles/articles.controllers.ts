import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { CreateArticleDto, UpdateArticleDto } from './dtos';
import { ArticlesServices } from './articles.services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('articles')
export class ArticlesControllers {
  constructor(private articlesServices: ArticlesServices) {}

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
  @Patch('update/:id')
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
  getAllArticles() {
    return this.articlesServices.getAllArticles();
  }

  @Get('byId/:id')
  getById(@Param('id') id: string) {
    return this.articlesServices.getById(id);
  }

  @Get('byCollection/:suite')
  getByCollection(@Param('suite') suite: string) {
    return this.articlesServices.getByCollection(suite);
  }

  @Get('lastArticle')
  getLastArticle() {
    return this.articlesServices.getLastArticle();
  }

  @Get('lastCollection')
  getLastCollection() {
    return this.articlesServices.getLastCollection();
  }
}
