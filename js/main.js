
const errorDisplay = new ErrorDisplay($errorPage, $serverError, $backButton);
const eventsTable = new Table($eventsTableTitle, $eventsTable);
const breweryTable = new Table($breweryTableTitle, $breweryTable);
const modal = new Modal($modal, $modalButton);
const display = new Display($headerElement, eventsTable, breweryTable, $page2Element, $homeButton);
const form = new Form($formElement, $page1Element);
const app = new App(form, display, modal, errorDisplay, $loadingScreen);

fillSelect(stateCodes);
app.start();
