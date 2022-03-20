const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const server = jsonServer.create();

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

// 중략

server.use(auth);