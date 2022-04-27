var cityInput = document.getElementById('cityInput')
var citySubmit = document.getElementById('citySubmit')

var mainTemp = document.getElementById('mainTemp')
var mainWind = document.getElementById('mainWind')
var mainHumid = document.getElementById('mainHumid')
var mainUV = document.getElementById('mainUV')

var searchHistory = document.getElementById('searchHistory')

function printHistory() {
    //pull from local and parse
    var historyParse = JSON.parse(localStorage.getItem('history') || [])

    console.log("hs", JSON.stringify(historyParse))
  
    for (let i = 0; i < historyParse.length; i++) {
      searchHistory.innerHTML += `<button class = "btn btn-success m-2 w-100 histBtn"> ${historyParse[i]} </button> <br>`;
    }
    
}


//when user types city and clicks submit
citySubmit.addEventListener('click', function () {
    var cityName = cityInput.value

    //city is called and returns lat/lon numbers via API
    var cityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=2c9d646cbf2ee524b60b45419e486291`

    //response is fetched
    fetch(cityAPI).then(function (response) {
        response.json().then(function (placeData) {
            console.log(placeData);

            var dateHolder = document.getElementById('dateHolder')

            //function takes lat/lon from call and inserts into new API call for weather info
            var lat = placeData[0].lat
            var lon = placeData[0].lon
            console.log(`lat: ${lat}, long: ${lon}`)
            var currentAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=2c9d646cbf2ee524b60b45419e486291`


            //response is fetched
            fetch(currentAPI).then(function (response) {
                response.json().then(function (currentData) {
                    console.log(currentData);

                    //unix timestamp is converted into semantic format
                    let unixTimestamp = currentData.current.dt

                    var date = new Date(unixTimestamp * 1000)

                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();

                    //Place name and date are appended into the main section of the page
                    dateHolder.innerHTML = `${placeData[0].name}, ${placeData[0].state}, ${placeData[0].country}: ${month}/${day}/${year} <img src="http://openweathermap.org/img/wn/${currentData.current.weather[0].icon}@2x.png">`

                    //Data is added to the fields
                    mainTemp.textContent = `${currentData.current.temp}°F`
                    mainWind.textContent = `${currentData.current.wind_speed} MPH`
                    mainHumid.textContent = `${currentData.current.humidity}%`
                    mainUV.innerHTML = `<div class="indicator">${currentData.current.uvi}</div>`

                    //function checks to see what range the UVI is in and applies a CSS attribute (color)
                    if (currentData.current.uvi < 3) {
                        mainUV.setAttribute('class', 'indicator, green')
                    } else if (currentData.current.uvi < 6) {
                        mainUV.setAttribute('class', 'indicator, yellow')
                    } else if (currentData.current.uvi < 8) {
                        mainUV.setAttribute('class', 'indicator, orange')
                    } else {
                        mainUV.setAttribute('class', 'indicator, red')
                    }

                    //variables are added for each of the 'five day forecast' sections
                    var d1Temp = document.getElementById('d1Temp')
                    var d1Wind = document.getElementById('d1Wind')
                    var d1Humid = document.getElementById('d1Humid')
                    var multiDate1 = document.getElementById('multiDate1')

                    let d1Timestamp = currentData.daily[1].dt
                    let d1Date = new Date(d1Timestamp * 1000)

                    let month1 = d1Date.getMonth() + 1
                    let day1 = d1Date.getDate()

                    multiDate1.innerHTML = `${month1}/${day1} <img src="http://openweathermap.org/img/wn/${currentData.daily[1].weather[0].icon}@2x.png">`
                    d1Temp.textContent = `${currentData.daily[1].temp.day}°F`
                    d1Wind.textContent = `${currentData.daily[1].wind_speed} MPH`
                    d1Humid.textContent = `${currentData.daily[1].humidity}%`

                    //Day 2
                    var d2Temp = document.getElementById('d2Temp')
                    var d2Wind = document.getElementById('d2Wind')
                    var d2Humid = document.getElementById('d2Humid')
                    var multiDate2 = document.getElementById('multiDate2')

                    let d2Timestamp = currentData.daily[2].dt
                    let d2Date = new Date(d2Timestamp * 1000)

                    let month2 = d2Date.getMonth() + 1
                    let day2 = d2Date.getDate()

                    multiDate2.innerHTML = `${month2}/${day2} <img src="http://openweathermap.org/img/wn/${currentData.daily[2].weather[0].icon}@2x.png">`
                    d2Temp.textContent = `${currentData.daily[2].temp.day}°F`
                    d2Wind.textContent = `${currentData.daily[2].wind_speed} MPH`
                    d2Humid.textContent = `${currentData.daily[2].humidity}%`

                    //Day 3
                    var d3Temp = document.getElementById('d3Temp')
                    var d3Wind = document.getElementById('d3Wind')
                    var d3Humid = document.getElementById('d3Humid')
                    var multiDate3 = document.getElementById('multiDate3')

                    let d3Timestamp = currentData.daily[3].dt
                    let d3Date = new Date(d3Timestamp * 1000)

                    let month3 = d3Date.getMonth() + 1
                    let day3 = d3Date.getDate()

                    multiDate3.innerHTML = `${month3}/${day3} <img src="http://openweathermap.org/img/wn/${currentData.daily[3].weather[0].icon}@2x.png">`
                    d3Temp.textContent = `${currentData.daily[3].temp.day}°F`
                    d3Wind.textContent = `${currentData.daily[3].wind_speed} MPH`
                    d3Humid.textContent = `${currentData.daily[3].humidity}%`

                    //Day 4
                    var d4Temp = document.getElementById('d4Temp')
                    var d4Wind = document.getElementById('d4Wind')
                    var d4Humid = document.getElementById('d4Humid')
                    var multiDate4 = document.getElementById('multiDate4')

                    let d4Timestamp = currentData.daily[4].dt
                    let d4Date = new Date(d4Timestamp * 1000)

                    let month4 = d4Date.getMonth() + 1
                    let day4 = d4Date.getDate()

                    multiDate4.innerHTML = `${month4}/${day4} <img src="http://openweathermap.org/img/wn/${currentData.daily[4].weather[0].icon}@2x.png">`
                    d4Temp.textContent = `${currentData.daily[4].temp.day}°F`
                    d4Wind.textContent = `${currentData.daily[4].wind_speed} MPH`
                    d4Humid.textContent = `${currentData.daily[4].humidity}%`

                    //Day 5
                    var d5Temp = document.getElementById('d5Temp')
                    var d5Wind = document.getElementById('d5Wind')
                    var d5Humid = document.getElementById('d5Humid')
                    var multiDate5 = document.getElementById('multiDate5')

                    let d5Timestamp = currentData.daily[5].dt
                    let d5Date = new Date(d5Timestamp * 1000)

                    let month5 = d5Date.getMonth() + 1
                    let day5 = d5Date.getDate()

                    multiDate5.innerHTML = `${month5}/${day5} <img src="http://openweathermap.org/img/wn/${currentData.daily[5].weather[0].icon}@2x.png">`
                    d5Temp.textContent = `${currentData.daily[5].temp.day}°F`
                    d5Wind.textContent = `${currentData.daily[5].wind_speed} MPH`
                    d5Humid.textContent = `${currentData.daily[5].humidity}%`
                    
                    //save user input to var (see function below)
                    saveInput(placeData[0].name, placeData[0].state, placeData[0].country)
                });
            });
        });
    });

});

function saveInput(name, state, country) {
    var inputHistory = `${name}, ${state}, ${country}`
    var inputArray = JSON.parse(window.localStorage.getItem("history")) || []

    //push to an array
    inputArray.push(inputHistory)

    //take only unique entries from array
    var uniqueHistory = [...new Set(inputArray)]
    console.log('Unique: ', uniqueHistory)

    //set unique hisory to local
    localStorage.setItem('history', JSON.stringify(uniqueHistory))
}

printHistory();

var histBtn = document.querySelectorAll('.histBtn')

console.log('QSClass', histBtn)

//if user clicks on a button from history, take content and transfer it to text input value
histBtn.forEach(function(btn){
    btn.addEventListener('click', function (){
        var userSelection = this.textContent
        
        cityInput.value = userSelection
    })
})

// forEach alternate:
// for (var i=0; i < QSClass.length; i++) {
//     QSClass[i].addEventListener('click', function (){
//         var userSelection = this.textContent
        
//         cityInput.value = userSelection
//     })
// }

