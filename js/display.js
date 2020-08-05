class Display {
  constructor(headerElement, eventsTable, breweryTable, page2Element) {
    this.headerElement = headerElement;
    this.eventsTable = eventsTable;
    this.breweryTable = breweryTable;
    this.page2Element = page2Element;
    this.handleEventTableClick = this.handleEventTableClick.bind(this);
    this.eventsTable.on("click", this.handleEventTableClick);
    this.handleBreweryTableClick = this.handleBreweryTableClick.bind(this);
    this.breweryTable.on("click", this.handleBreweryTableClick);
  }

  onClick(getEvent, showBreweryModal) {
    this.getEvent = getEvent;
    this.showBreweryModal = showBreweryModal;
  }

  updateEventsTable(events) {
    console.log("Events",events);
    var namesArray = [];
    for (var i = 0; namesArray.length < 3; i++) {
      var eventName = events[i].name;
      if (namesArray.indexOf(eventName) === -1) {
        namesArray.push(eventName);
        var $td = $("<td>", {text:eventName, id:events[i].id})
        var $tr = $("<tr>");
        this.eventsTable.append($tr.append($td));
      }
    }
  }

  handleEventTableClick(event) {
    console.log("events Table", event.target);
    this.getEvent(event.target.getAttribute("id"));
  }

  updateBreweryTable(breweries) {
    console.log("Breweries:", breweries);
    for (var i = 0; i < 3; i++) {
      var breweryName = breweries[i].name;
      var $td = $("<td>", { text:breweryName, id:breweries[i].id})
      var $tr = $("<tr>");
      this.breweryTable.append($tr.append($td));
    }
  }

  handleBreweryTableClick(event) {
    console.log(event.target);
    var id = event.target.getAttribute("id")
    var breweryName = event.target.textContent;
    this.showBreweryModal(id, breweryName);
  }
}
