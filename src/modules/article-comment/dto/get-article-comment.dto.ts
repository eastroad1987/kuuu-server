import { BaseGetDto } from "common/dto/base.dto";

export class GetArticleWithCommentsDto extends BaseGetDto {
  readonly id: number;
}
