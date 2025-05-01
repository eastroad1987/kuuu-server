import { DataSource, Repository, EntitySchema, ObjectType } from "typeorm";
import { UnitOfWork } from "./unit-of-work.provider";
export declare class TransactionalRepository {
    private uow;
    private dataSource;
    constructor(uow: UnitOfWork, dataSource: DataSource);
    getRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity>;
}
