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

  const $newSection = $(`<section>${myTemplate}</section>`);

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

//Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.
// $("select").on("click", "option", eventHandler)




