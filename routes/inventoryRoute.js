// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const invValidate = require('../utilities/inventory-validation')
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/addVehicle", utilities.handleErrors(invController.buildAddVehicle));
router.get("/addClassification", utilities.handleErrors(invController.buildAddClassification));

router.post(
    "/addClassification",
    invValidate.addClassificationRules(),
    invValidate.checkAddClassificationData,
    utilities.handleErrors(invController.addClassification)
);

router.post(
    "/addVehicle",
    invValidate.addVehicleRules(),
    invValidate.checkAddVehicleData,
    utilities.handleErrors(invController.addVehicle)
);



module.exports = router;