import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../post/entities/post.entity";
import { User } from "../user/entities/user.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetCommentDto } from "./dto/get-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.postId },
    });
    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (createCommentDto.parentCommentId) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: createCommentDto.parentCommentId },
      });
      if (!parentComment) {
        throw new NotFoundException("Parent comment not found");
      }
    }

    return this.commentRepository.save({
      ...createCommentDto,
      authorId: userId,
      writeName: user.name,
    });
  }

  async findAll(query: GetCommentDto) {
    let qb = this.commentRepository
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.author", "author")
      .leftJoinAndSelect("comment.post", "post")
      .leftJoinAndSelect("comment.parentComment", "parentComment");

    if (query.postId) {
      qb = qb.andWhere("comment.postId = :postId", { postId: query.postId });
    }

    if (query.authorId) {
      qb = qb.andWhere("comment.authorId = :authorId", { authorId: query.authorId });
    }

    if (query.content) {
      qb = qb.andWhere("comment.content LIKE :content", { content: `%${query.content}%` });
    }

    if (query.sort) {
      const [field, order] = query.sort.split(":");
      qb = qb.orderBy(`comment.${field}`, order as "ASC" | "DESC");
    } else {
      qb = qb.orderBy("comment.createdAt", "DESC");
    }

    const [data, totalCount] = await qb
      .skip(query.start || 0)
      .take(query.limit || 20)
      .getManyAndCount();

    return { data, totalCount };
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ["author", "post", "parentComment"],
    });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (comment.authorId !== userId) {
      throw new UnauthorizedException("You can only update your own comments");
    }

    return this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (comment.authorId !== userId) {
      throw new UnauthorizedException("You can only delete your own comments");
    }

    return this.commentRepository.delete(id);
  }
}
