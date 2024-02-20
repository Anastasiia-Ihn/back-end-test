import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, addUpdateSettings } from "./hooks.js";

const releaseYearRegexp = /^\d{4}$/;

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: String,
      match: releaseYearRegexp,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

lessonSchema.post("save", handleSaveError);

lessonSchema.pre("findOneAndUpdate", addUpdateSettings);

lessonSchema.post("findOneAndUpdate", handleSaveError);

export const lessonAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" must be exist`,
  }),
  topic: Joi.string().required(),
  about: Joi.string(),
  releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
});

export const lessonUpdateSchema = Joi.object({
  title: Joi.string(),
  topic: Joi.string(),
  about: Joi.string(),
  releaseYear: Joi.string().pattern(releaseYearRegexp),
});

// export const movieUpdateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const Lesson = model("lesson", lessonSchema);

export default Lesson;
