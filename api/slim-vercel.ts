import express from "express";
import serverless from "serverless-http";
import * as pathToRegexp from "path-to-regexp";
import helmet from "helmet";

// 필요한 path-to-regexp 모듈이 로드되었는지 확인
console.log("path-to-regexp loaded:", !!pathToRegexp);

// 간단한 Express 앱 생성
const app = express();

// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// CORS 설정
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

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
      message: error.message
    });
  }
}; 