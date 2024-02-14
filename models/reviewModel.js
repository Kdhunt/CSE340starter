const pool = require("../database/");

const reviewModel = {};

reviewModel.addReview = async function(account_id, inv_id, review_comment){
    try {
        const sql =
          "insert into public.review ( account_id, inv_id, review_comment) values ($1, $2, $3) RETURNING *";
        const data = await pool.query(sql, [
          account_id, inv_id, review_comment
        ]);
        return data.rows[0];
      } catch (error) {
        console.error("add review error: " + error);
      }
}

reviewModel.updateReview = async function(review_comment, review_id){
    try {
        const sql =
          "UPDATE public.review SET review_comment = $1 WHERE review_id = $2 RETURNING *";
        const data = await pool.query(sql, [
          review_comment,
          review_id,
        ]);
        return data.rows[0];
      } catch (error) {
        console.error("update review error: " + error);
      }
}
reviewModel.deleteReview = async function(review_id){
    try {
        const sql =
          "delete from public.review WHERE review_id = $1 RETURNING *";
        const data = await pool.query(sql, [
          review_id,
        ]);
        return data.rows[0];
      } catch (error) {
        console.error("delete review error: " + error);
      }
}
reviewModel.getReviewByInvId = async function(inv_id){
    try {
        const sql =
          `SELECT 
                review_id,
                (a.account_firstname || ' ' || a.account_lastname) AS username,
                (i.inv_year || ' ' || i.inv_make || ' ' || i.inv_model) AS title,
                r.review_comment,
                to_char(r.timestamp, 'Day, Month DDth, YYYY at HH12:MIam') AS formatted_timestamp
            FROM 
                review r
            JOIN 
                account a ON a.account_id = r.account_id
            JOIN 
                inventory i ON i.inv_id = r.inv_id
            WHERE
                r.inv_id = $1`;
        const data = await pool.query(sql, [
          inv_id
        ]);
        return data.rows;
      } catch (error) {
        console.error("getReviesByInvId error: " + error);
      }
}
reviewModel.getReviewByAccountId = async function(account_id){
    try {
        const sql =
          `SELECT 
                review_id,
                (a.account_firstname || ' ' || a.account_lastname) AS username,
                (i.inv_year || ' ' || i.inv_make || ' ' || i.inv_model) AS title,
                r.review_comment,
                to_char(r.timestamp, 'Day, Month DDth, YYYY at HH12:MIam') AS formatted_timestamp
            FROM 
                review r
            JOIN 
                account a ON a.account_id = r.account_id
            JOIN 
                inventory i ON i.inv_id = r.inv_id
            WHERE 
                r.account_id = $1;`;
        const data = await pool.query(sql, [
          account_id,
        ]);
        return data.rows;
      } catch (error) {
        console.error("getReviewByAccountId error: " + error);
      }
}
reviewModel.getReviewByReviewId = async function(review_id){
    try {
        const sql =
          `SELECT 
                review_id,
                (a.account_firstname || ' ' || a.account_lastname) AS username,
                (i.inv_year || ' ' || i.inv_make || ' ' || i.inv_model) AS title,
                r.review_comment,
                to_char(r.timestamp, 'Day, Month DDth, YYYY at HH12:MIam') AS formatted_timestamp
            FROM 
                review r
            JOIN 
                account a ON a.account_id = r.account_id
            JOIN 
                inventory i ON i.inv_id = r.inv_id
            WHERE 
                r.review_id = $1;`;
        const data = await pool.query(sql, [
          review_id,
        ]);
        return data.rows;
      } catch (error) {
        console.error("getReviewByReviewId error: " + error);
      }
}

module.exports = reviewModel;