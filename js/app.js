class App {
  constructor(form, display){
    this.form = form;
    this.display = display
    this.findBrewery = this.findBrewery.bind(this);
    this.updateP2Header = this.updateP2Header.bind(this);
  }

  start(){
    this.getBreweryData();
    this.getEventData();
    this.form.onSubmit(this.updateP2Header);
  }

  getBreweryData(){
    var get1 = $.ajax({
      method: "GET",
      url: "https://api.openbrewerydb.org/breweries?by_city=sacramento&by_state=california",
      error: console.log,
      success: this.findBrewery
    });
  }

  findBrewery(data) {
    console.log("breweries:", data);
  }

  getEventData() {
    var get2 = $.ajax({
      method: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=AL&sort=date,asc&apikey=g8k9ENDeCGfdNGKiIo89wTNGIwGEMYIv",
      error: console.log,
      success: console.log
    })
  }

  updateP2Header(city, stateCode) {
    this.display.page2Element.removeClass("d-none");
    this.display.headerElement.text(city + ", " + stateCode);
  }
}
