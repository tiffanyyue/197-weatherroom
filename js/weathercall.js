weathercall = function(id) {
	var xhr = new XMLHttpRequest();

	var call = 'http://api.openweathermap.org/data/2.5/weather?id=' + id + '&APPID=1c5c83b160d3ca7ec76ccead0bd9d92d&units=imperial';

	xhr.open("GET", call, false);

	xhr.send();
	console.log(xhr.status);
	var response = JSON.parse(xhr.responseText).weather[0].main;
	console.log(JSON.parse(xhr.responseText).main.temp);

	console.log(response);
	if (response === "Clouds") {
		triggerCloudy();
	} else if (response === "Drizzle") {
		triggerRain();
	} else if (response === "") {
		triggerSnow();
	} else if (response === "Clear") {
		triggerSun();
		console.log('sun was triggered');
	}
	updateTemp(JSON.parse(xhr.responseText).main.temp);
}
