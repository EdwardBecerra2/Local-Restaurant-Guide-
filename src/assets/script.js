var yelpAPIKey = "R_sNro_9M5MMte44II_lc7lHapNDozfk4koDZwqGa4dUlQCp1TwCUyxbKLXd9cA5IwYSJh8_W06hoVokVsGbNO-Y91AZhyXUpbNw2-611hQVd798jZd_udzI7A1oZXYx"
// ask about CORS passthrough endpoint (needs backend request)
var googleApiKey = ""

function displayResults(results) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        var resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = `${result.name} - ${result.location}`;
        resultsContainer.appendChild(resultItem);
    });
}

function displayHistorys(historys) {
    var historysContainer = document.getElementById('historys');
    historysContainer.innerHTML = ''; // Clear previous historys

    historys.forEach(historys => {
        var historysItem = document.createElement('div');
        historysItem.className = 'historys-item';
        historysItem.textContent = `${historys.name} - ${historys.location}`;
        historysContainer.appendChild(historysItem);
    });
}
async function callYelp() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer R_sNro_9M5MMte44II_lc7lHapNDozfk4koDZwqGa4dUlQCp1TwCUyxbKLXd9cA5IwYSJh8_W06hoVokVsGbNO-Y91AZhyXUpbNw2-611hQVd798jZd_udzI7A1oZXYx'
        }
    };

    fetch('https://api.yelp.com/v3/businesses/search?location=Los%20Angeles&term=restaurants&sort_by=best_match&limit=20', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

// displayResults(exampleResults);
// displayHistorys(exampleResults);

callYelp ()