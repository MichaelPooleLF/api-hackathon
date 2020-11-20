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
var $page2TestElement = $(".page-2-test");
var $homeButton = $(".page-2 a");

// selectors for modal
var $modal = $(".my-modal");
var $modalButton = $(".my-modal button");

// selectors for errorDisplay
var $errorPage = $(".error-page");
var $serverError = $(".server-error");
var $backButton = $(".back-button");

// selectors for app
var $loadingScreen = $(".loading-screen");


var errorDisplay = new ErrorDisplay($errorPage, $serverError, $backButton);
var eventsTable = new TableTest($eventsTableTitle, $eventsTable);
var breweryTable = new TableTest($breweryTableTitle, $breweryTable);
var modal = new Modal($modal, $modalButton);
var display = new Display($headerElement, eventsTable, breweryTable, $page2TestElement, $homeButton);
var form = new Form($formElement, $page1Element);
var app = new App(form, display, modal, errorDisplay, $loadingScreen);

app.start();
fillSelect(stateCodes);
