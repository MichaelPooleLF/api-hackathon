class Display {
  constructor(headerElement, eventsTable, breweryTable, page2Element) {
    this.headerElement = headerElement;
    this.eventsTable = eventsTable;
    this.breweryTable = breweryTable;
    this.page2Element = page2Element;
    this.handleEventTableClick = this.handleEventTableClick.bind(this);
    this.eventsTable.on("click", this.handleEventTableClick);
    this.breweryTable.on("click", this.handleBreweryTableClick);
  }

  onClick(showEventsModal, getEvent) {
    this.showEventsModal = showEventsModal;
    this.getEvent = getEvent;
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
    // this.showEventsModal();
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
  }
}
