"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UnitOfWork_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWork = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let UnitOfWork = UnitOfWork_1 = class UnitOfWork {
    constructor(connection) {
        this.connection = connection;
        this.logger = new common_1.Logger(UnitOfWork_1.name);
        this.queryRunner = this.connection.createQueryRunner();
    }
    getTransactionManager() {
        return this.transactionManager || this.queryRunner.manager;
    }
    getQueryRunner() {
        return this.queryRunner;
    }
    getConnection() {
        return this.connection;
    }
    async withTransaction(work) {
        try {
            await this.queryRunner.startTransaction();
            this.transactionManager = this.queryRunner.manager;
            const result = await work();
            await this.queryRunner.commitTransaction();
            return result;
        }
        catch (error) {
            await this.queryRunner.rollbackTransaction();
            this.logger.error(error);
            throw error;
        }
        finally {
            this.transactionManager = null;
            await this.queryRunner.release();
        }
    }
};
exports.UnitOfWork = UnitOfWork;
exports.UnitOfWork = UnitOfWork = UnitOfWork_1 = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], UnitOfWork);
