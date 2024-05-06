window.addEventListener('load', function () {

	// task 3
	$.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
	  if (data.status === 'OK') {
		$('#api_status').addClass('available');
	  } else {
		$('#api_status').removeClass('available');
	  }
	});

	// task 2
	const amenityIds = {};
	$('input[type=checkbox]').click(function () {
	  if ($(this).prop('checked')) {
		amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
	  } else if (!$(this).prop('checked')) {
		delete amenityIds[$(this).attr('data-id')];
	  }
	  if (Object.keys(amenityIds).length === 0) {
		$('div.amenities h4').html('&nbsp');
	  } else {
		$('div.amenities h4').text(Object.values(amenityIds).join(', '));
	  }
	});

	//Task 4

	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/places_search',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({}),
		success: function(response) {
			response.forEach(function(place) {
				var article = $('<article>');

				article.append('<h2>' + place.name + '</h2>');
				article.append('<p>' + place.description.replace(/Owner: .+$/, '') + '</p>');

				$('section.places').append(article);
			});
		},
		error: function(xhr, status, error) {
			console.error('Error:', error);
		}
	});

	//Task 5

	$('#searchButton').click(function() {
		console.log("SEARCH CLICKED!!")
        var checkedAmenities = [];
        $('input[type="checkbox"]:checked').each(function() {
            checkedAmenities.push($(this).val());
        });

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: checkedAmenities }),
            success: function(response) {
                $('section.places').empty();
                response.forEach(function(place) {
                    var article = $('<article>');
                    article.append('<h2>' + place.name + '</h2>');
                    article.append('<p>' + place.description.replace(/Owner: .+$/, '') + '</p>');
                    $('section.places').append(article);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

  });
