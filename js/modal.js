class Modal {
  constructor(display, button) {
    this.display = display;
    this.button = button;
    this.hideModal = this.hideModal.bind(this);
    this.button.on("click", this.hideModal);
    this.populateModal = this.populateModal.bind(this);
  }

  showModal() {
    this.display.removeClass("d-none");
  }

  hideModal() {
    this.display.addClass("d-none");
  }

  populateModal(id, name) {
    var modalData = [];
    var $h4Element = this.display.find("h4");
    var $liElements = this.display.find("li");
    var liOne = $liElements[0];
    var liTwo = $liElements[1];
    var $website = this.display.find("a");

    this.showModal();

    if (this.eventsCache) {
      for (var e = 0; e < this.eventsCache.length; e++) {
        if (this.eventsCache[e].id === id) {
          modalData[0] = this.eventsCache[e]._embedded.venues[0].name;
          modalData[1] = this.eventsCache[e].dates.start.localDate;
          modalData[2] = this.eventsCache[e].url;
        }
      }
    } else if (this.brewCache) {
      for (var b = 0; b < this.brewCache.length; b++) {
        if (this.brewCache[b].id === parseInt(id)) {
          modalData[0] = this.brewCache[b].street;
          modalData[1] = this.brewCache[b].brewery_type;
          modalData[2] = this.brewCache[b].website_url;
        }
      }
    }

    $h4Element.text(name);
    liOne.textContent = "Where: " + modalData[0];
    liTwo.textContent = "When: " + modalData[1];
    $website.attr("href", modalData[2]);
  }
}
