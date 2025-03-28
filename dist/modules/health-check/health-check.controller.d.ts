import { HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
export declare class HealthCheckController {
    private health;
    private http;
    private db;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, db: TypeOrmHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
