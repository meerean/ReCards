"use strict";
// // import express from "express";
// // import session from "express-session";
// // import redisCliend from "./cache/cache";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // const app = express();
// // app.use(
// //   session({
// //     secret: "hello",
// //     resave: false,
// //     saveUninitialized: false,
// //   })
// // );
// // app.get("/", (req, res) => {
// //   console.log(req);
// //   res.send("Hello Se   s   sion");
// // });
// // app.listen(8080, () => console.log("Server running on http://localhost:3000"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const redis_1 = require("./cache/redis");
const config_1 = require("./config/config");
const routes_1 = require("./routes/routes");
let appPort;
process.env.PORT ? (appPort = process.env.PORT) : (appPort = "3000");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use((0, express_session_1.default)({
    secret: config_1.SESS_SECRET,
    store: new redis_1.redisStore({
        url: config_1.REDIS_URI,
        client: redis_1.redisClient,
        ttl: 60 * 60 * 24,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
    },
    saveUninitialized: false,
    resave: false,
}));
app.use(routes_1.userRouter);
const server = app.listen(appPort, () => {
    console.log(`Server started on http://localhost:${appPort}`);
});
exports.default = server;
//# sourceMappingURL=app.js.map