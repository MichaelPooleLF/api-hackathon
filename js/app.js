class App {
  constructor(form, display){
    this.form = form;
    this.display = display
    this.findBrewery = this.findBrewery.bind(this);
    this.updateP2Header = this.updateP2Header.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.handleGetEventsDataSuccess = this.handleGetEventsDataSuccess.bind(this);
  }

  start(){
    this.getBreweryData();
    this.form.onSubmit(this.updateP2Header, this.getEventData);
  }

  getBreweryData(){
    var get1 = $.ajax({
      method: "GET",
      url: "https://api.openbrewerydb.org/breweries?by_city=sacramento&by_state=california",
      error: console.log,
      success: this.findBrewery
    });
  }

  findBrewery(data) {
    console.log("breweries:", data);
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
    console.log("got event data:", eventsObj);
    var events = eventsObj._embedded.events[0].name;
    this.display.updateEventsTable(events);
  }
}
