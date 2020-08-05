class App {
  constructor(form, display){
    this.form = form;
    this.display = display
    this.updateP2Header = this.updateP2Header.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.handleGetEventsDataSuccess = this.handleGetEventsDataSuccess.bind(this);
    this.getBreweryData = this.getBreweryData.bind(this);
    this.handleGetBreweryDataSuccess = this.handleGetBreweryDataSuccess.bind(this);
  }

  start(){
    this.form.onSubmit(this.updateP2Header, this.getEventData, this.getBreweryData);
  }

  getBreweryData(city, stateCode){
    var stateName = "";
    for (var property in stateCodes) {
      if (stateCode === stateCodes[property].abbreviation) {
        stateName += stateCodes[property].name;
      }
    }
    var get1 = $.ajax({
      method: "GET",
      url: "https://api.openbrewerydb.org/breweries?by_city=" + city +
      "&by_state=" + stateName,
      error: console.log,
      success: this.handleGetBreweryDataSuccess
    });
  }

  handleGetBreweryDataSuccess(breweriesObj) {
    this.display.updateBreweryTable(breweriesObj)
  }

  getEventData(city, stateCode) {
    var apikey = "apikey=g8k9ENDeCGfdNGKiIo89wTNGIwGEMYIv";
    var get2 = $.ajax({
      method: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=" +
      stateCode + "&city=" + city + "&sort=date,asc&" + apikey,
      error: console.log,
      success: this.handleGetEventsDataSuccess
    })
  }

  updateP2Header(city, stateCode) {
    this.display.page2Element.removeClass("d-none");
    this.display.headerElement.text(city + ", " + stateCode);
  }

  handleGetEventsDataSuccess(eventsObj) {
    var events = eventsObj._embedded.events;
    this.display.updateEventsTable(events);
  }
}
