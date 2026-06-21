import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import ownerEstimateRouter from "./owner-estimate.js";
import contactRouter from "./contact.js";
import propertiesRouter from "./properties.js";
import availabilityRouter from "./availability.js";
import icalRouter from "./ical.js";
import adminRouter from "./admin.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ownerEstimateRouter);
router.use(contactRouter);
router.use(propertiesRouter);
router.use(availabilityRouter);
router.use(icalRouter);
router.use(adminRouter);

export default router;
