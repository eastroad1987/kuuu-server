import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger";

export class PaginatedDto<TData> {
  @ApiProperty()
  totalCount: number;
  data: TData[];
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              totalCount: { type: "number" },
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
  );
};
