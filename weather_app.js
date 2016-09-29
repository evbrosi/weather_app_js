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

// prints city name & creates lat lng variables //
var getThatLatLng = function (zipCode) {
    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyA9g-075mZUm-ljcnwiwwhxAK_4NYr6Yyg";
    $.ajax(googleUrl).done(function (data) {
        var latitude = data.results[0].geometry.location.lat;
        var longitude = data.results[0].geometry.location.lng;
        var cityName = data.results[0].address_components[1].long_name;
        darkSkyInfo(latitude, longitude, cityName);
    });
};

// prints out the temperature, low, high, and percepitation //
var darkSkyInfo = function (latitude, longitude, cityName) {
    var darkSkyKey = "5c5bf23bede7a352af218de8bb79c4b0";
    var darkSkyUrl = "https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," + longitude;
    $.ajax(darkSkyUrl, { dataType: "jsonp" }).done(function (data) {
        //prints & styles the temperature//
        var temperature = Math.floor(data.currently.temperature);
        var conditions = data.currently.summary;
        var lowTemp = Math.floor(data.daily.data[0].temperatureMin);
        var precepitation = data.currently.precipProbability;
        var highTemp = Math.floor(data.daily.data[0].temperatureMax);
        var template=$("#template").html();
        var icons = data.currently.icon;
        console.log(icons);

        template = template.replace("@@printTown@@", cityName);
        template = template.replace("@@temperature@@", temperature);
        template = template.replace("@@conditions@@", conditions);           
        template = template.replace("@@low@@", lowTemp);
        template = template.replace("@@precipitation@@", precepitation);
        template = template.replace("@@highTemp@@", highTemp);

        $("#templateGoesHere").append(template);
        $(".delete").click(function () {
        $(this).parent().remove();
        changeBackground(icons)

    });
    });
};

function changeBackground (icons){
    if (icons=="clear-day"){
        $("#cardie").css("background-color", "#ff6600");
    } else if (icons=="clear-night") {
        $("#cardie").css("background-color", "#ff6600");
    } else if (icons == "snow"){
        $("#cardie").css("background-color", "#ff6600");
    } else {
        $("#cardie").css("background-color", "red");
    }
}