import { Global, Module } from "@nestjs/common";
import { TransactionalRepository } from "./transactional.repository";
import { UnitOfWork } from "./unit-of-work.provider";

@Global()
@Module({
  providers: [UnitOfWork, TransactionalRepository],
  exports: [UnitOfWork, TransactionalRepository],
})
export class UnitOfWorkModule {}
