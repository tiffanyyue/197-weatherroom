weathercall = function() {
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=1c5c83b160d3ca7ec76ccead0bd9d92d", false);

	xhr.send();
	console.log(xhr.status);
	var response = JSON.parse(xhr.responseText).weather[0].main;

	console.log(response);
	if (response === "Clouds") {
		weather = "cloud";
	}
}
