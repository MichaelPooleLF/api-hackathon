class Modal {
  constructor(display, button) {
    this.display = display;
    this.button = button;
    this.hideModal = this.hideModal.bind(this);
    this.button.on("click", this.hideModal);
  }

  hideModal() {
    this.display.addClass("d-none");
  }
}
