const validate = require("express-validator");
const { validateDate } = require("../utilities");


const addPostRules = [
  validate
    .body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  validate
    .body("content")
    .trim()
    .notEmpty()
    .withMessage("Some content is required")
    .isString()
    .withMessage("Content must be a string"),
  validate
    .body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a string"),
  validate
    .body("date")
    .trim()
    .notEmpty()
    .withMessage("Date is required")
    .isString()
    .withMessage("Date must be a string")
    .custom((date) => validateDate(date, "Date")),
  validate
    .body("attachments")
    .optional()
    .isArray()
    .withMessage("Attachments must be an array of strings"),
  validate
    .body("attachments.*")
    .trim()
    .isString()
    .withMessage("Each attachment must be a string")
    .matches(/^data:image\/\w+;base64,/)
    .withMessage(
      "Each attachment must be a base64-encoded image"
    ),
  validate
    .body("lastUpdated")
    .trim()
    .notEmpty()
    .withMessage("Last Updated is required")
    .isString()
    .withMessage("Last Updated must be a string")
    .custom((date) => validateDate(date, "Last Updated")),
  validate
    .body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
  validate
    .body("tags.*")
    .trim()
    .isString()
    .withMessage("Each tag must be a string"),
];

async function checkPostData(req, res, next) {
  const errors = (
    await Promise.all(
      addPostRules.map(async (rule) =>
        (await rule.run(req)).errors.map((x) => x.msg)
      )
    )
  )
    .filter((error) => error != null)
    .flat();
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }
  next();
}

module.exports = { addPostRules, checkPostData };
