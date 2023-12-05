var searchInput = document.querySelector('#search');
var searchBtn = document.querySelector('.search-btn');
var resultsContainer = document.querySelector('#results');
var map;

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

    console.log("Request:", request);
    service.textSearch(request, function(res) {
        console.log("Google maps response:");
        console.log(res);

        // Display the results
        for(var i = 0; i < res.length; i++) {
            var resultContainer = document.createElement('div');
            resultContainer.classList.add('result-item');

            var listElm = document.createElement('li');
            listElm.classList.add('result-item-restaurant-name');
            listElm.textContent = res[i].name;

            var address = document.createElement('li');
            address.textContent = res[i].formatted_address;
            address.classList.add('result-item-address');

            var userRaintTotal = document.createElement('li');
            userRaintTotal.textContent = res[i].user_ratings_total;
            userRaintTotal.classList.add('result-item-ratings-total');

            var rating = document.createElement('li');
            rating.textContent = res[i].rating;
            rating.classList.add('result-item-rating');

            resultContainer.append(listElm, address, userRaintTotal, rating)
            
            resultsContainer.append(resultContainer)
        }

    });
}


searchBtn.addEventListener('click', searchRestaurants);


