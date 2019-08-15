        //
        // dark sky API is the only api i found that had historical weather data on a free tier, but they didnt have data for a whole month. 
        // couldve found average monthly data mathematically but we're running short on time at this point.
        //


        var gMapsApiKey = 'AIzaSyD8qVQOGIi9GUrMcfM2yffflhBixKtt3ok'
        var darkSkyApiKey = 'ea750c45103a958f9e303e905c1d7188'

        // This is ~30 years ago, about as far as we can go with dark sky.
        var startDate = "1989-08-05T00:00:00"
        var dateTime = new Date()
        var strDateTime = dateTime.toISOString()
        // Remove extra stuff from the string datetime.
        var endDate = strDateTime.substring(0, strDateTime.length - 5)

        var darkSkyQueryURLPast = ""
        var darkSkyQueryURLToday = ""
        var loc = ""
        var gMapsQueryURL = ""
        var latitude = ""
        var longitude = ""

        let newObj = {
            old: 0,
            nu:0
        };


        // When clicking the search button, call Google's Geocoding API to translate city, state to latitude/longitude.
        $("#myBtn").on("click", function () {
            // Replace spaces in location to use in address api search.
            loc = $("#search").val().trim().split(" ").join("+")
            gMapsQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=' + gMapsApiKey

            // Put spaces back into location before writing location to the table.
            loc = $("#search").val().trim().split("+").join(" ")
            ConvertLocToLatLon(loc)
        })


        // These AJAX calls need to wait for the results of the google maps call, use a custom event to facilitate this wait.
        $(window).on('canRunDarkSky', function () {
            GetPastWeatherData(darkSkyQueryURLToday)
            GetCurrWeatherData(darkSkyQueryURLPast)
        });


        function ConvertLocToLatLon(location) {
            $.ajax({
                url: gMapsQueryURL,
                method: "GET"
            }).then(function (response) {

                var reqStatus = response.status

                if (response.status == "OK") {
                    // Dark sky API needs lat/long to search for locations.
                    latitude = response.results[0].geometry.location.lat;
                    longitude = response.results[0].geometry.location.lng;
                    // console.log(response);

                    // console.log(response.results[0].address_components[2].long_name);

                    state = response.results[0].address_components[2].long_name;

                    // Now that we have lat/longs, set the query URLs.
                    darkSkyQueryURLPast = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkSkyApiKey + '/' + latitude + ',' + longitude + ',' + endDate
                    darkSkyQueryURLToday = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkSkyApiKey + '/' + latitude + ',' + longitude + ',' + startDate

                    newEllipse(latitude,longitude,state);

                    // Trigger custom event, signalling the DarkSky ajax calls to start running.
                    var evt = $.Event('canRunDarkSky');
                    $(window).trigger(evt);
                }
            });
        }


        // Get weather data from the date ~30 years ago and write relevant values to the table.
        function GetPastWeatherData(queryURL) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var lowTemp = response.daily.data[0].temperatureLow
                var highTemp = response.daily.data[0].temperatureHigh

                // Remove the time part of datetime from the string before writing to the date box.
                $("#oldDate").text(startDate.substring(0, endDate.length - 9))
                $("#oldLocation").text(loc)
                $("#oldLowTemp").text(lowTemp)
                $("#oldHighTemp").text(highTemp)
                newObj.old = highTemp;

            });
        }


        // Get weather data from today and write relevant values to the table.
        function GetCurrWeatherData(queryURL) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var lowTemp = response.daily.data[0].temperatureLow
                var highTemp = response.daily.data[0].temperatureHigh

                // Remove the time part of datetime from the string before writing to the date box.
                $("#newDate").text(endDate.substring(0, endDate.length - 9))
                $("#newLocation").text(loc)
                $("#newLowTemp").text(lowTemp)
                $("#newHighTemp").text(highTemp)
                newObj.nu = highTemp;
                newTemp(newObj);
            });
        }