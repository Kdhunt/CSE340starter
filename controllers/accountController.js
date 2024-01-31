const accountModel = require("../models/accountModel")
const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")

const accountCont = {}

/* ****************************************
*  Deliver login view
* *************************************** */
accountCont.buildLogin = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }
/* ****************************************
*  Deliver login view
* *************************************** */
accountCont.buildSignup = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
}


/* ***************************
 *  Build profile 
 * ************************** */
accountCont.buildProfile = async function (req, res, next) {
    const account_id = req.params.accountId
    const data = await accountModel.getAccountById(account_id)
    const value = await utilities.buildAccountProfileByAccountId(data);
    let nav = await utilities.getNav()
    const className = data[0].inv_year +" "+ data[0].inv_make +" "+ data[0].inv_model
    res.render("account/profile", {
      title: className,
      nav,
      errors: null,
      block,
    })
  }

  /*****
   * Register Account
   */
accountCont.registerAccount = async function(req, res, next){
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    
    // Hash the password before storing
    let hashedPassword
    try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
    })
    }
    const regResult = await accountModel.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        hashedPassword
    )
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
}

  /*****
   * Account Login
   */
  accountCont.login = async function(req, res, next){
    let nav = await utilities.getNav()
  const {account_email, account_password } = req.body
  try {
  hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the login.')
    res.status(500).render("account/login", {
    title: "Login",
    nav,
    errors: null,
})
}
  const regResult = await accountModel.loginAccount(
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, ${account_firstname}, you are logged in. P.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the login failed.")
    res.status(501).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }
}

module.exports = accountCont