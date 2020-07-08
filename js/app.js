'use strict';

$.ajax('data/page-1.json', { method: "GET", dataType: "JSON" })
.then(data => {
  data.forEach(animal => {
    new Animal(animal).creatorBuilder();  
  })
  renderDropDown();
})

const keywordArr = [];

function Animal(obj) {
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horn = obj.horn;
}

Animal.prototype.creatorBuilder = function () {
  const myTemplate = $('#photo-template').html();
  
  const $newSection = $(`<section class=${this.keyword}>${myTemplate}</section>`);
  
  $newSection.find('h2').text(this.title);
  
  $newSection.find('p').text(this.description);
  
  $newSection.find('img').attr('src', this.image);
  
  $newSection.find('img').attr('alt', this.description);
  
  $('main').append($newSection);
  
  if (keywordArr.includes(this.keyword) === false){
    keywordArr.push(this.keyword);
  }
}

//===================FEATURE TWO======================
// Given that a user clicks on the dropdown menu When the user selects one of the options Then only the images whose keyword matches the option should be displayed


// Create a <select> element which contains unique <option> elements extracted dynamically from the JSON file, one for each keyword.
function renderDropDown() {
  for (let i = 0; i < keywordArr.length; i++){
    let keyword = keywordArr[i];
    $("select").append(`<option>${keyword}</option>`);
  }
}

//Use an event handler to respond (click event) when the user chooses an option from the select menu
//The code below was found by Meghan at https://api.jquery.com/click/
// lots of guidance from TA Skyler
$("select").on('change', function(){
  console.log("handler for .click() called", $(this).val());
  // Hide all of the images (:hidden?)
  $('section').hide();
  // then show those whose keyword matches the option chosen.  (:visible?) 
  $(`section[class=${$(this).val()}]`).show();
});

//=============LAB 03 - FEATURE 1===================
//As a user, I want to have the ability to view additional images so that my view does not become cluttered.

//Add navigation for the user to switch between two pages. Each page should render a unique set of images from one of the two provided JSON files.


//Reset the filters, then repopulate them using only keywords from the images currently being displayed.

//=============LAB 03 - FEATURE 2===================
//As a user, I want all of the images to be displayed in a consistent manner, so that it is easy to scan the collection of images.

//Create the appropriate Mustache template in your HTML with the same <h2>, <img>, and <p> elements as the jQuery template from the prior lab.


//Refactor the method that renders your images to use Mustache instead of making a copy with jQuery.


//=============LAB 03 - FEATURE 4===================
//As a user, I want to be able to sort the images so that there is an order to their rendering.

//Add the ability for the user to sort the images by either title or by number of horns.

//Sort the images by one of the properties on page load. This should also apply to the second page of images.
