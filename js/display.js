class Display {
  constructor(headerElement, eventsTable, breweryTable, page2Element) {
    this.headerElement = headerElement;
    this.eventsTable = eventsTable;
    this.breweryTable = breweryTable;
    this.page2Element = page2Element;
  }

  updateEventsTable(events) {
    console.log("Events",events);
    var namesArray = [];
    for (var i = 0; namesArray.length < 3; i++) {
      var eventName = events[i].name;
      if (namesArray.indexOf(eventName) === -1) {
        namesArray.push(eventName);
        var $td = $("<td>", {text:eventName})
        var $tr = $("<tr>");
        this.eventsTable.append($tr.append($td));
      }
    }
  }

  updateBreweryTable(breweries) {
    console.log("Breweries:", breweries);
    for (var i = 0; i < 3; i++) {
      var breweryName = breweries[i].name;
      var $td = $("<td>", { text:breweryName })
      var $tr = $("<tr>");
      this.breweryTable.append($tr.append($td));
    }
  }
}
