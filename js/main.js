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
var $loadingScreen = $(".loading-screen");

// selectors for modals
var $eventsModal = $(".events-modal");
var $eventsModalButton = $(".events-modal button");
var $breweriesModal = $(".breweries-modal");
var $breweriesModalButton = $(".breweries-modal button");

// selectors for errorDisplay
var $errorPage = $(".error-page");
var $serverError = $(".server-error");
var $backButton = $(".back-button");

var errorDisplay = new ErrorDisplay($errorPage, $serverError, $backButton);
var eventsTable = new Table($eventsTableTitle, $eventsTable);
var breweryTable = new Table($breweryTableTitle, $breweryTable);
var eventModal = new Modal($eventsModal, $eventsModalButton);
var breweryModal = new Modal($breweriesModal, $breweriesModalButton);
var modals = new Modals(eventModal, breweryModal);
var display = new Display($headerElement, eventsTable, breweryTable, $page2Element, $homeButton, $loadingScreen);
var form = new Form($formElement, $page1Element);
var app = new App(form, display, modals, errorDisplay, $loadingScreen);

app.start();
fillSelect(stateCodes);
