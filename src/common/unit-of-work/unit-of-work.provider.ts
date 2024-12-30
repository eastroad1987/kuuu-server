import { Injectable, Logger, Scope } from "@nestjs/common";
import { Connection, EntityManager, QueryRunner } from "typeorm";

@Injectable({
  scope: Scope.REQUEST,
})
export class UnitOfWork {
  private transactionManager: EntityManager | null;
  protected queryRunner: QueryRunner;
  private readonly logger = new Logger(UnitOfWork.name);

  constructor(private connection: Connection) {
    this.queryRunner = this.connection.createQueryRunner();
  }

  getTransactionManager(): EntityManager | null {
    return this.transactionManager || this.queryRunner.manager;
  }

  getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }

  getConnection(): Connection {
    return this.connection;
  }

  async withTransaction<T>(work: () => T): Promise<T> {
    try {
      await this.queryRunner.startTransaction();
      this.transactionManager = this.queryRunner.manager;

      const result = await work();
      await this.queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      this.logger.error(error);
      throw error;
    } finally {
      this.transactionManager = null;
      await this.queryRunner.release();
    }
  }
}
