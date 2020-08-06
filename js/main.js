var $formElement = $("form");
var $page1Element = $(".page-1");
var $headerElement = $("header > h2");
var $eventsTable = $(".events-table > tbody");
var $breweryTable = $(".brewery-table > tbody");
var $page2Element = $(".page-2");
var $eventsTableTitle = $(".events-table-title");
var $breweryTableTitle = $(".brewery-table-title");
var $eventsModal = $(".events-modal");
var $breweriesModal = $(".breweries-modal");
var $eventsModalButton = $(".events-modal button");
var $breweriesModalButton = $(".breweries-modal button");

var modals = new Modals($eventsModal, $eventsModalButton, $breweriesModal, $breweriesModalButton);
var display = new Display($headerElement, $eventsTable, $breweryTable, $page2Element,
  $eventsTableTitle, $breweryTableTitle);
var form = new Form($formElement, $page1Element);
var app = new App(form, display, modals);

app.start();
fillSelect(stateCodes);
