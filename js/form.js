class Form {
  constructor(formElement, cityInput, stateInput, page1Element) {
    this.formElement = formElement;
    this.cityInput = cityInput;
    this.stateInput = stateInput;
    this.page1Element = page1Element;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.on("submit", this.handleSubmit);
  }

  onSubmit(updateP2Header) {
    this.updateP2Header = updateP2Header;
  }

  handleSubmit(event){
    event.preventDefault();
    var city = this.cityInput.val();
    var stateCode = this.stateInput.val();
    this.page1Element.addClass("d-none");
    this.updateP2Header(city, stateCode);
  }
}
