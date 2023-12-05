var searchInput = document.querySelector('#search');
var searchBtn = document.querySelector('#search-btn');
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
            var listElm = document.createElement('li');
            listElm.textContent = res[i].name;
            var userinput = document.createElement('li');
            userinput.textContent = res[i].user_ratings_total;
            var rating = document.createElement('li');
            rating.textContent = res[i].rating;
            resultsContainer.append(listElm, userinput, rating)
        }

    });
}


searchBtn.addEventListener('click', searchRestaurants);


