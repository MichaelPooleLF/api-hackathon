class Display {
  constructor(headerElement, eventsTable, breweryTable, page2Element,
    eventsTableTitle, breweryTableTitle) {
    this.headerElement = headerElement;
    this.eventsTable = eventsTable;
    this.breweryTable = breweryTable;
    this.page2Element = page2Element;
    this.eventsTableTitle = eventsTableTitle;
    this.breweryTableTitle = breweryTableTitle;
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
    this.getEvent(event.target.getAttribute("id"));
  }

  updateBreweryTable(breweries) {
    const length = (() => {
      if (breweries.length > 3) {
        return 3;
      } else {
        return breweries.length;
      }
    })();
    console.log(length);
    for (var i = 0; i < length; i++) {
      console.log(breweries);
      var breweryName = breweries[i].name;
      var $td = $("<td>", { text:breweryName, id:breweries[i].id})
      var $tr = $("<tr>");
      this.breweryTable.append($tr.append($td));
    }
  }

  handleBreweryTableClick(event) {
    var breweryId = event.target.getAttribute("id")
    var breweryName = event.target.textContent;
    this.showBreweryModal(breweryId, breweryName);
  }
}
