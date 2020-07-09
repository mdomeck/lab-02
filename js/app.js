'use strict';

function readJsonData(path)
{
//This function returns the file path from the JSON files 
  return $.ajax(path, { method: "GET", dataType: "JSON" })
//Then takes the data from the JSON file and runs the it through the function bindFilePathToData, which takes in data and (file)path as a parameter
          .then(data => bindFilePathToData(data, path))
//Then runs the function parseAnimalFromData, data gets passed to parsedAnimalFromData
          .then(parseAnimalFromData);
}

//Let the function bindFilePathToData take in data and filePath as parameters
let bindFilePathToData = (data, filePath) =>
{
//forEach loops through the data array which contains json objects. It then dynamically adds a new property to eachjson object. 
//The property contains the file path where the json object was queried from originally.
  data.forEach(jsonObject => jsonObject.filePath = filePath);
 //returnd the data
  return data;
}

//Let the function parseAnimalFromData take the data from above and loop through it, running each object through the constructor function
let parseAnimalFromData = data => data.forEach(animal => new Animal(animal).creatorBuilder());

//When the page initially loads, the function readJsonData will read the first, then the 2nd page then call the function renderDropDown 
readJsonData('data/page-1.json')
.then(() => readJsonData('data/page-2.json'))
.then(renderDropDown);

const allAnimalsArr = [];
const keywordArr = [];

function Animal(obj)
{
  this.filePath = obj.filePath;
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  //pushes all of the animals, from both pages, into an array
  allAnimalsArr.push(this);
  //sorts the the aimals from the JSON files into two groups, '1' & '2'
  this.page = allAnimalsArr.length > 20 ? '2' : '1';
}

Animal.prototype.creatorBuilder = function () 
{
  //let the variable className be assigned the value of the string 'page-1' or 'page-2'
  let className = `page-${this.page}`
  //the constant variable myTemplate is assigned the method to set/return the content of id of photo-template
  const myTemplate = $('#photo-template').html();
  //the constant variable newSection creates a new section with a class attribute of this object's keyword and either a class of 'page-1' or 'page-2' with the constant myTemplate rendering on the page in the section
  const $newSection = $(`<section class="${this.keyword} ${className}">${myTemplate}</section>`);

  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image);
  $newSection.find('img').attr('alt', this.description);
  $('main').append($newSection);
  
  if (keywordArr.includes(this.keyword) === false)
  {
    keywordArr.push(this.keyword);
  }
}

//===================FEATURE TWO======================
// Given that a user clicks on the dropdown menu When the user selects one of the options Then only the images whose keyword matches the option should be displayed
// Create a <select> element which contains unique <option> elements extracted dynamically from the JSON file, one for each keyword.
function renderDropDown() 
{
  for (let i = 0; i < keywordArr.length; i++)
  {
    let keyword = keywordArr[i];
    $("select").append(`<option>${keyword}</option>`);
  }
}
//Use an event handler to respond (click event) when the user chooses an option from the select menu
//The code below was found by Meghan at https://api.jquery.com/click/
// lots of guidance from TA Skyler
function handleSelection()
{
  // Hide all of the images
  $('section').hide();
  //let className be assigned the value of the handleSelection function
  let className = $(this).val();
  //let 
  let jqueryString = `section.${className}`
  // console.log("handler for .click() called", className);
  // then show those whose keyword matches the option chosen.
  $(jqueryString).show();
}
//Use an event handler to respond (click event) when the user chooses an option from the select menu
//The code below was found by Meghan at https://api.jquery.com/click/
// lots of guidance from TA Skyler
$("select").on('change', handleSelection);

//=============LAB 03 - FEATURE 1===================
//As a user, I want to have the ability to view additional images so that my view does not become cluttered.

//Upon initial page load, page 2 imgs are hidden 

// need to create a button that links to Page 2 that only displays on Page 1

//Create a click event that displays Page 2's imgs and hides Page 1's imgs when Page 2 button is clicked
// USE TOGGLE?

//do the same for Page 1's imgs - create button and click event from Page2 to Page1

//Reset the filters, then repopulate them using only keywords from the images currently being displayed.

//=============LAB 03 - FEATURE 2===================
//As a user, I want all of the images to be displayed in a consistent manner, so that it is easy to scan the collection of images.

//Create the appropriate Mustache template in your HTML with the same <h2>, <img>, and <p> elements as the jQuery template from the prior lab.


//Refactor the method that renders your images to use Mustache instead of making a copy with jQuery.


//=============LAB 03 - FEATURE 4===================
//As a user, I want to be able to sort the images so that there is an order to their rendering.

//Add the ability for the user to sort the images by either title or by number of horns.

//Sort the images by one of the properties on page load. This should also apply to the second page of images.
