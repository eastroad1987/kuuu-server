import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../category/entities/category.entity";
import { SubCategory } from "../sub-category/entities/sub-category.entity";
import { User } from "../user/entities/user.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { GetPostDto } from "./dto/get-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: createPostDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    if (createPostDto.subcategoryId) {
      const subcategory = await this.subCategoryRepository.findOne({
        where: { id: createPostDto.subcategoryId },
      });
      if (!subcategory) {
        throw new NotFoundException("SubCategory not found");
      }
    }

    return this.postRepository.save({
      ...createPostDto,
      authorId: userId,
    });
  }

  async findAll(query: GetPostDto) {
    let qb = this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.category", "category")
      .leftJoinAndSelect("post.subcategory", "subcategory");

    if (query.title) {
      qb = qb.andWhere("post.title LIKE :title", { title: `%${query.title}%` });
    }

    if (query.content) {
      qb = qb.andWhere("post.content LIKE :content", { content: `%${query.content}%` });
    }

    if (query.categoryId) {
      qb = qb.andWhere("post.categoryId = :categoryId", { categoryId: query.categoryId });
    }

    if (query.subcategoryId) {
      qb = qb.andWhere("post.subcategoryId = :subcategoryId", {
        subcategoryId: query.subcategoryId,
      });
    }

    if (query.sort) {
      const [field, order] = query.sort.split(":");
      qb = qb.orderBy(`post.${field}`, order as "ASC" | "DESC");
    } else {
      qb = qb.orderBy("post.createdAt", "DESC");
    }

    const [data, totalCount] = await qb
      .skip(query.start || 0)
      .take(query.limit || 20)
      .getManyAndCount();

    return { data, totalCount };
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ["category", "subcategory"],
    });
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException("Post not found");
    }

    if (post.authorId !== userId) {
      throw new UnauthorizedException("You can only update your own posts");
    }

    if (updatePostDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updatePostDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException("Category not found");
      }
    }

    if (updatePostDto.subcategoryId) {
      const subcategory = await this.subCategoryRepository.findOne({
        where: { id: updatePostDto.subcategoryId },
      });
      if (!subcategory) {
        throw new NotFoundException("SubCategory not found");
      }
    }

    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException("Post not found");
    }

    if (post.authorId !== userId) {
      throw new UnauthorizedException("You can only delete your own posts");
    }

    return this.postRepository.delete(id);
  }

  async increaseViewCount(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException("Post not found");
    }

    return this.postRepository.update(id, { viewCnt: post.viewCnt + 1 });
  }
}
