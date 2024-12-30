import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";
import { ArticleComment } from "../article-comment/entities/article-comment.entity";

import { CreateArticleDto } from "./dto/create-article.dto";
import { GetArticleDto, GetArticlesByBoardDto } from "./dto/get-article.dto";

import { Article } from "./entities/article.entity";

import { TransactionalRepository } from "common/unit-of-work/transactional.repository";
import { UnitOfWork } from "common/unit-of-work/unit-of-work.provider";
import { checkUserImageUrl } from "common/util/likeScrapUtil";
import { User } from "modules/user/entities/user.entity";
import { transFormFilter, transFormWhereClause } from "../../common/util/parseMethod";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(ArticleComment)
    private commentRepository: Repository<ArticleComment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private uow: UnitOfWork,
    protected repository: TransactionalRepository
  ) {}
  create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.save({ ...createArticleDto });
  }

  async findArticleById(id: number, getArticleDto: GetArticleDto) {
    console.log(id, getArticleDto);

    const article = await this.articleRepository
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.comments", "comment")
      .where({ id: id })
      .getOne();
    if (!article) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }

    return article;
  }

  async findArticlesByBoardId(getArticlesByBoard: GetArticlesByBoardDto) {
    const { start, limit, id, sort, title, content } = getArticlesByBoard;
    let qb = this.articleRepository
      .createQueryBuilder("article")
      .where("article.boardId = :id", { id });

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

    return { data, totalCount };
  }

  async increaseViewCount(id: number) {
    const { viewCnt } = await this.articleRepository.findOne({ where: { id } });
    await this.articleRepository.update(+id, {
      viewCnt: viewCnt + 1,
    });
  }

  async findAll({ endDate, limit, sort, start, startDate, title, content }: GetArticleDto) {
    let qb = this.articleRepository
      .createQueryBuilder("article")
      .orderBy("article.createdAt", "DESC");

    if (title || content) {
      qb = qb.andWhere(
        new Brackets((_qb) => {
          _qb
            .where("article.title like :title", { title: `%${title}%` })
            .orWhere("article.content like :content", { content: `%${content}%` })
            .orWhere("article.writerName like :writerName", { writerName: `%${content}%` })
            .orWhere("article.summary like :writerName", { writerName: `%${content}%` })
            .orWhere("article.referencePlace like :referencePlace", {
              referencePlace: `%${content}%`,
            });
        })
      );
    }

    // if (title) {
    //   qb = qb.andWhere("article.title like :title", { title: `%${title}%` });
    // }

    // if (content) {
    //   qb = qb.andWhere("article.content like :content", { content: `%${content}%` });
    // }

    if (sort) {
      const [col, order] = sort.split(":");
      qb = qb.orderBy(`article.${col}`, order as "ASC" | "DESC");
    }
    qb = qb.addOrderBy(`article.createdAt`, "DESC");

    if (startDate) {
      qb = qb.andWhere("article.startDate >= :startDate", { startDate });
    }

    if (endDate) {
      qb = qb.andWhere("article.endDate <= :endDate", { endDate });
    }

    const [data, totalCount] = await qb
      .skip(start || 0)
      .take(limit || 20)
      .getManyAndCount();

    await checkUserImageUrl(data, this.userRepository);

    return { data, totalCount };
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(+id, updateArticleDto);
  }

  async remove(id: number) {
    await this.commentRepository.delete({
      articleId: id,
    });
    return this.articleRepository.delete(id);
  }

  // 트랜잭션 처리로 변경
  async removeTransaction(id: number) {
    await this.uow.withTransaction(async () => {
      await this.commentRepository.delete({
        articleId: id,
      });
      await this.articleRepository.delete(id);
    });
  }

  async checkOwnership({ id, writerId }: { id: number; writerId: number }) {
    const article = await this.articleRepository.findOne({ where: { id } });
    return article.writerId === writerId;
  }

  async findAllByAdmin(query: GetArticleDto) {
    const { filter } = query;
    const qb = await this.articleRepository.createQueryBuilder("article");
    if (filter) {
      const typedFilter = transFormFilter(filter);
      typedFilter.map((item) => {
        const [property, method, value] = item.split(":");
        qb.andWhere(`article.${property} ${transFormWhereClause(method, value)}`);
      });
    }
    const [data, totalCount] = await qb.getManyAndCount();

    return { data, totalCount };
  }

  updateArticle(query: UpdateArticleDto) {
    if (!query.id) {
      return this.articleRepository.save({ ...query });
    } else {
      return this.articleRepository.update(query.id, query);
    }
  }

  updateArticleByAdmin(query: UpdateArticleDto) {
    if (!query.id) {
      return this.articleRepository.save({ ...query });
    } else {
      return this.articleRepository.update(query.id, query);
    }
  }

  removeByAdmin(query: UpdateArticleDto) {
    return this.articleRepository.delete(query.id);
  }
}
