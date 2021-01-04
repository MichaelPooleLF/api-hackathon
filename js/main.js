
var errorDisplay = new ErrorDisplay($errorPage, $serverError, $backButton);
var eventsTable = new Table($eventsTableTitle, $eventsTable);
var breweryTable = new Table($breweryTableTitle, $breweryTable);
var modal = new Modal($modal, $modalButton);
var display = new Display($headerElement, eventsTable, breweryTable, $page2Element, $homeButton);
var form = new Form($formElement, $page1Element);
var app = new App(form, display, modal, errorDisplay, $loadingScreen);

app.start();
fillSelect(stateCodes);
