class Display {
  constructor(headerElement, eventsTable, breweryTable, page2Element,
    eventsTableTitle, breweryTableTitle, homeButton, loadingScreen) {
    this.headerElement = headerElement;
    this.eventsTable = eventsTable;
    this.breweryTable = breweryTable;
    this.page2Element = page2Element;
    this.eventsTableTitle = eventsTableTitle;
    this.breweryTableTitle = breweryTableTitle;
    this.homeButton = homeButton;
    this.loadingScreen = loadingScreen;
    this.handleEventTableClick = this.handleEventTableClick.bind(this);
    this.eventsTable.on("click", this.handleEventTableClick);
    this.handleBreweryTableClick = this.handleBreweryTableClick.bind(this);
    this.breweryTable.on("click", this.handleBreweryTableClick);
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
    this.homeButton.on("click", this.handleHomeButtonClick);
  }

  onClick(showBreweryModal, showEventsModal, showPage1) {
    this.showBreweryModal = showBreweryModal;
    this.showEventsModal = showEventsModal;
    this.showPage1 = showPage1;
  }

  updateEventsTable(events) {
    this.eventsTable.empty();
    if(!events) {
      var $td = $("<td>", { text: "No Events Found"})
      var $tr = $("<tr>");
      this.eventsTable.append($tr.append($td));
      this.eventsTable.off("click", this.handleEventTableClick);
      return;
    }
    this.eventsTable.on("click", this.handleEventTableClick);
    const length = (() => {
      if (events.length > 3) {
        return 3;
      } else {
        return events.length;
      }
    })();
    var namesArray = [];
    for (var i = 0; namesArray.length < length; i++) {
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
    var eventId = event.target.getAttribute("id");
    var eventName = event.target.textContent;
    this.showEventsModal(eventId, eventName);
  }

  updateBreweryTable(breweries) {
    this.breweryTable.empty();
    const length = (() => {
      if (breweries.length > 3) {
        return 3;
      } else {
        return breweries.length;
      }
    })();
    for (var i = 0; i < length; i++) {
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

  handleHomeButtonClick(event) {
    this.page2Element.addClass("d-none");
    this.showPage1();
  }
}
