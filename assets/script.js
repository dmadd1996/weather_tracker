var cityInput = document.getElementById('cityInput')
var citySubmit = document.getElementById('citySubmit')

var mainTemp = document.getElementById('mainTemp')
var mainWind = document.getElementById('mainWind')
var mainHumid = document.getElementById('mainHumid')
var mainUV = document.getElementById('mainUV')

citySubmit.addEventListener('click', function () {
    var cityName = cityInput.value

    var cityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=2c9d646cbf2ee524b60b45419e486291`

    fetch(cityAPI).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });

});
