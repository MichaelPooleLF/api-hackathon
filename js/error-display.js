class ErrorDisplay {
  constructor(errorPage, serverError, backButton) {
    this.errorPage = errorPage;
    this.serverError = serverError;
    this.backButton = backButton;
    this.handleBackButton = this.handleBackButton.bind(this);
    this.errorPage.on("click", this.handleBackButton);
    this.serverError.on("click", this.handleBackButton);
  }

  onClick(showHomePage) {
    this.showHomePage = showHomePage;
  }

  showError(type) {
    if (type === "server") {
      this.serverError.removeClass("d-none");
    } else if (type === "user") {
      this.errorPage.removeClass("d-none");
    }
  }

  handleBackButton(event) {
    const currentTarget = event.currentTarget;
    if (!currentTarget.classList.contains("d-none")) {
      currentTarget.classList.add("d-none");
    }
    this.showHomePage();
  }
}
