import express from "express";
import serverless from "serverless-http";
import cors from "cors";

// 전역 인스턴스 캐싱 (콜드 스타트 최적화)
let cachedHandler;

// Express 앱 생성 및 초기화
function createApp() {
  const app = express();
  
  // 필수 미들웨어만 사용
  app.use(express.json());
  app.use(cors());
  
  // 기본 라우트 - 빠른 응답
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });
  
  // 메인 API 라우트 - 빠른 응답
  app.all("/api/*", (req, res) => {
    res.status(200).json({ 
      message: "API 서비스가 정상 작동 중입니다",
      path: req.path 
    });
  });
  
  return app;
}

// Vercel Serverless 함수 - 최적화된 버전
export default async (req, res) => {
  // 캐싱된 핸들러 재사용
  if (!cachedHandler) {
    const app = createApp();
    cachedHandler = serverless(app);
    console.log("서버리스 핸들러 초기화 완료");
  }
  
  try {
    // 타임아웃 방지를 위한 빠른 처리
    return await Promise.race([
      cachedHandler(req, res),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error("내부 타임아웃")), 50000);
      })
    ]);
  } catch (error) {
    console.error("에러 발생:", error.message);
    
    // 이미 응답이 전송되지 않았다면 오류 응답 전송
    if (!res.headersSent) {
      res.status(error.message === "내부 타임아웃" ? 504 : 500)
        .json({ error: error.message });
    }
    return;
  }
}; 