// 가볍게 express를 사용한 API
const express = require('express');
const cors = require('cors');

// 미리 앱 인스턴스 생성
const app = express();

// 기본 미들웨어
app.use(express.json());
app.use(cors());

// 라우트 정의
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.all('/api/*', (req, res) => {
  res.status(200).json({
    message: 'API가 정상 작동 중입니다',
    path: req.path
  });
});

// serverless-http 없이 직접 처리
module.exports = (req, res) => {
  // Express의 요청-응답 처리 파이프라인을 활용
  return new Promise((resolve) => {
    let resolved = false;
    
    // timeout 처리
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        res.status(504).json({ error: '내부 처리 시간 초과' });
        resolve();
      }
    }, 5000); // 5초 타임아웃
    
    // 응답 완료 감지
    res.on('finish', () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        resolve();
      }
    });
    
    // Express에 요청 전달
    app(req, res);
  });
}; 