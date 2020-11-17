// selectors for form
var $formElement = $("form");
var $page1Element = $(".page-1");

// selectors for tables
var $eventsTable = $(".events-table > tbody");
var $eventsTableTitle = $(".events-table-title");
var $breweryTable = $(".brewery-table > tbody");
var $breweryTableTitle = $(".brewery-table-title");

// selectors for display
var $headerElement = $("main.success header > h2");
var $page2Element = $(".page-2");
var $homeButton = $(".page-2 a");

// selectors for modals
var $eventsModal = $(".events-modal");
var $eventsModalButton = $(".events-modal button");
var $breweriesModal = $(".breweries-modal");
var $breweriesModalButton = $(".breweries-modal button");

// selectors for errorDisplay
var $errorPage = $(".error-page");
var $serverError = $(".server-error");
var $backButton = $(".back-button");

// selectors for app
var $loadingScreen = $(".loading-screen");


var errorDisplay = new ErrorDisplay($errorPage, $serverError, $backButton);
var eventsTable = new Table($eventsTableTitle, $eventsTable);
var breweryTable = new Table($breweryTableTitle, $breweryTable);
var eventModal = new Modal($eventsModal, $eventsModalButton);
var breweryModal = new Modal($breweriesModal, $breweriesModalButton);
var modals = new Modals(eventModal, breweryModal);
var display = new Display($headerElement, eventsTable, breweryTable, $page2Element, $homeButton);
var form = new Form($formElement, $page1Element);
var app = new App(form, display, modals, errorDisplay, $loadingScreen);

app.start();
fillSelect(stateCodes);
