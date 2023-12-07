var searchInput = document.querySelector('#search');
var searchBtn = document.querySelector('.search-btn');
var resultsContainer = document.querySelector('#results');
var map;
var userLocation = {lat:0,lng:0};  // makes into an object allows props to be set

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

        // Display the results
        for (var i = 0; i < 10 && i < res.length; i++) {
            var resultContainer = document.createElement('div');
            resultContainer.classList.add('result-item', 'clickable', 'flex', 'justify-between', 'gap-x-6', 'py-5', 'pr-10', 'cursor-pointer');

            var resultContainerId = 'clickable-' + i;
            resultContainer.id = resultContainerId;

            var resultRestaurantAddress = document.createElement('div');
            resultRestaurantAddress.classList.add('resultRestaurantAddress-item');

            var resultRatingRatingTotal = document.createElement('div');
            resultRatingRatingTotal.classList.add('resultRatingRatingTotal-item');

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
                    clickableId.addEventListener('click', function () {
                        window.location.href = 'https://www.google.com/maps/search/' + addressText;
                    });
                }
            })(i);
        }
    });
}

searchBtn.addEventListener('click', searchRestaurants);


