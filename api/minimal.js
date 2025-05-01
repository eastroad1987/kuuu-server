// 최소한의 서버리스 함수 - 타임아웃 문제 진단용
module.exports = (req, res) => {
  res.status(200).json({
    message: "최소 API가 정상 작동 중입니다",
    timestamp: new Date().toISOString()
  });
}; 