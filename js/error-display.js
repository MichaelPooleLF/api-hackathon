class ErrorDisplay {
  constructor(errorPage, serverError, backButton) {
    this.errorPage = errorPage;
    this.serverError = serverError;
    this.backButton = backButton;
    this.handleBackButton = this.handleBackButton.bind(this);
    this.backButton.on("click", this.handleBackButton);
  }

  onClick(showPage1) {
    this.showPage1 = showPage1;
  }

  handleBackButton(event) {
    if (!this.errorPage.hasClass("d-none")) {
      this.errorPage.addClass("d-none");
    }
    if (!this.serverError.hasClass("d-none")) {
      this.serverError.addClass("d-none");
    }
    this.showPage1();
  }
}
