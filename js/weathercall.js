weathercall = function(id) {

	var call = 'api.openweathermap.org/data/2.5/weather?id=' + id + '&APPID=1c5c83b160d3ca7ec76ccead0bd9d92d&units=imperial';

	$.ajax({
	      type: 'GET',
	      url: call,
	      data: { 
	        id: $('#data').text(),
	        term: $('#searchBox').val() 
	      },
	      success: function(data) {

	        var response = data.weather[0].main;

			if (response === "Clouds") {
				triggerCloudy();
			} else if (response === "Drizzle" || response === "Mist" || response === "Rain") {
				triggerRain();
			} else if (response === "Snow" || response === "Snowstorm" || response === "Flurry") {
				triggerSnow();
			} else if (response === "Clear") {
				triggerSun();
			}
			updateTemp(data.main.temp);
			updateCondition(response);
	        
	      }
	});
}
