import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetArticlesByBoardDto } from "modules/article/dto/get-article.dto";
import { Article } from "modules/article/entities/article.entity";
import { User } from "modules/user/entities/user.entity";
import { Brackets, Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./entities/board.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll() {
    return this.boardRepository.find();
  }

  findOne(id: number) {
    return this.boardRepository.find({
      where: {
        id,
      },
    });
  }

  async findArticlesByBoard(getArticlesByBoard: GetArticlesByBoardDto) {
    const { id, start, limit, sort, title, content } = getArticlesByBoard;

    if (id) {
      let qb = this.articleRepository
        .createQueryBuilder("article")
        .where("article.board_id = :boardId", { boardId: id });

      if (title || content) {
        qb = qb.andWhere(
          new Brackets((_qb) => {
            _qb
              .where("article.title like :title", { title: `%${title}%` })
              .orWhere("article.content like :content", { content: `%${content}%` })
              .orWhere("article.writerName like :content", { content: `%${content}%` })
              .orWhere("article.summary like :content", { content: `%${content}%` })
              .orWhere("article.referencePlace like :referencePlace", {
                referencePlace: `%${content}%`,
              });
          })
        );
      }

      if (sort) {
        const [col, order] = sort.split(":");
        qb = qb.orderBy(`article.${col}`, order as "ASC" | "DESC");
      }
      qb = qb.addOrderBy(`article.createdAt`, "DESC");

      const [data, totalCount] = await qb
        .skip(start || 0)
        .take(limit || 30)
        .getManyAndCount();

      return { data: data, totalCount: totalCount };
    } else {
      return { data: [], totalCount: 0 };
    }
  }

  createByAdmin(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto);
  }

  updateByAdmin(query: UpdateBoardDto) {
    if (!query.id) {
      return this.boardRepository.save({ ...query });
    } else {
      return this.boardRepository.update(query.id, query);
    }
  }

  removeByAdmin(query: UpdateBoardDto) {
    return this.boardRepository.delete(query.id);
  }
}
