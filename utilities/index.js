const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  };

  /**************************************
   * Build Single Vehicle Inventory Block
   **************************************/
  Util.buildSingleInventoryBlock = async function(data){
    let block
    vehicle = data[0]
    if (data.length>0){
        block ='<div id="vehicle-layout" class="single-vehicle-view">'
        //block += '<section id="vehicle-cta">'
        //block += '    <img id="vehicle-image" src="'+ vehicle.inv_image+'" alt="'+ vehicle.inv_description +'">'
        //block += '    '
        //block += '</section>'
        block += '<div id="details">'
        block += '<section id="reviews" class="vehicle-detail">'
        block += '    <img id="vehicle-image" src="'+ vehicle.inv_image
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors">'
        block += '</section>'
        block += '<section id="reviews" class="vehicle-detail">'
        block += '        <h2>'+vehicle.inv_make+' '+vehicle.inv_model+' Details</h2>  '
        block += '        <p><b>Price: </b>$' +new Intl.NumberFormat('en-US').format(vehicle.inv_price)+ '</p>'
        block += '        <p><b>Milage: </b>' +new Intl.NumberFormat('en-US').format(vehicle.inv_miles)+ '</p>'
        block += '        <p><b>Description: </b>' +vehicle.inv_description+ '</p>'
        block += '</section>'

        block+='</div>'
    } else {
      block += '<p class="notice">Sorry, we were unable to find this vehicle in our inventory.</p>'
    }
    return block
  };

  Util.buildClassificationSelect = async function(req, res, next){
    let block;
    let data = await invModel.getClassifications()
    if (data.rowCount > 0){
      block =  '<select id="classificationList" name="classification_id">';
      block += '<option value="">Select..</option>'
      data.rows.forEach((row) => {
        block += '<option value="'+row.classification_id+'">'
        block += row.classification_name
        block += '</option>'
      })
      block += '</select>';
    }else{
      block = '<p class="notice">Sorry, we are unable to retrieve a list of classifications at this time, please check the connection to the database.</p>'
    }
    return block;
  };

  Util.makeItBorkened = async function(){
     throw new Error('divide by zero!'); 
     return 1 / 0;
  }

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util