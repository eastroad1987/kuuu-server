import { Injectable, Scope } from "@nestjs/common";
import { DataSource, Repository, EntitySchema, ObjectType } from "typeorm";
import { UnitOfWork } from "./unit-of-work.provider";

@Injectable({
  scope: Scope.REQUEST,
})
export class TransactionalRepository {
  constructor(
    private uow: UnitOfWork,
    private dataSource: DataSource
  ) {}

  getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string
  ): Repository<Entity> {
    const transactionManager = this.uow.getTransactionManager();
    if (transactionManager) {
      return this.dataSource.getRepository(target).extend({
        manager: transactionManager,
      });
    }
    return this.dataSource.getRepository(target);
  }
}
