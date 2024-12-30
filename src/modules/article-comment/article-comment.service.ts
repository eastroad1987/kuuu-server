import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { isEmpty } from "lodash";
import { Repository } from "typeorm";

// import { Article } from "../article/article.entity";
import { Article } from "modules/article/entities/article.entity";
import { CreateArticleCommentDto } from "./dto/create-article-comment.dto";
import { UpdateArticleCommentDto } from "./dto/update-article-comment.dto";
import { ArticleComment } from "./entities/article-comment.entity";

@Injectable()
export class ArticleCommentService {
  constructor(
    @InjectRepository(ArticleComment)
    private commentRepository: Repository<ArticleComment>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}
  async create(createCommentDto: CreateArticleCommentDto) {
    const article = await this.articleRepository
      .createQueryBuilder("article")
      .where({ id: createCommentDto.articleId })
      .getOne();
    if (!article) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }
    return this.commentRepository.save(createCommentDto);
  }

  async update(updateCommentDto: UpdateArticleCommentDto) {
    const article = await this.articleRepository
      .createQueryBuilder("article")
      .where({ id: updateCommentDto.articleId })
      .getOne();
    if (!article) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }
    return this.commentRepository.update(updateCommentDto.id, updateCommentDto);
  }

  async remove(updateCommentDto: UpdateArticleCommentDto) {
    const article = await this.articleRepository
      .createQueryBuilder("article")
      .where({ id: updateCommentDto.articleId })
      .getOne();
    if (!article) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }

    return await this.commentRepository.delete(updateCommentDto.id);
  }

  async findCommentsByArticle(articleId: number) {
    const article = await this.articleRepository
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.comments", "comment")
      .where({ id: articleId })
      .getOne();
    if (!article) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }

    return article;
  }
}
