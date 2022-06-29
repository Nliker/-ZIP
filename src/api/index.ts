import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger-output.json";
import userController from "@src/api/user.controller";
import newsController from "@src/api/news.controller";
import quizController from "@src/api/quiz.controller";
import binsController from "@src/api/bins.controller";
import postController from "@src/api/post.controller";
import trashController from "@src/api/trash.controller";
import robotController from "@src/api/robot.controller";
import { STATUS_404_NOTFOUND } from "@src/utils/statusCode";
import { RequestError } from "@src/middlewares/errorHandler";

const indexController = (app: Express) => {
    app.use("/api", userController);
    app.use("/api", newsController);
    app.use("/api", quizController);
    app.use("/api", binsController);
    app.use("/api", postController);
    app.use("/api", trashController);
    app.use("/api", robotController);
    app.get("/api", (_req, res) => {
        res.redirect("/api/swagger");
    });
    app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use("*", (_req, _res) => {
        throw new RequestError("요청하신 페이지를 찾을 수 없습니다.", STATUS_404_NOTFOUND);
    });
};

export default indexController;
