class Form {
  constructor(formElement, page1Element) {
    this.formElement = formElement;
    this.page1Element = page1Element;
    this.showHomePage = this.showHomePage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.on("submit", this.handleSubmit);
  }

  onSubmit(getEventData, getBreweryData) {
    this.getEventData = getEventData;
    this.getBreweryData = getBreweryData;
  }

  showHomePage() {
    this.page1Element.removeClass("d-none");

    const city = this.formElement.find("#city");
    const state = this.formElement.find("#stateCode")

    city.val("");
    state.val("AL");
  }

  handleSubmit(event){
    event.preventDefault();

    const formData = new FormData(event.target);

    this.city = formData.get("city");
    this.stateCode = formData.get("stateCode");

    this.page1Element.addClass("d-none");
    this.getEventData(this.city, this.stateCode);
    this.getBreweryData(this.city, this.stateCode);
  }
}
