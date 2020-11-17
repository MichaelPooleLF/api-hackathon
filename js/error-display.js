class ErrorDisplay {
  constructor(errorPage, serverError, backButton) {
    this.errorPage = errorPage;
    this.serverError = serverError;
    this.backButton = backButton;
    this.handleBackButton = this.handleBackButton.bind(this);
    this.errorPage.on("click", this.handleBackButton);
    this.serverError.on("click", this.handleBackButton);
  }

  onClick(showPage1) {
    this.showPage1 = showPage1;
  }

  showError(type) {
    if (type === "server") {
      this.serverError.removeClass("d-none");
    } else if (type === "user") {
      this.errorPage.removeClass("d-none");
    }
  }

  handleBackButton(event) {
    var currentTarget = event.currentTarget;
    if (!currentTarget.classList.contains("d-none")) {
      currentTarget.classList.add("d-none");
    }
    this.showPage1();
  }
}
