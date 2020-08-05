var $formElement = $("form");
var $cityInput = $("#city");
var $stateInput = $("#state");
var $page1Element = $(".page-1");
var $headerElement = $("header > h2");
var $eventsTable = $(".events-table > tbody");
var $breweryTable = $("brewery-table > tbody");
var $page2Element = $(".page-2");
var display = new Display($headerElement, $eventsTable, $breweryTable, $page2Element);
var form = new Form($formElement, $cityInput, $stateInput, $page1Element);
var app = new App(form, display);
app.start();
fillSelect(stateCodes);

// function findVenue(data) {
//   var events = data._embedded.events
//   var venueArray = [];
//   var numOfEvents = events.length;
//   for (var i = 0; i < numOfEvents; i++) {
//     venueArray.push(events[i]._embedded.venues[0].address.line1);
//   }
//   console.log("Events:",data)
// }
