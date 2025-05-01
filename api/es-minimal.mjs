// ESM 형식의 최소 API
export default function handler(req, res) {
  res.status(200).json({
    message: "ES Module API가 정상 작동 중입니다",
    timestamp: new Date().toISOString()
  });
} 