import { Router, type IRouter } from "express";
import healthRouter from "./health";
import resolveImageRouter from "./resolveImage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(resolveImageRouter);

export default router;
