import { Type } from "@nestjs/common";
export declare class PaginatedDto<TData> {
    totalCount: number;
    data: TData[];
}
export declare const ApiPaginatedResponse: <TModel extends Type<any>>(model: TModel) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
