// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')
const utilities = require("../utilities")

// Route to build inventory by classification view

router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/profile", utilities.handleErrors(accountController.buildProfile));
router.get("/register", utilities.handleErrors(accountController.buildSignup));
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.loginAccount)
  )

module.exports = router;