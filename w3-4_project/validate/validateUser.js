const validate = require("express-validator");

function validateDate(date) {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(date)) {
    throw new Error("Date must be in the format MM/DD/YYYY");
  } else if (new Date(date) > new Date()) {
    throw new Error("Date cannot be in the future");
  } else {
    return true;
  }
}

const addUserRules = [
  validate
    .body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),
  validate
    .body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),
  validate
    .body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  validate
    .body("birthday")
    .trim()
    .notEmpty()
    .withMessage("Birthday is required")
    .isString()
    .withMessage("Birthday must be a string")
    .custom(validateDate),
  validate
    .body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),
];

async function checkUserData(req, res, next) {
  const errors = (
    await Promise.all(
      addUserRules.map(async (rule) =>
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

module.exports = { addUserRules, checkUserData };
