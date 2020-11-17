class App {
  constructor(form, display, modals, errorDisplay){
    this.form = form;
    this.display = display
    this.modals = modals;
    this.errorDisplay = errorDisplay;
    this.showPage1 = this.showPage1.bind(this);
    this.showPage2 = this.showPage2.bind(this);
    this.showError = this.showError.bind(this);
    this.updateP2Text = this.updateP2Text.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.handleGetEventsDataSuccess = this.handleGetEventsDataSuccess.bind(this);
    this.getBreweryData = this.getBreweryData.bind(this);
    this.handleGetBreweryDataSuccess = this.handleGetBreweryDataSuccess.bind(this);
    this.populateEventsModal = this.populateEventsModal.bind(this);
    this.populateBreweryModal = this.populateBreweryModal.bind(this);
  }

  start(){
    this.form.onSubmit(this.showPage2, this.getEventData, this.getBreweryData);
    this.display.eventsTable.onClick(this.modals.eventModal.populateModal);
    this.display.breweryTable.onClick(this.modals.breweriesModal.populateModal);
    this.display.onClick(this.showPage1);
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

  showError() {
    this.display.loadingScreen.addClass("d-none");
    this.errorDisplay.serverError.removeClass("d-none");
  }

  updateP2Text(city, stateCode) {
    this.display.headerElement.text(city + ", " + stateCode);
    this.display.eventsTable.title.text("Local Events");
    this.display.breweryTable.title.text("Local Breweries");
  }

  getBreweryData(city, stateCode){
    var stateName = "";
    for (var property in stateCodes) {
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
    this.showPage2();
    this.breweryCache = breweriesArray;
    this.modals.breweriesModal.brewCache = breweriesArray;
    this.display.breweryTable.updateTable(breweriesArray);
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
      this.eventsCache = events;
      this.modals.eventModal.eventsCache = events;
    }
    this.display.eventsTable.updateTable(events);
  }

  populateEventsModal(eventId, eventName) {
    var cachedAddress = "";
    var cachedStartDate = "";
    var cachedWebsite = "";
    var $h4Element = this.modals.eventModal.display.find("h4");
    var $liElements = this.modals.eventModal.display.find("li");
    var address = $liElements[0];
    var startDate = $liElements[1];
    var $website = this.modals.eventModal.display.find("a");

    this.modals.eventModal.showModal();
    for (var i = 0; i < this.eventsCache.length; i++) {
      if (this.eventsCache[i].id === eventId) {
        cachedAddress = this.eventsCache[i]._embedded.venues[0].name;
        cachedStartDate = this.eventsCache[i].dates.start.localDate;
        cachedWebsite = this.eventsCache[i].url;
      }
    }

    $h4Element.text(eventName);
    address.textContent = "Where: " + cachedAddress;
    startDate.textContent = "When: " + cachedStartDate;
    $website.attr("href", cachedWebsite);
  }

  populateBreweryModal(breweryId, breweryName) {
    var cachedAddress = "";
    var cachedType = "";
    var cachedWebsite = "";
    var $h4Element = this.modals.breweriesModal.display.find("h4");
    var $liElements = this.modals.breweriesModal.display.find("li");
    var address = $liElements[0];
    var type = $liElements[1];
    var $website = this.modals.breweriesModal.display.find("a");

    this.modals.breweriesModal.showModal();
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
