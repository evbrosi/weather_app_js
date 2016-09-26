$(function () {
    $("#getZip").click(function (ev) {
        var zipCode = $("#zip").val();
        if (zipCode.length=5) {
        getThatLatLng(zipCode);
        $("#zip").val("");
        } else {
            $("#zip").val("");
        }
    });

});

var getThatLatLng = function (zipCode) {
    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyA9g-075mZUm-ljcnwiwwhxAK_4NYr6Yyg";
    $.ajax(googleUrl).done(function (data) {
        var latitude = data.results[0].geometry.location.lat;
        var longitude = data.results[0].geometry.location.lng;
        var cityName = data.results[0].address_components[1].long_name;
        darkSkyInfo(latitude, longitude);
        $("#printTown").append(cityName);
    });
};

var darkSkyInfo = function (latitude, longitude) {
    var darkSkyKey = "5c5bf23bede7a352af218de8bb79c4b0";
    var darkSkyUrl = "https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," + longitude;
    $.ajax(darkSkyUrl, { dataType: "jsonp" }).done(function (data) {
        var temperature = Math.floor(data.currently.temperature);
        $("#printTemperature").prepend(temperature);
        var conditions = data.currently.summary;
        $("#printConditions").empty().append(conditions);
        glyphicon(conditions)
        var precepitation = data.currently.precipProbability;
        $("#printPrecipitation").empty().append(precepitation);
        var lowTemp = Math.floor(data.daily.data[0].temperatureMin);
        $("#printLow").empty().append(lowTemp);
        var highTemp = Math.floor(data.daily.data[0].temperatureMax);
        $("#printHigh").empty().append(highTemp);
    });
};

var glyphicon = function (conditions) {
    if (conditions == "Partly Cloudy"){
        
    }

}



$(function () {
    $("#add").click(function () {
        addContent("http://google.com");
    }).addClass('blue');
    var addContent = function (url) {
        var container = $("#container");
        var span = $("<span></span>");
        span.html("Hello, ");
        span.append("World!");
        var link = $("<a></a>");
        link.attr("href", url);
        link.attr("target", "_blank");
        link.html(" (Google That) ");
        span.append(link);
        container.append(span);

        container.append('<span>Hello, World!<a href="' + url + '"> (Google That) </a></span>');
    }
});


