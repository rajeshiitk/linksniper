import { body } from "express-validator";

export class authValidation {
  static signUpUser = [
    body("name").notEmpty().withMessage("Name is required").escape(), // here escape() is used to sanitize the input which means it will remove any html tags from the input
    body("email")
      .exists()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid")
      .escape(), //
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .escape(),
  ];
  static loginUser = [
    body("email")
      .exists()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid")
      .escape(), //
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .escape(),
  ];

  static updateUser = [
    body("name").optional(),
    body("email").isEmail().withMessage("Email must be valid").optional(),
  ];
}
