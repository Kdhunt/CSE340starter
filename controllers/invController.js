const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    errors: null,
    grid,
  })
}


/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInvId(inv_id)
  const block = await utilities.buildSingleInventoryBlock(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_year +" "+ data[0].inv_make +" "+ data[0].inv_model
  res.render("./inventory/vehicle", {
    title: className,
    nav,
    errors: null,
    block,
  })
}

invCont.buildManagement = async function (req, res, next){
  let nav = await utilities.getNav()

  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })

}
invCont.buildAddVehicle = async function (req, res, next){
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationSelect();
  
  res.render("./inventory/add-vehicle", {
    title: "Add Vehicle",
    nav,
    errors: null,
    classificationSelect
  })
}

invCont.buildAddClassification = async function (req, res, next){
  let nav = await utilities.getNav()

  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}
/*** Add Classification */
invCont.addClassification = async function(req, res, next){
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const invResult = await invModel.addClassification(
    classification_name
  )
if (invResult) {
  req.flash(
    "notice",
    `Classification Added Successfully.`
  )
  let nav = await utilities.getNav()
  res.status(201).render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
} else {
  req.flash("notice", "Sorry, adding the Classification failed.")
  res.status(501).render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}
}
/*** Add Vehicle */
invCont.addVehicle = async function(req, res, next){
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationSelect();
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

  const invResult = await invModel.addVehicle(
    
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color,
    classification_id
  )
if (invResult) {
  req.flash(
    "notice",
    `Vehicle Added Successfully.`
  )
  res.render("./inventory/add-vehicle", {
    title: "Add Vehicle",
    nav,
    errors: null,
    classificationSelect
  })
} else {
  
  req.flash("notice", "Sorry, adding the Vehicle failed.")
  res.render("./inventory/add-vehicle", {
    title: "Add Vehicle",
    nav,
    errors: null,
    classificationSelect
  })
  }
}


module.exports = invCont