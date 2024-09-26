import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws'; // WebSocket 추가
import authRoutes from './srcs/auth/auth.route.js';
import userRoutes from './srcs/user/user.route.js';
import communityRoutes from './srcs/community/community.route.js';
import errorRoutes from './srcs/error/error.route.js';
import path from 'path';

const app = express();
const port = 3000;

// HTTP 서버 생성
const server = http.createServer(app);

// 웹소켓 서버 생성
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('클라이언트가 연결되었습니다.');

  ws.on('close', () => {
    console.log('클라이언트 연결 종료');
  });
});

// 웹소켓 클라이언트에 메시지 전송 함수
export const sendToClients = (data) => {
  console.log('전송할 데이터:', data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// 정적 파일 제공
app.use(express.static(path.join(process.cwd(), 'srcs', 'public'))); // srcs/public에서 정적 파일 제공

// API 엔드포인트 설정
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/community', communityRoutes);
app.use('/errors', errorRoutes);

// 기본 경로에 대한 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'srcs', 'public', 'index.html')); // srcs/public에 있는 index.html 제공
});

// 서버 시작
server.listen(port, '0.0.0.0', () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
