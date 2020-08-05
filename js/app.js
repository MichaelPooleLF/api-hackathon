class App {
  constructor(form, display, modals){
    this.form = form;
    this.display = display
    this.modals = modals;
    this.updateP2Header = this.updateP2Header.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.handleGetEventsDataSuccess = this.handleGetEventsDataSuccess.bind(this);
    this.getBreweryData = this.getBreweryData.bind(this);
    this.handleGetBreweryDataSuccess = this.handleGetBreweryDataSuccess.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.showEventsModal = this.showEventsModal.bind(this);
  }

  start(){
    this.form.onSubmit(this.updateP2Header, this.getEventData, this.getBreweryData);
    this.display.onClick(this.showEventsModal, this.getEvent);
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

  handleGetEventsDataSuccess(eventsObj) {
    var events = eventsObj._embedded.events;
    this.display.updateEventsTable(events);
  }

  updateP2Header(city, stateCode) {
    this.display.page2Element.removeClass("d-none");
    this.display.headerElement.text(city + ", " + stateCode);
  }

  getEvent(id) {
    var apikey = "apikey=g8k9ENDeCGfdNGKiIo89wTNGIwGEMYIv";
    var get2 = $.ajax({
      method: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?id=" +
      id + "&" + apikey,
      error: console.log,
      success: this.showEventsModal
    })
  }

  showEventsModal(data) {
    var event = data._embedded.events[0];
    console.log(event);
    this.modals.eventModal.removeClass("d-none");
    var $h4Element = this.modals.eventModal.find("h4");
    var $liElements = this.modals.eventModal.find("li");
    var $address = $liElements[0];
    var $startDate = $liElements[1];
    var $website = $liElements[2];
    console.log($h4Element, $address, $startDate, $website);
  }
}
