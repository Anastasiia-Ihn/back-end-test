import express from "express";

import lessonController from "../../controllers/lesson-controller.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { lessonAddSchema, lessonUpdateSchema } from "../../models/Lesson.js";

const lessonRouter = express.Router();

lessonRouter.use(authenticate);

lessonRouter.get("/", lessonController.getAll);

lessonRouter.get("/:id", isValidId, lessonController.getById);

lessonRouter.post(
  "/",
  isEmptyBody,
  validateBody(lessonAddSchema),
  lessonController.add
);

lessonRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(lessonUpdateSchema),
  lessonController.updateById
);

// lessonRouter.patch(
//   "/:id/favorite",
//   isValidId,
//   isEmptyBody,
//   validateBody(movieUpdateFavoriteSchema),
//   lessonController.updateById
// );

lessonRouter.delete("/:id", isValidId, lessonController.deleteById);

export default lessonRouter;
