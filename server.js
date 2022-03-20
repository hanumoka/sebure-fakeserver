// server.js
import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';
import { Low, JSONFile, LowSync, JSONFileSync  } from 'lowdb';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const server = jsonServer.create();
const router = jsonServer.router('db.json');

// /!\ Bind the router db to the app
server.db = router.db

const middlewares = jsonServer.defaults();

const __dirname = dirname(fileURLToPath(import.meta.url));

// db.json를 조작하기 위해 lowdb를 사용
const db = new LowSync(new JSONFileSync('db.json'))

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// // Add custom routes before JSON Server router
// server.delete('/todos/completed', (req, res) => {
//   // lowdb를 사용해서 db.json에서 completed: true인 todo를 제거
//   db.get('todos')
//     .remove({ completed: true })
//     .write();
//
//   // todos를 응답
//   res.send(db.get('todos').value());
// })

/**
 * 과제에선 GET, POST, DELETE만 필요했기 때문에
 * 3가지 method만 작성했고,
 * 어차피 mock api이고 local에서 구동되는 거라
 * origin을 all(*)로 설정했다.
 */
server.use(
  cors({
    origin: "*",
    preflightContinue: false,
    methods: "GET,POST,DELETE"
  })
);
/**
 * 모든 router에 대해 preflight 요청 활성화
 */
server.options("*", cors());

server.use(auth);

// Use default router
server.use(router);

server.listen(3010, () => {
  console.log('JSON Server is running 3010')
});