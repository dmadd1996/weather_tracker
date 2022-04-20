var cityInput = document.getElementById('cityInput')
var citySubmit = document.getElementById('citySubmit')

citySubmit.addEventListener('click', function () {
    var cityName = cityInput.value

    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=2c9d646cbf2ee524b60b45419e486291`

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });

})
