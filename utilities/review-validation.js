const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}


validate.addReviewRules = () => {
    return [
        // Inventory Item ID
        body("inv_id")
            .isInt({ min: 1 })
            .withMessage("Invalid inventory Id."),
        body("account_id")
            .isInt({ min: 1 })
            .withMessage("Invalid account Id."),
        body("review_comment")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a comment."),
      ];
}
validate.checkAddReviewData = async (req, res, next) => {
    const { inv_id, account_id, review_comment } = req.params;
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // Handle validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

validate.updateReviewRules = () => {
    return [
        // Inventory Item ID
        body("review_id")
            .isInt({ min: 1 })
            .withMessage("Invalid review Id."),
        body("review_comment")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a comment."),
      ];
}
validate.checkUpdateReviewData = async (req, res, next) => {
    const { review_id, review_comment } = req.params;
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // Handle validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

validate.deleteReviewRules = () => {
    return [
      // Inventory Item ID
      body("review_id")
        .isInt({ min: 1 })
        .withMessage("Invalid review Id."),
    ];
  };
  
  validate.checkDeleteReviewData = async (req, res, next) => {
    const { review_id } = req.params;
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // Handle validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

module.exports = validate