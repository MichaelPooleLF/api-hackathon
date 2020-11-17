class App {
  constructor(form, display, modals, errorDisplay){
    this.form = form;
    this.display = display
    this.modals = modals;
    this.errorDisplay = errorDisplay;
    this.showError = this.showError.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.handleGetEventsDataSuccess = this.handleGetEventsDataSuccess.bind(this);
    this.getBreweryData = this.getBreweryData.bind(this);
    this.handleGetBreweryDataSuccess = this.handleGetBreweryDataSuccess.bind(this);
  }

  start(){
    this.form.onSubmit(this.display.showTables, this.getEventData, this.getBreweryData);
    this.display.eventsTable.onClick(this.modals.eventModal.populateModal);
    this.display.breweryTable.onClick(this.modals.breweriesModal.populateModal);
    this.display.onClick(this.form.showHomePage);
    this.errorDisplay.onClick(this.form.showHomePage);
  }

  showError() {
    this.display.loadingScreen.addClass("d-none");
    this.errorDisplay.serverError.removeClass("d-none");
  }

  getBreweryData(city, stateCode){
    var stateName = "";
    for (var property in stateCodes) { // stateCodes is defined in fill-select-tag.js
      if (stateCode === stateCodes[property].abbreviation) {
        stateName += stateCodes[property].name;
      }
    }
    this.display.loadingScreen.removeClass("d-none");
    $.ajax({
      method: "GET",
      url: "https://api.openbrewerydb.org/breweries?by_city=" + city +
      "&by_state=" + stateName,
      error: this.showError,
      success: this.handleGetBreweryDataSuccess
    });
  }

  handleGetBreweryDataSuccess(breweriesArray) {
    if(breweriesArray.length === 0) {
      this.display.loadingScreen.addClass("d-none");
      this.errorDisplay.errorPage.removeClass("d-none");
      return;
    }
    this.display.loadingScreen.addClass("d-none");
    this.display.showTables();
    this.breweryCache = breweriesArray;
    this.modals.breweriesModal.brewCache = breweriesArray;
    this.display.breweryTable.updateTable(breweriesArray);
    this.display.updateP2Text(this.form.city, this.form.stateCode)
  }

  getEventData(city, stateCode) {
    var apikey = "apikey=g8k9ENDeCGfdNGKiIo89wTNGIwGEMYIv";
    $.ajax({
      method: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=" +
      stateCode + "&city=" + city + "&sort=date,asc&" + apikey,
      error: console.log,
      success: this.handleGetEventsDataSuccess
    })
  }

  handleGetEventsDataSuccess(eventsObj) {
    if (eventsObj._embedded) {
      var events = eventsObj._embedded.events;
      this.eventsCache = events;
      this.modals.eventModal.eventsCache = events;
    }
    this.display.eventsTable.updateTable(events);
  }
}
