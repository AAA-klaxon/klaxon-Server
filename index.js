import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './srcs/auth/auth.route.js';
import userRoutes from './srcs/user/user.route.js';
import communityRoutes from './srcs/community/community.route.js';
import errorRoutes from './srcs/error/error.route.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/community', communityRoutes);
app.use('/errors', errorRoutes);

// 기본 경로에 대한 처리
app.get('/', (req, res) => {
  res.send('Hello, World! 서버가 정상적으로 동작하고 있습니다.');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`서버가 http://0.0.0.0:${port}에서 실행 중입니다.`);
});
