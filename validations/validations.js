import { body } from "express-validator";

export const validateRegister = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 }, { max: 32 })
    .withMessage("Name length must be between 3 and 32."),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password length must be at least 6"),
  body("avatarUrl").optional().isURL().withMessage("Invalid URL"),
];

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password length must be at least 6"),
];

export const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title length must be at least 3"),
  body("text")
    .notEmpty()
    .withMessage("Text is required")
    .isLength({ min: 3 })
    .withMessage("Text length must be at least 3"),
  body("tags").optional(),
  body("imageUrl").optional().isURL().withMessage("Invalid URL").isString(),
];
