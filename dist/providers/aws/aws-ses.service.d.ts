import { SES } from "aws-sdk";
import { ConfigService } from "@nestjs/config";
export declare class AwsSESService {
    private configService;
    SESConfig: SES.ClientConfiguration;
    constructor(configService: ConfigService);
    sendWelcomeEmail(email: string, actionUrl: string): Promise<import("aws-sdk/lib/request").PromiseResult<SES.SendTemplatedEmailResponse, import("aws-sdk").AWSError>>;
    sendResetPasswordEmail(email: string, actionUrl: string, operatingSystem: string, browserName: string): Promise<import("aws-sdk/lib/request").PromiseResult<SES.SendTemplatedEmailResponse, import("aws-sdk").AWSError>>;
    sendConfirmEmail(email: string, actionUrl: string, operatingSystem: string, browserName: string): Promise<import("aws-sdk/lib/request").PromiseResult<SES.SendTemplatedEmailResponse, import("aws-sdk").AWSError>>;
}
