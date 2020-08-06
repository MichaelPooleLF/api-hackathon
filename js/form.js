class Form {
  constructor(formElement, page1Element) {
    this.formElement = formElement;
    this.page1Element = page1Element;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.on("submit", this.handleSubmit);
  }

  onSubmit(showPage2, getEventData, getBreweryData) {
    this.showPage2 = showPage2;
    this.getEventData = getEventData;
    this.getBreweryData = getBreweryData;
  }

  handleSubmit(event){
    event.preventDefault();

    var formData = new FormData(event.target);
    this.city = formData.get("city");
    this.stateCode = formData.get("stateCode");

    this.page1Element.addClass("d-none");
    this.showPage2();
    this.getEventData(this.city, this.stateCode);
    this.getBreweryData(this.city, this.stateCode);
  }

  // handleHomeClick()
}
