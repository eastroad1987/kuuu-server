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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const unit_of_work_provider_1 = require("./unit-of-work.provider");
let TransactionalRepository = class TransactionalRepository {
    constructor(uow, dataSource) {
        this.uow = uow;
        this.dataSource = dataSource;
    }
    getRepository(target) {
        const transactionManager = this.uow.getTransactionManager();
        if (transactionManager) {
            return this.dataSource.getRepository(target).extend({
                manager: transactionManager,
            });
        }
        return this.dataSource.getRepository(target);
    }
};
exports.TransactionalRepository = TransactionalRepository;
exports.TransactionalRepository = TransactionalRepository = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    __metadata("design:paramtypes", [unit_of_work_provider_1.UnitOfWork,
        typeorm_1.DataSource])
], TransactionalRepository);
