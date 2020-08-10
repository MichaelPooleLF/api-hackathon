// selectors for form
var $formElement = $("form");
var $page1Element = $(".page-1");

// selectors for display
var $headerElement = $("main.success header > h2");
var $eventsTable = $(".events-table > tbody");
var $breweryTable = $(".brewery-table > tbody");
var $page2Element = $(".page-2");
var $eventsTableTitle = $(".events-table-title");
var $breweryTableTitle = $(".brewery-table-title");
var $homeButton = $(".page-2 a");

// selectors for modals
var $eventsModal = $(".events-modal");
var $eventsModalButton = $(".events-modal button");
var $breweriesModal = $(".breweries-modal");
var $breweriesModalButton = $(".breweries-modal button");

// selectors for errorDisplay
var $errorPage = $(".error-page");
var $backButton = $(".error-page button");

// selectors for iframe
var $iframe = $(".iframe");

var iframe = new Iframe($iframe);
var errorDisplay = new ErrorDisplay($errorPage, $backButton);
var modals = new Modals($eventsModal, $eventsModalButton, $breweriesModal, $breweriesModalButton);
var display = new Display($headerElement, $eventsTable, $breweryTable, $page2Element,
  $eventsTableTitle, $breweryTableTitle, $homeButton);
var form = new Form($formElement, $page1Element);
var app = new App(form, display, modals, errorDisplay, iframe);

app.start();
fillSelect(stateCodes);
