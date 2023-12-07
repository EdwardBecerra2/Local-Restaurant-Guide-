var searchInput = document.querySelector('#search');
var searchBtn = document.querySelector('.search-btn');
var resultsContainer = document.querySelector('#results');
var apiKey = "1b18ce13c84e21faafb19c931bb29331";
var savedSearches = [];
var map;


var userLocation = { lat: 0, lng: 0 };  // makes into an object allows props lat & lng to be set

const x = document.getElementById("demo");

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

var searchHistoryList = function (cityName) {
    $('.past-search:contains("' + cityName + '")').remove();

    // create entry with city name
    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    // searchHistoryEntry.text(cityName);

    // create container for entry
    var searchEntryContainer = $("<div>");
    // searchEntryContainer.addClass("past-search-container");

    // append entry to container
    searchEntryContainer.append(searchHistoryEntry);

    // append entry container to search history container
    var searchHistoryContainerEl = $("#search-history-container");
    searchHistoryContainerEl.append(searchEntryContainer);

    // if (savedSearches.length > 0) {
    //     // update savedSearches array with previously saved searches
    //     var previousSavedSearches = localStorage.getItem("savedSearches");
    //     savedSearches = JSON.parse(previousSavedSearches);
    // }

    // // add city name to array of saved searches
    // savedSearches.push(cityName);
    // localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

    // reset search input
    $("#search-input").val("");

};

// load saved search history entries into search history container
var loadSearchHistory = function () {
    // get saved search history
    var savedSearchHistory = localStorage.getItem("savedSearches");

    // return false if there is no previous saved searches
    if (!savedSearchHistory) {
        return false;
    }

    // turn saved search history string into array
    savedSearchHistory = JSON.parse(savedSearchHistory);

    // go through savedSearchHistory array and make entry for each item in the list
    for (var i = 0; i < savedSearchHistory.length; i++) {
        searchHistoryList(savedSearchHistory[i]);
    }
};

var currentWeatherSection = function (cityName) {
    // get and use data from open weather current weather api end point
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        // get response and turn it into objects
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // get city's longitude and latitude
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
                // get response from one call api and turn it into objects
                .then(function (response) {
                    return response.json();
                })
                // get data from response and apply them to the current weather section
                .then(function (response) {
                    searchHistoryList(cityName);

                    // add current weather container with border to page
                    var currentWeatherContainer = $("#current-weather-container");
                    currentWeatherContainer.addClass("current-weather-container");

                    // add city name, date, and weather icon to current weather section title
                    var currentTitle = $("#current-title");
                    var currentDay = moment().format("M/D/YYYY");
                    currentTitle.text(`${cityName} (${currentDay})`);
                    var currentIcon = $("#current-weather-icon");
                    currentIcon.addClass("current-weather-icon");
                    var currentIconCode = response.current.weather[0].icon;
                    currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

                    // add current temperature to page
                    var currentTemperature = $("#current-temperature");
                    currentTemperature.text("Temperature: " + response.current.temp + " \u00B0F");

                    // add current humidity to page
                    var currentHumidity = $("#current-humidity");
                    currentHumidity.text("Humidity: " + response.current.humidity + "%");

                    // add current wind speed to page
                    var currentWindSpeed = $("#current-wind-speed");
                    currentWindSpeed.text("Wind Speed: " + response.current.wind_speed + " MPH");

                    // add uv index to page
                    var currentUvIndex = $("#current-uv-index");
                    currentUvIndex.text("UV Index: ");
                    var currentNumber = $("#current-number");
                    currentNumber.text(response.current.uvi);

                    // add appropriate background color to current uv index number
                    if (response.current.uvi <= 2) {
                        currentNumber.addClass("favorable");
                    } else if (response.current.uvi >= 3 && response.current.uvi <= 7) {
                        currentNumber.addClass("moderate");
                    } else {
                        currentNumber.addClass("severe");
                    }
                })
        })
        .catch(function (err) {
            // reset search input
            $("#search-input").val("");

            // alert user that there was an error
            alert("We could not find the city you searched for. Try searching for a valid city.");
        });
};

// called when the search form is submitted
$("#search-form").on("submit", function () {
    event.preventDefault();

    // get name of city searched
    var cityName = $("#search-input").val();

    if (cityName === "" || cityName == null) {
        //send alert if search input is empty when submitted
        alert("Please enter name of city.");
        event.preventDefault();
    } else {
        // if cityName is valid, add it to search history list and display its weather conditions
        currentWeatherSection(cityName);
    }
});

// called when a search history entry is clicked
$("#search-history-container").on("click", "p", function () {
    // get text (city name) of entry and pass it as a parameter to display weather conditions
    var previousCityName = $(this).text();
    currentWeatherSection(previousCityName);

    //
    var previousCityClicked = $(this);
    previousCityClicked.remove();
});


loadSearchHistory();
searchBtn.addEventListener('click', searchRestaurants);


