import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class ArticlesServices {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createArticle(
    createArticleDto: CreateArticleDto,
    file: Express.Multer.File,
  ) {
    const topographicMap = await this.uploadFile(file.buffer);

    const newArticle = new this.articleModel({
      ...createArticleDto,
      topographicMap,
    });
    const savedArticle = await newArticle.save();

    return { result: true, article: savedArticle };
  }

  async updateArticle(
    id: string,
    updateArticleDto: UpdateArticleDto,
    file: Express.Multer.File,
  ) {
    if (file) {
      const foundArticle = await this.articleModel.findById(id);
      const result = await this.deleteFile(
        foundArticle.topographicMap.public_id,
      );
      const topographicMap = await this.uploadFile(file.buffer);
      if (result && topographicMap) {
        const updatedArticle = await this.articleModel.findByIdAndUpdate(
          id,
          {
            ...updateArticleDto,
            topographicMap,
          },
          { new: true },
        );

        return { result: true, article: updatedArticle };
      }
    } else {
      const updatedArticle = await this.articleModel.findByIdAndUpdate(
        id,
        updateArticleDto,
        { new: true },
      );

      return { result: true, article: updatedArticle };
    }
  }

  async deleteArticle(id: string) {
    const foundArticle = await this.articleModel.findById(id);
    await this.deleteFile(foundArticle.topographicMap.public_id);
    await foundArticle.deleteOne({ _id: id });
    return { result: true };
  }

  async getAllArticles() {
    try {
      const articles = await this.articleModel.find();
      if (articles.length) throw new HttpException('No Article yet', 404);
      return { result: true, articles };
    } catch {
      throw new HttpException('Article not found', 404);
    }
  }

  async getById(id: string) {
    try {
      const article = await this.articleModel.findById(id);
      return { result: true, article };
    } catch {
      throw new HttpException('Article not found', 404);
    }
  }

  uploadFile(fileBuffer: Buffer) {
    return new Promise((resolve, reject) => {
      this.cloudinaryService.cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
          },
          (err, result) => {
            if (err) reject(err);
            else
              resolve({ url: result.secure_url, public_id: result.public_id });
          },
        )
        .end(fileBuffer);
    });
  }

  deleteFile(public_id: string) {
    return new Promise((resolve, reject) => {
      this.cloudinaryService.cloudinary.api
        .delete_resources([public_id])
        .then(() => resolve({ result: true }))
        .catch((err) => reject(err));
    });
  }
}
