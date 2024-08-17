// srcs/index.js
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './srcs/user/user.route.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// 사용자 관련 라우트 설정
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});

