const validate = require("express-validator");

const addItemRules = [
  validate
    .check("itemName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Item name is required"),
  validate
    .check("itemDescription")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Item description is required"),
  validate
    .body("itemPrice")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Item price is required")
    .isNumeric()
    .withMessage("Item price must be a number"),
  validate
    .body("itemTags")
    .isArray()
    .withMessage("Item tags must be an array"),
  validate
    .body("itemTags.*")
    .isString()
    .withMessage("Item tags must be strings"),
];

async function checkItemData(req, res, next) {
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

module.exports = { addItemRules, checkItemData };
