const reviewModel = require("../models/reviewModel")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const reviewCont = {}

reviewCont.buildReviewUpdate = async (req, res, next) => {
    const review_id = req.params.reviewId
    let nav = await utilities.getNav()
    const data = await reviewModel.getReviewByReviewId(review_id)
    const itemData = data[0]
    const title = itemData.title
  res.render("./review/update", {
    title: "Edit Review for " + title,
    nav,
    errors: null,
    review_id: itemData.review_id,
    review_comment: itemData.review_comment,
  })

}

reviewCont.buildReviewDelete = async (req, res, next) => {
    const review_id = req.params.reviewId
    let nav = await utilities.getNav()
    const data = await reviewModel.getReviewByReviewId(review_id)
    if(!data){
        req.flash("notice", `Invalid Request`)
    res.redirect("/account/")
    }
    const itemData = data[0]
    const title = itemData.title
  res.render("./review/delete", {
    title: "Delete Review for " + title,
    nav,
    errors: null,
    review_id: itemData.review_id,
    review_comment: itemData.review_comment,
    })
}

reviewCont.addReview = async (req, res, next) =>{
    const {
        account_id,
        inv_id, 
        review_comment
      } = req.body
      const invResult = await reviewModel.addReview(
        account_id,
        inv_id,
        review_comment
      )
      const data = await invModel.getInventoryByInvId(inv_id)
      const block = await utilities.buildSingleInventoryBlock(data)
      const reviews = await reviewModel.getReviewByInvId(inv_id)
      let nav = await utilities.getNav()
      const className = data[0].inv_year +" "+ data[0].inv_make +" "+ data[0].inv_model
    if (invResult) {
      req.flash(
        "notice",
        `Vehicle Added Successfully.`
      )
      res.render("./inventory/vehicle", {
        title: className,
        nav,
        errors: null,
        inv_id: inv_id,
        block,
        reviews
      })
    } else {
      
      req.flash("notice", "Sorry, adding the Vehicle failed.")
      res.render("./inventory/vehicle", {
        title: className,
        nav,
        errors: null,
        inv_id: inv_id,
        block,
        reviews
      })
      }
}
reviewCont.updateReview = async (req, res, next) => {
    const {
        review_comment,
        review_id,
        
      } = req.body
      const updateResult = await reviewModel.updateReview(
        review_comment,
        review_id,
      )
    
      if (updateResult) {
        req.flash("notice", `Review was successfully updated.`)
        res.redirect("/account/")
      } else {
        const invItem = invModel.getInventoryByInvId(updateResult.inv_id)
        const title = `${invItem.inv_make} ${invItem.inv_model}`
        req.flash("notice", "Sorry, the update failed.")
        res.status(501).render("./review/update", {
            title: "Edit Review for " + title,
        nav,
        errors: null,
        review_comment,
        review_id,
        })
      }
}

reviewCont.deleteReview = async (req, res, next) => {
    const {
        review_id,
    } = req.body
    let nav = await utilities.getNav()
    const deleteResult = await reviewModel.deleteReview(
        review_id,  
    )
  if (deleteResult) {
    req.flash("notice", `The review was successfully delted.`)
    res.redirect("/account/")
  } else {
    const data = await reviewModel.getReviewByReviewId(review_id)
    const reviewData = data[0]
    req.flash("notice", "Sorry, the delete failed.")
    res.status(501).render("./review/delete", {
        title: "Delete Review for " + reviewData.title,
        nav,
        errors: null,
        review_id: reviewData.review_id,
        review_comment: reviewData.review_comment,
    })
  }
}

module.exports = reviewCont