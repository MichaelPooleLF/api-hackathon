class Modals {
  constructor(eventModal, eventModalButton, breweriesModal, breweriesModalButton) {
    this.eventModal = eventModal;
    this.eventModalButton = eventModalButton;
    this.hideEventModal = this.hideEventModal.bind(this);
    this.eventModalButton.on("click", this.hideEventModal);
    this.breweriesModal = breweriesModal;
    this.breweriesModalButton = breweriesModalButton;
    this.hideBreweriesModal = this.hideBreweriesModal.bind(this);
    this.breweriesModalButton.on("click", this.hideBreweriesModal);
  }

  hideEventModal() {
    this.eventModal.addClass("d-none");
  }

  hideBreweriesModal() {
    this.breweriesModal.addClass("d-none");
  }
}
