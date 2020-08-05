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
    this.getBrewery = this.getBrewery.bind(this);
    this.showBreweryModal = this.showBreweryModal.bind(this);
  }

  start(){
    this.form.onSubmit(this.updateP2Header, this.getEventData, this.getBreweryData);
    this.display.onClick(this.getEvent, this.showBreweryModal);
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
    this.breweryCache = breweriesObj;
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

  getBrewery(name) {
    var get1 = $.ajax({
      method: "GET",
      url: "https://api.openbrewerydb.org/breweries?by_city=" + city +
        "&by_state=" + stateName,
      error: console.log,
      success: this.showBreweryModal
    });
  }

  showEventsModal(data) {
    this.modals.eventModal.removeClass("d-none");
    var event = data._embedded.events[0];
    var $h4Element = this.modals.eventModal.find("h4");
    $h4Element.text(event.name);
    var $liElements = this.modals.eventModal.find("li");
    var address = $liElements[0];
    address.textContent = "Where: " + event._embedded.venues[0].name;
    var startDate = $liElements[1];
    startDate.textContent = "When: " + event.dates.start.localDate;
    var $website = this.modals.eventModal.find("a");
    $website.attr("href", event.url)
  }

  showBreweryModal(id, breweryName) {
    this.modals.breweriesModal.removeClass("d-none");
    console.log(id, breweryName);
    var $h4Element = this.modals.breweriesModal.find("h4");
    $h4Element.text(breweryName);
    // var $liElements = this.modals.breweriesModal.find("li");
    // var address = $liElements[0];
    // address.textContent = "Where: " + event._embedded.venues[0].name;
    // var startDate = $liElements[1];
    // startDate.textContent = "When: " + event.dates.start.localDate;
    // var $website = this.modals.eventModal.find("a");
    // $website.attr("href", event.url)
  }
}
