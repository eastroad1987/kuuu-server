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
exports.AwsSESService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
let AwsSESService = class AwsSESService {
    constructor(configService) {
        this.configService = configService;
        this.SESConfig = {
            accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
            region: this.configService.get("AWS_REGION"),
        };
    }
    async sendWelcomeEmail(email, actionUrl) {
        const params = {
            Destination: {
                ToAddresses: [email],
            },
            ConfigurationSetName: "TestConfig",
            Source: "Dreamer <no-reply@justadreamer.ru>",
            Template: "WelcomeTemplate",
            TemplateData: JSON.stringify({
                action_url: actionUrl,
                login_url: "https://justadreamer.ru/account/sign-in/",
                username: email,
                support_email: "support@justadreamer.ru",
                help_url: "https://justadreamer.ru/helpdesk/",
            }),
        };
        return await new aws_sdk_1.SES(this.SESConfig).sendTemplatedEmail(params).promise();
    }
    async sendResetPasswordEmail(email, actionUrl, operatingSystem, browserName) {
        const params = {
            Destination: {
                ToAddresses: [email],
            },
            ConfigurationSetName: "TestConfig",
            Source: "Dreamer <no-reply@justadreamer.ru>",
            Template: "ResetPassword",
            TemplateData: JSON.stringify({
                action_url: actionUrl,
                username: email,
                support_url: "support@justadreamer.ru",
                operating_system: operatingSystem,
                browser_name: browserName,
            }),
        };
        return await new aws_sdk_1.SES(this.SESConfig).sendTemplatedEmail(params).promise();
    }
    async sendConfirmEmail(email, actionUrl, operatingSystem, browserName) {
        const params = {
            Destination: {
                ToAddresses: [email],
            },
            ConfigurationSetName: "TestConfig",
            Source: "Dreamer <no-reply@justadreamer.ru>",
            Template: "ConfirmEmail",
            TemplateData: JSON.stringify({
                action_url: actionUrl,
                login_url: "https://justadreamer.ru/account/sign-in/",
                username: email,
                support_url: "support@justadreamer.ru",
                help_url: "https://justadreamer.ru/helpdesk/",
                operating_system: operatingSystem,
                browser_name: browserName,
            }),
        };
        return await new aws_sdk_1.SES(this.SESConfig).sendTemplatedEmail(params).promise();
    }
};
exports.AwsSESService = AwsSESService;
exports.AwsSESService = AwsSESService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsSESService);
//# sourceMappingURL=aws-ses.service.js.map