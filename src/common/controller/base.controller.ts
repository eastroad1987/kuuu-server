import { ApiResponse } from "@nestjs/swagger";

@ApiResponse({ status: 200, description: "요청 성공" })
@ApiResponse({ status: 201, description: "생성 성공" })
@ApiResponse({ status: 400, description: "요청 오류" })
@ApiResponse({ status: 401, description: "권한 없음" })
@ApiResponse({ status: 404, description: "데이터 없음" })
@ApiResponse({ status: 500, description: "서버 오류" })
export class BaseController {}
