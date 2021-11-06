import "reflect-metadata";
import cors from "cors";
import express, { Application } from "express";
import session from "express-session";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import { createConnection } from "typeorm";
import userRouter from "./routes/user/user";
import passportConfig from "./utils/lib/passport_config";
config();
const app: Application = express();

(async () => {
  await createConnection();
})();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }));
app.use(
  session({
    secret: process.env.SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);
const port = 3000;

app.use(cookieParser(process.env.SECRET as string));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
/**++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ROUTES
 *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

app.use("/user", userRouter);
app.listen(port, "localhost", () =>
  console.log(`the server is on http://localhost:${port}`)
);
