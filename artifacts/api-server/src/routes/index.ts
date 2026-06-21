import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ownerEstimateRouter from "./owner-estimate";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ownerEstimateRouter);

export default router;
