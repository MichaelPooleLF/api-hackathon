var get1 = $.ajax ({
  method: "GET",
  url: "https://api.openbrewerydb.org/breweries?by_city=sacramento&by_state=california",
  error: console.log,
  success: findBrewery
})

var get2 = $.ajax({
  method: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?city=sacramento&sort=date,asc&apikey=g8k9ENDeCGfdNGKiIo89wTNGIwGEMYIv",
  error: console.log,
  success: findVenue
})

function findVenue(data) {
  var events = data._embedded.events
  var venueArray = [];
  var numOfEvents = events.length;
  for (var i = 0; i < numOfEvents; i++) {
    venueArray.push(events[i]._embedded.venues[0].address.line1);
  }
  console.log("Events:",data)
}

function findBrewery(data) {
  console.log("breweries:", data);
}
