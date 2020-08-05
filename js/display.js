class Display {
  constructor(headerElement, eventsTable, breweryTable, page2Element) {
    this.headerElement = headerElement;
    this.eventsTable = eventsTable;
    this.breweryTable = breweryTable;
    this.page2Element = page2Element;
  }

  updateEventsTable(eventName) {
    console.log(eventName);
    var $td = $("<td>", {text:eventName})
    var $tr = $("<tr>");
    this.eventsTable.append($tr.append($td));
  }
}
