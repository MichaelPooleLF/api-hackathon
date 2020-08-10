class App {
  constructor(form, display, modals, errorDisplay, iframe){
    this.form = form;
    this.display = display
    this.modals = modals;
    this.errorDisplay = errorDisplay;
    this.iframe = iframe;
    this.showPage1 = this.showPage1.bind(this);
    this.showPage2 = this.showPage2.bind(this);
    this.updateP2Text = this.updateP2Text.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.handleGetEventsDataSuccess = this.handleGetEventsDataSuccess.bind(this);
    this.getBreweryData = this.getBreweryData.bind(this);
    this.handleGetBreweryDataSuccess = this.handleGetBreweryDataSuccess.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.populateEventsModal = this.populateEventsModal.bind(this);
    this.populateBreweryModal = this.populateBreweryModal.bind(this);
    this.showEventsModal = this.showEventsModal.bind(this);
    this.showBreweryModal = this.showBreweryModal.bind(this);
  }

  start(){
    this.form.onSubmit(this.showPage2, this.getEventData, this.getBreweryData);
    this.display.onClick(this.getEvent, this.populateBreweryModal, this.showPage1);
    this.errorDisplay.onClick(this.showPage1);
  }

  showPage1() {
    this.form.page1Element.removeClass("d-none");
    var city = this.form.formElement.find("#city");
    var state = this.form.formElement.find("#stateCode")
    city.val("");
    state.val("AL");
  }

  showPage2() {
    this.display.page2Element.removeClass("d-none");
  }

  updateP2Text(city, stateCode) {
    this.display.headerElement.text(city + ", " + stateCode);
    this.display.eventsTableTitle.text("Local Events");
    this.display.breweryTableTitle.text("Local Breweries");
  }

  getBreweryData(city, stateCode){
    var stateName = "";
    for (var property in stateCodes) {
      if (stateCode === stateCodes[property].abbreviation) {
        stateName += stateCodes[property].name;
      }
    }
    $.ajax({
      method: "GET",
      url: "https://api.openbrewerydb.org/breweries?by_city=" + city +
      "&by_state=" + stateName,
      error: console.log,
      success: this.handleGetBreweryDataSuccess
    });
  }

  handleGetBreweryDataSuccess(breweriesArray) {
    if(breweriesArray.length === 0) {
      this.errorDisplay.errorPage.removeClass("d-none")
      return;
    }
    this.showPage2();
    this.breweryCache = breweriesArray;
    this.display.updateBreweryTable(breweriesArray);
    this.updateP2Text(this.form.city, this.form.stateCode)
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
    }
    this.display.updateEventsTable(events);
  }

  getEvent(id) {
    var apikey = "apikey=g8k9ENDeCGfdNGKiIo89wTNGIwGEMYIv";
    $.ajax({
      method: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?id=" +
      id + "&" + apikey,
      error: console.log,
      success: this.populateEventsModal
    })
  }

  showEventsModal() {
    this.modals.eventModal.removeClass("d-none");
  }

  populateEventsModal(data) {
    var event = data._embedded.events[0];
    var $h4Element = this.modals.eventModal.find("h4");
    var $liElements = this.modals.eventModal.find("li");
    var address = $liElements[0];
    var startDate = $liElements[1];
    var $website = this.modals.eventModal.find("a");

    this.showEventsModal();
    $h4Element.text(event.name);
    address.textContent = "Where: " + event._embedded.venues[0].name;
    startDate.textContent = "When: " + event.dates.start.localDate;
    $website.attr("href", event.url);
  }

  showBreweryModal() {
    this.modals.breweriesModal.removeClass("d-none");
  }

  populateBreweryModal(breweryId, breweryName) {
    var cachedAddress = "";
    var cachedType = "";
    var cachedWebsite = "";
    var $h4Element = this.modals.breweriesModal.find("h4");
    var $liElements = this.modals.breweriesModal.find("li");
    var address = $liElements[0];
    var type = $liElements[1];
    var $website = this.modals.breweriesModal.find("a");

    this.showBreweryModal();
    for (var i = 0; i < this.breweryCache.length; i++) {
      if (this.breweryCache[i].id === parseInt(breweryId)) {
        cachedAddress = this.breweryCache[i].street;
        cachedType = this.breweryCache[i].brewery_type;
        cachedWebsite = this.breweryCache[i].website_url;
      }
    }
    $h4Element.text(breweryName);
    address.textContent = "Where: " + cachedAddress;
    type.textContent = "Brewery Type: " + cachedType;
    $website.attr("href", cachedWebsite);
  }
}
