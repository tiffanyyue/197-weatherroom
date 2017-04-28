weathercall = function(id) {
	var xhr = new XMLHttpRequest();

	var call = 'http://api.openweathermap.org/data/2.5/weather?id=' + id + '&APPID=1c5c83b160d3ca7ec76ccead0bd9d92d&units=imperial';

	xhr.open("GET", call, false);

	xhr.send();
	var response = JSON.parse(xhr.responseText).weather[0].main;

	if (response === "Clouds") {
		triggerCloudy();
	} else if (response === "Drizzle" || response === "Mist" || response === "Rain") {
		triggerRain();
	} else if (response === "Snow" || response === "Snowstorm" || response === "Flurry") {
		triggerSnow();
	} else if (response === "Clear") {
		triggerSun();
	}
	updateTemp(JSON.parse(xhr.responseText).main.temp);
	updateCondition(response);
}
