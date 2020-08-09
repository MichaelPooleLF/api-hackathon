class ErrorDisplay {
  constructor(errorPage, backButton) {
    this.errorPage = errorPage;
    this.backButton = backButton;
    this.handleBackButton = this.handleBackButton.bind(this);
    this.backButton.on("click", this.handleBackButton);
  }

  onClick(showPage1) {
    this.showPage1 = showPage1;
  }

  handleBackButton(event) {
    this.errorPage.addClass("d-none");
    this.showPage1();
  }
}
