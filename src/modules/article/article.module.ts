import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleComment } from "modules/article-comment/entities/article-comment.entity";
import { Board } from "modules/board/entities/board.entity";
import { User } from "modules/user/entities/user.entity";
import { ArticleCommentService } from "../article-comment/article-comment.service";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { Article } from "./entities/article.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleComment, Board, User])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleCommentService],
})
export class ArticleModule {}
