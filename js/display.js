class Display {
  constructor(headerElement, eventsTable, breweryTable, page2Element, homeButton) {
    this.headerElement = headerElement;
    this.eventsTable = eventsTable;
    this.breweryTable = breweryTable;
    this.page2Element = page2Element;
    this.homeButton = homeButton;
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
    this.homeButton.on("click", this.handleHomeButtonClick);
  }

  onClick(showPage1) {
    this.showPage1 = showPage1;
  }

  showTables() {
    this.page2Element.removeClass("d-none");
  }

  updateP2Text(city, stateCode) {
    this.headerElement.text(city + ", " + stateCode);
    this.eventsTable.title.text("Local Events");
    this.breweryTable.title.text("Local Breweries");
  }

  handleHomeButtonClick(event) {
    this.page2Element.addClass("d-none");
    this.showPage1();
  }
}
