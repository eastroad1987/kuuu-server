import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";
import { User } from "../user/entities/user.entity";
import { Article } from "modules/article/entities/article.entity";
import { ArticleComment } from "modules/article-comment/entities/article-comment.entity";
import { ArticleService } from "modules/article/article.service";

@Module({
  imports: [TypeOrmModule.forFeature([Board, User, Article, ArticleComment])],
  controllers: [BoardController],
  providers: [BoardService, ArticleService],
})
export class BoardModule {}
