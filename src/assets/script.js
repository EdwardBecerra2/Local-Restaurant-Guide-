var searchInput = document.querySelector('#search');
var searchBtn = document.querySelector('.search-btn');
var resultsContainer = document.querySelector('#results');
var map;
var APIKey = "ea678db88cb7433b187a76d0ea5c3d5b"; // for openweather API

function searchRestaurants() {
    var searchQuery = searchInput.value;
    var pyrmont = { lat: -33.866, lng: 151.196 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: pyrmont,
        zoom: 17,
        mapId: "8d193001f940fde3",
    });

    console.log(google.maps);
    var service = new google.maps.places.PlacesService(map);
    console.log(service);
    var request = {
        query: searchQuery
    }
    function GetForcast(lat, lon) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + pyrmont.lat + "&lon=" + pyrmont.lon + "&appid=" + APIKey + "&units=imperial";

        fetch(queryURL)
            .then(function (response) {
                //console.log(response)
                //console.log(queryURL)
                return response.json()
            }).then(function (data) {
                console.log(data) // apply forcasted weather
                document.querySelector("#forecast").innerHTML = ''; //clears old forecast 
                for (var i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.includes("12:00:00")) { // searches for noon for next 5 days
                        var card = document.createElement("div") // dynamic html div tag
                        card.setAttribute("class", "card")  // adding the class of card to style div
                        var date_tag = document.createElement("h5")
                        date_tag.textContent = new Date(data.list[i].dt * 1000).toLocaleDateString()
                        var icon = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
                        var image_tag = document.createElement("img")
                        image_tag.setAttribute("src", icon)
                        var temp_tag = document.createElement("h6")
                        temp_tag.textContent = "Temp: " + data.list[i].main.temp + " F"
                        var wind_tag = document.createElement("h6")
                        wind_tag.textContent = "Wind : " + data.list[i].wind.speed + " MPH"
                        var hum_tag = document.createElement("h6")
                        hum_tag.textContent = "Humidity: " + data.list[i].main.humidity + "%"
                        card.append(date_tag, image_tag, temp_tag, wind_tag, hum_tag)
                        document.querySelector("#forecast").append(card)
                    }
                }
            })
    }
    console.log("Request:", request);
    service.textSearch(request, function (res) {
        console.log("Google maps response:");
        console.log(res);
        document.querySelector("#results").innerHTML = '' //clears old results

        // Display the results
        for (var i = 0; i < 10 && i < res.length; i++) {
            var resultContainer = document.createElement('div');
            resultContainer.classList.add('result-item', 'flex', 'justify-between', 'gap-x-6', 'py-5');

            var resultRestaurantAddress = document.createElement('div');
            resultRestaurantAddress.classList.add('resultRestaurantAddress-item');

            var resultRatingRatingTotal = document.createElement('div');
            resultRatingRatingTotal.classList.add('resultRatingRatingTotal-item');

            var listElm = document.createElement('li');
            listElm.classList.add('result-item-restaurant-name', 'text-2xl', 'font-semibold', 'leading-6', 'text-gray-900');
            listElm.textContent = res[i].name;

            var address = document.createElement('li');
            address.textContent = res[i].formatted_address;
            address.classList.add('result-item-address', 'mt-1', 'truncate', 'text-xl', 'leading-5', 'text-gray-500');

            var userRaintTotal = document.createElement('li');
            userRaintTotal.textContent = ("from " + res[i].user_ratings_total + " reviews");
            userRaintTotal.classList.add('result-item-ratings-total', 'text-xl', 'leading-6', 'text-gray-900');

            var rating = document.createElement('li');
            rating.textContent = ("Rating: " + res[i].rating + " out of 5");
            rating.classList.add('result-item-rating', 'mt-1', 'text-xl', 'leading-5', 'text-gray-500');

            resultRestaurantAddress.append(listElm, address)
            resultRatingRatingTotal.append(rating, userRaintTotal)

            resultContainer.append(resultRestaurantAddress, resultRatingRatingTotal)

            resultsContainer.append(resultContainer)
        }

    });
}


searchBtn.addEventListener("click", function () {
    searchRestaurants()
    GetForcast(data.pyrmont.lat, data.pyrmont.lon);
})