$.ajax('data/page-1.json', { method: "GET", dataType: "JSON" })
  .then(data => {

    data.forEach(animal => {
      new Animal(animal).creatorBuilder();
    })
  })

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

}


