import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import ownerEstimateRouter from "./owner-estimate.js";
import contactRouter from "./contact.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ownerEstimateRouter);
router.use(contactRouter);

export default router;
