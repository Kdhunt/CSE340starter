const pool = require("../database/")

const accountModel = {}

/* ***************************
 *  Get account data by Id
 * ************************** */
  accountModel.getAccountById = async function (){
    try {
        const data = await pool.query(
          `SELECT * FROM public.account AS a
          WHERE a.account_id = $1`,
          [account_id]
        )
        return data.rows
      } catch (error) {
        console.error("getAccountById error " + error)
      }
  }
  
    /* *****************************
*   Register new account
* *************************** */
  accountModel.registerAccount = async function(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
  }

  accountModel.checkExistingEmail = async function(account_email){
    try {
      const sql = "SELECT * FROM account WHERE account_email = $1"
      const email = await pool.query(sql, [account_email])
      return email.rowCount
    } catch (error) {
      return error.message
    }
  }

      /* *****************************
*   Register new account
* *************************** */
accountModel.loginAccount = async function(account_firstname, account_lastname, account_email, account_password){
    try {
      
    } catch (error) {
      return error.message
    }
  }



  module.exports = accountModel