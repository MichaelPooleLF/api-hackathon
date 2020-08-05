class Form {
  constructor(formElement, cityInput, stateInput, page1Element) {
    this.formElement = formElement;
    this.cityInput = cityInput;
    this.stateInput = stateInput;
    this.page1Element = page1Element;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.on("submit", this.handleSubmit);
  }

  onSubmit(updatep2Header, getEventData) {
    this.updatep2Header = updatep2Header;
    this.getEventData = getEventData;
  }

  handleSubmit(event){
    event.preventDefault();
    var city = this.cityInput.val();
    var stateCode = this.stateInput.val();
    this.page1Element.addClass("d-none");
    this.updatep2Header(city, stateCode);
    this.getEventData(city, stateCode);


  }
}
