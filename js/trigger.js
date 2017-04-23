var triggerRain = function () {
	console.log('rain button was clicked');
	prev = weather;
	weather = "rain";
	$('.selected').addClass('not-selected');
	$('.selected').removeClass('selected');
	$('#button-rain').addClass('selected');
	$('#button-rain').removeClass('not-selected');
	console.log('PREVIOUS IS ' + prev);
	console.log('CURRENT IS ' + weather);
	
}

var triggerSun = function () {
	console.log('sunny button was clicked');
	prev = weather;
	weather = "sun";
	$('.selected').addClass('not-selected');
	$('.selected').removeClass('selected');
	$('#button-sunny').addClass('selected');
	console.log('EEE');
	console.log($('#button-sunny') + 'EEEEE');
	$('#button-sunny').removeClass('not-selected');
	console.log('PREVIOUS IS ' + prev);
	console.log('CURRENT IS ' + weather);
}

var triggerSnow = function() {
	console.log('snow button was clicked');
	prev = weather;
	weather = "snow";
	$('.selected').addClass('not-selected');
	$('.selected').removeClass('selected');
	$('#button-snow').addClass('selected');
	$('#button-snow').removeClass('not-selected');
	console.log('PREVIOUS IS ' + prev);
	console.log('CURRENT IS ' + weather);
}

var triggerCloudy = function() {
	console.log('cloud button was clicked');
	prev = weather;
	weather = "cloud";
	$('.selected').addClass('not-selected');
	$('.selected').removeClass('selected');
	$('#button-cloudy').addClass('selected');
	$('#button-cloudy').removeClass('not-selected');
	console.log('PREVIOUS IS ' + prev);
	console.log('CURRENT IS ' + weather);
}

var updateTemp = function(t) {
	var source   = $("#temperature-template").html();
	var template = Handlebars.compile(source);
	var context = {temp: t};
	var html    = template(context);
	console.log(document.getElementById('temp'));
	$(document.getElementById('temp')).html(html);
	console.log(html);
	console.log('temperature is updated');
}