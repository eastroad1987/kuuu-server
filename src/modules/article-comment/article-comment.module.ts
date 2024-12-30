import { Module } from "@nestjs/common";

import { ArticleCommentService } from "./article-comment.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "modules/article/entities/article.entity";
import { Board } from "modules/board/entities/board.entity";
import { User } from "../user/entities/user.entity";
import { ArticleCommentController } from "./article-comment.controller";
import { ArticleComment } from "./entities/article-comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleComment, Article, Board, User])],
  controllers: [ArticleCommentController],
  providers: [ArticleCommentService],
})
export class ArticleCommentModule {}
