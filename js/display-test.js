class DisplayTest {
  constructor(headerElement, eventsTable, breweryTable, page2Element, homeButton, loadingScreen) {
    this.headerElement = headerElement;
    this.eventsTable = eventsTable;
    this.breweryTable = breweryTable;
    this.page2Element = page2Element;
    this.homeButton = homeButton;
    this.loadingScreen = loadingScreen;
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
    this.homeButton.on("click", this.handleHomeButtonClick);
  }

  onClick(showPage1) {
    this.showPage1 = showPage1;
  }

  handleHomeButtonClick(event) {
    this.page2Element.addClass("d-none");
    this.showPage1();
  }
}
