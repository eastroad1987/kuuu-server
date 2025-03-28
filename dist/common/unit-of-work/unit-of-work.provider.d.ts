import { Connection, EntityManager, QueryRunner } from "typeorm";
export declare class UnitOfWork {
    private connection;
    private transactionManager;
    protected queryRunner: QueryRunner;
    private readonly logger;
    constructor(connection: Connection);
    getTransactionManager(): EntityManager | null;
    getQueryRunner(): QueryRunner;
    getConnection(): Connection;
    withTransaction<T>(work: () => T): Promise<T>;
}
