// Show HTML template
var template = '<div class="show">' +
                 '<img class="show-thumbnail" src="http://localhost:8200/images/{image}" alt="show" />' +
                 '<div class="show-info">' +
                   '<div class="show-title">{title}</div>' +
                   '<div class="show-year">{year}</div>' +
                 '</div>' +
               '</div>';

// Get all shows
var populateShows = function(shows) {
  $('.shows-container').html('');

  for (var index = 0; index < shows.length; index++) {
    var show = shows[index];

    // Replace {} with actual show information in template
    var withImage = template.replace('{image}', show.poster);
    var withTitle = withImage.replace('{title}', show.title);
    var htmlTemplate = withTitle.replace('{year}', show.year);

    $('.shows-container').append(htmlTemplate);
  }
};

var searchShows = function(value) {
  $.ajax({
    type: 'GET',
    url: '/shows.json',
    dataType: 'json',
    success: function(data) {
      var filterShows = data.shows.filter(function(show) {
        return show.title.toLowerCase().includes(value.toLowerCase());
      });

      return populateShows(filterShows);
    }
  });
};

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/shows.json',
    dataType: 'json',
    success: function(data) {
      return populateShows(data.shows);
    }
  });

  $('input').on('keyup', function(event) {
    return searchShows(this.value);
  });
});
