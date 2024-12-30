"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const swagger_1 = require("@nestjs/swagger");
let BaseController = class BaseController {
};
exports.BaseController = BaseController;
exports.BaseController = BaseController = __decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: "요청 성공" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "생성 성공" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "요청 오류" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "권한 없음" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "데이터 없음" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "서버 오류" })
], BaseController);
//# sourceMappingURL=base.controller.js.map