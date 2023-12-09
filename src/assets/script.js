var searchInput = document.querySelector('#search');
var searchBtn = document.querySelector('.search-btn');
var resultsContainer = document.querySelector('#results');
var apiKey = "1b18ce13c84e21faafb19c931bb29331";
var savedSearches = [];
var map;


var userLocation = { lat: 0, lng: 0 };  // makes into an object allows props lat & lng to be set


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    userLocation.lat = position.coords.latitude.toFixed(3)
    userLocation.lng = position.coords.longitude.toFixed(3)
    console.log(userLocation);

}
getLocation();
// showPosition();

function searchRestaurants() {
    if (searchInput.value == "") return; //stops execution of function if blank
    var searchQuery = searchInput.value;

    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 17,
        mapId: "8d193001f940fde3",
    });

    console.log(google.maps);
    var service = new google.maps.places.PlacesService(map);
    console.log(service);
    var request = {
        query: searchQuery
    }

    console.log("Request:", request);
    service.textSearch(request, function (res) {
        console.log("Google maps response:");
        console.log(res);
        document.querySelector("#results").innerHTML = '' //clears old results
        
        // Display the results
        for (var i = 0; i < 10 && i < res.length; i++) {
            var resultContainer = document.createElement('div');
            resultContainer.classList.add('result-item', 'clickable', 'flex', 'justify-between', 'gap-x-6', 'py-5', 'pr-10', 'cursor-pointer');

            var resultContainerId = 'clickable-' + i;
            resultContainer.id = resultContainerId;

            var resultRestaurantAddress = document.createElement('div');
            resultRestaurantAddress.classList.add('resultRestaurantAddress-item', 'max-w-xl');

            var resultRatingRatingTotal = document.createElement('div');
            resultRatingRatingTotal.classList.add('resultRatingRatingTotal-item', 'min-w-170');

            var listElm = document.createElement('li');
            listElm.classList.add('result-item-restaurant-name', 'text-2xl', 'font-semibold', 'leading-6', 'text-gray-900');
            listElm.textContent = res[i].name;

            var address = document.createElement('li');
            address.textContent = res[i].formatted_address;
            address.classList.add('result-item-address', 'mt-1', 'text-xl', 'leading-5', 'text-gray-500');

            var restaurantAddressId = 'restaurant-' + i;
            address.id = restaurantAddressId

            var userRaintTotal = document.createElement('li');
            userRaintTotal.textContent = ("Total reviews: " + res[i].user_ratings_total);
            userRaintTotal.classList.add('result-item-ratings-total', 'mt-1', 'text-xl', 'leading-5', 'text-gray-500');

            var rating = document.createElement('li');
            rating.textContent = ("Rating: " + res[i].rating + " out of 5");
            rating.classList.add('result-item-rating', 'text-xl', 'leading-6', 'text-gray-900');

            resultRestaurantAddress.append(listElm, address)
            resultRatingRatingTotal.append(rating, userRaintTotal)


            resultContainer.append(resultRestaurantAddress, resultRatingRatingTotal)

            resultsContainer.append(resultContainer)


        }

        for (var i = 0; i < 10; i++) {
            (function (index) {
                var addressElement = document.getElementById('restaurant-' + i);
                if (addressElement) {
                    var addressText = addressElement.textContent;
                    console.log(addressText);

                    var clickableId = document.getElementById('clickable-' + i);
                    console.log(clickableId);

                    clickableId.addEventListener('click', function() {
                    var link = document.createElement('a');
                    link.href = 'https://www.google.com/maps/search/' + addressText;
                    link.target = '_blank';
                    link.click();
                });         

                }
            })(i);
        }
    });
}

// weather

var searchButton = document.getElementById("search-btn");
var clearHistoryButton = document.getElementById("clear-history-btn");


searchBtn.addEventListener("click", function () {
    handleSearch();
    
});

function handleSearch() {
    fetchWeatherData();
    
}

function fetchWeatherData() {
       
    console.log(userLocation);              
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lng}&appid=dfb1bbc6193c13c32f550c45f737430e`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (currentWeatherData) {
                        displayCurrentWeather(currentWeatherData);
                    })

                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.lat}&lon=${userLocation.lng}&appid=dfb1bbc6193c13c32f550c45f737430e`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (forecastData) {
                        display5DayForecast(forecastData);
                    });
}

function displayCurrentWeather(weatherData) {
    var currentCityDiv = document.getElementById("currentcity");

    var temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2);
    var temperatureFahrenheit = ((temperatureCelsius * 9/5) + 32).toFixed(0);
    var humidity = (weatherData.main.humidity);
    var currentDate = new Date();
    var windSpeed = (weatherData.wind.speed);
    var formattedDate = currentDate.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

    currentCityDiv.innerHTML = `<div class="weather" style="font-size: 36px; padding: 10px; font-weight: bolder;">Current Weather in ${weatherData.name}</div>
                                <div class="weather" style="font-size: 30px; padding: 5px;">Date: ${formattedDate}</div>
                                <div class="weather" style="font-size: 24px">Temperature: ${temperatureFahrenheit} &#8457;</div>
                                <div class="weather" style="font-size: 24px">Weather: ${weatherData.weather[0].description}</div>
                                <div class="weather" style="font-size: 24px">Humidity: ${humidity}</div>
                                <div class="weather" style="font-size: 24px">Wind Speed: ${windSpeed}</div>`;
}

function display5DayForecast(forecastData) {
    var future5DayDiv = document.getElementById("future5day");
    future5DayDiv.innerHTML = '<div class="weather" style="font-size: 36px; padding: 10px; font-weight: bolder;">3-Day Forecast</div>';
    for (var i = 8; i < (forecastData.list.length - 8) ; i += 8) {
        console.log(forecastData.list.length);
        var date = new Date(forecastData.list[i].dt * 1000);
        var formattedDate = date.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
        var humidity = (forecastData.list[i].main.humidity);
        var temperatureCelsius = (forecastData.list[i].main.temp - 273.15).toFixed(2);
        var temperatureFahrenheit = ((temperatureCelsius * 9/5) + 32).toFixed(0);
        var windSpeed = (forecastData.list[i].wind.speed);
        
        var forecastItem = document.createElement("div");
        forecastItem.innerHTML = `<div class="weather" style="font-size: 30px; padding: 5px;">Date: ${formattedDate}</div>
                                    <div class="weather" style="font-size: 24px">Temperature: ${temperatureFahrenheit} &#8457;</div>
                                    <div class="weather" style="font-size: 24px">Weather: ${forecastData.list[i].weather[0].description}</div>
                                    <div class="weather" style="font-size: 24px">Humidity: ${humidity}</div>
                                    <div class="weather" style="font-size: 24px">Wind Speed: ${windSpeed}</div>`;
        future5DayDiv.appendChild(forecastItem);
        
    }
};

searchBtn.addEventListener('click', searchRestaurants);


