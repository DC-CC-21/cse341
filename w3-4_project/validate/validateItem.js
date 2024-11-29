const validate = require("express-validator");

const addItemRules = [
  validate
    .check("itemName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Item name is required"),
  validate
    .check("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Item description is required"),
  validate
    .body("price")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Item price is required")
    .isNumeric()
    .withMessage("Item price must be a number"),
  validate
    .body("tags")
    .isArray()
    .withMessage("Item tags must be an array"),
  validate
    .body("tags.*")
    .isString()
    .withMessage("Item tags must be strings"),
];

async function checkItemData(req, res, next) {
  const errors = (
    await Promise.all(
      addItemRules.map(async (rule) =>
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

module.exports = { addItemRules, checkItemData };
