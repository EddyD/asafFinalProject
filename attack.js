var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var israel = new google.maps.LatLng(31.30, 34.45);
    var mapOptions = {
        zoom: 7,
        center: israel
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
}

function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var price = document.getElementById("distance");
            price.innerHTML = "Distance is " + response.routes[0].legs[0].distance.text;

            var worker = new Worker('worker.js');
            worker.addEventListener('message', function (e) {
                    if (confirm(" your price is " + (e.data + planePrice(localStorage.getItem("chosenPlane"))) + "$" + " ready for destruction?")) {
                        location = "index.html";
                    }
            }, false);

            document.getElementsByTagName("body")[0].classList.add("cursor-wait");
document.getElementById('player').play();
            setTimeout(function () {
                worker.postMessage(response.routes[0].legs[0].distance.value);
                document.getElementsByTagName("body")[0].classList.remove("cursor-wait");
                 
            }, 6000);
        }
    });
}

function planePrice(serialNumber) {
    if (serialNumber === "s1") {
        return 100;
    }
    if (serialNumber === "s2") {
        return 200;
    }
    if (serialNumber === "s3") {
        return 300;
    }
    if (serialNumber === "s4") {
        return 400;
    }
    if (serialNumber === "s5") {
        return 500;
    }
}
google.maps.event.addDomListener(window, 'load', initialize);
