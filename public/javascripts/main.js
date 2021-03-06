var locBtn = document.getElementById("locBtn");
var userInput = document.getElementById('locationSearch').value;
var searchTerm = document.getElementById('searchTerm').value;
var myUrl = window.location.href;

loadDoc();

// Gets Clients IP with AJAX
function loadDoc() {
    ipRequest = new XMLHttpRequest();
    ipRequest.open('GET', 'http://ipinfo.io/json');
    ipRequest.onload = function() {
        ipData = JSON.parse(ipRequest.responseText);
        locRequest = new XMLHttpRequest();
        locRequest.open('GET', 'http://ip-api.com/json/' + ipData.ip);
        locRequest.onload = function() {
            locData = JSON.parse(locRequest.responseText);
            console.log(locData);
            renderClientInfo();
        };
        locRequest.send();
    };
    ipRequest.send();
}

// Puts Clients IP Address on Webpage
function renderClientInfo() {
    document.getElementById('clientLatAndLon').innerHTML = '<li>Your IP Address: ' + ipData.ip + '</li>';
}

// ValidatesIPAddress with Regex
function ValidateIPaddress(fun) {
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!locationSearch.value.match(ipRegex)) {
        return alert("You have entered an invalid IP address :(");
    } else {
        fun;
        return location.reload();
    }
}

// Based on inputs value adds query string to url
function runQueryString() {
    if (history.pushState) {
        var userInput = document.getElementById('locationSearch').value;
        var searchTerm = document.getElementById('searchTerm').value;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + searchTerm + '&ip=' + userInput;
        window.history.pushState({
            path: newurl
        }, '', newurl);

    }
}

document.getElementById('locationSearch').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        locBtn.click();
    }
});

document.getElementById('searchTerm').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        locBtn.click();
    }
});

locBtn.addEventListener("click", function() {
    ValidateIPaddress(runQueryString());
});
