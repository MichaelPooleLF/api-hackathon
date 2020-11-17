class Table {
  constructor(title, display) {
    this.title = title;
    this.display = display;
    this.handleTableClick = this.handleTableClick.bind(this);
    this.display.on("click", this.handleTableClick);
    this.toggleHandleClick = this.toggleHandleClick.bind(this);
  }

  onClick(showModal) {
    this.showModal = showModal;
  }

  handleTableClick(event) {
    var eventId = event.target.getAttribute("id");
    var eventName = event.target.textContent;
    this.showModal(eventId, eventName);
  }

  toggleHandleClick(status) {
    if (status === "off") {
      this.display.off("click", this.handleTableClick);
    } else if (status === "on") {
      this.display.on("click", this.handleTableClick)
    }
  }
}
