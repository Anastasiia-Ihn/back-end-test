import express from "express";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";

import authControllers from "../../controllers/auth-controllers.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninSchema),
  authControllers.signin
);

authRouter.get("/google", authControllers.google);

authRouter.get("/google-redirect", authControllers.googleRedirect);

authRouter.post("/signout", authControllers.signout);

export default authRouter;
