class App {
  constructor(form, display, modal, errorDisplay, loadingScreen){
    this.form = form;
    this.display = display
    this.modal = modal;
    this.errorDisplay = errorDisplay;
    this.loadingScreen = loadingScreen;
    this.showServerError = this.showServerError.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.handleGetEventsDataSuccess = this.handleGetEventsDataSuccess.bind(this);
    this.getBreweryData = this.getBreweryData.bind(this);
    this.handleGetBreweryDataSuccess = this.handleGetBreweryDataSuccess.bind(this);
  }

  start(){
    this.form.onSubmit(this.getEventData, this.getBreweryData);
    this.display.onClick(this.form.showHomePage, this.modal.populateModal);
    this.errorDisplay.onClick(this.form.showHomePage);
  }

  showServerError() {
    this.loadingScreen.addClass("d-none");
    this.errorDisplay.showError("server");
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
    var data = null;

    if (eventsObj._embedded) {
      var namesArray = [];
      data = eventsObj._embedded.events.map(function(element) {
        if (namesArray.indexOf(element.name) === -1) {
          namesArray.push(element.name);
          return {
            id: element.id,
            tdOne: element.name,
            tdTwo: element.dates.start.localDate,
            tdThree: {text: "More details", url: element.url }
          }
        }
      })
      this.modal.eventsCache = data;
    }
    var header = ["Event", "Event Date", "Website"];
    this.display.eventsTable.updateTable(data, header, "event");
  }

  getBreweryData(city, stateCode){
    var stateName = "";
    for (var property in stateCodes) { // stateCodes is defined in fill-select-tag.js
      if (stateCode === stateCodes[property].abbreviation) {
        stateName += stateCodes[property].name;
      }
    }
    this.loadingScreen.removeClass("d-none");
    $.ajax({
      method: "GET",
      url: "https://api.openbrewerydb.org/breweries?by_city=" + city +
      "&by_state=" + stateName,
      error: this.showServerError,
      success: this.handleGetBreweryDataSuccess
    });
  }

  handleGetBreweryDataSuccess(breweriesArray) {
    if(breweriesArray.length === 0) {
      this.loadingScreen.addClass("d-none");
      this.errorDisplay.showError("user");
      return;
    }

    var data = breweriesArray.map(function(element) {
      return {
        id: element.id,
        tdOne: element.name,
        tdTwo: element.brewery_type,
        tdThree: { text: "Visit their site!", url: element.website_url }
      }
    })
    var header = ["Brewery", "Brewery Type", "Website"]
    this.modal.brewCache = data;
    this.display.breweryTable.updateTable(data, header, "brewery");
    this.loadingScreen.addClass("d-none");
    this.display.showTables();
    this.display.updateP2Text(this.form.city, this.form.stateCode)
  }
}
