// Needed Resources 
const express = require("express")
const router = new express.Router() 
const reviewController = require("../controllers/reviewController")
const validate = require('../utilities/review-validation')
const utilities = require("../utilities")

router.get("/update/:reviewId", utilities.checkLogin,  utilities.handleErrors(reviewController.buildReviewUpdate));
router.get("/delete/:reviewId", utilities.checkLogin,  utilities.handleErrors(reviewController.buildReviewDelete));

router.post(
    "/add/",
    utilities.checkLogin,
    validate.addReviewRules(),
    validate.checkAddReviewData,
    utilities.handleErrors(reviewController.addReview)
)

router.post(
    "/update",
    utilities.checkLogin,
    validate.updateReviewRules(),
    validate.checkUpdateReviewData,
    utilities.handleErrors(reviewController.updateReview)
)
router.post(
    "/delete",
    utilities.checkLogin, 
    validate.deleteReviewRules(),
    validate.checkDeleteReviewData,
    utilities.handleErrors(reviewController.deleteReview)
)

module.exports =  router