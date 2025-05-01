import express from "express";
import serverless from "serverless-http";
import * as pathToRegexp from "path-to-regexp";
import helmet from "helmet";
import cors from "cors";

// 필요한 path-to-regexp 모듈이 로드되었는지 확인
console.log("path-to-regexp loaded:", !!pathToRegexp);

// 간단한 Express 앱 생성
const app = express();

// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// CORS 설정 - express에서 지원하는 cors 패키지 사용
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

// 기본 라우트
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    serverless: true,
  });
});

// 메인 API 라우트
app.all("/api/*", (req, res) => {
  res.status(200).json({
    message: "API 요청이 성공적으로 처리되었습니다",
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// 기본 핸들러
const handler = serverless(app);

// Vercel Serverless 함수
export default async (req, res) => {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error("Serverless handler error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}; 