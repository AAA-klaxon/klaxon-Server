// srcs/index.js
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

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});

