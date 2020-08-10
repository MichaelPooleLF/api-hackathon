class Iframe {
  constructor(iframe, iframeClose) {
    this.iframe = iframe;
    this.hideIframe = this.hideIframe.bind(this);
    this.handleIframeClose = this.handleIframeClose.bind(this);
    this.iframe.on("click", this.handleIframeClose);
  }

  onClick(showEventsModal, showBreweryModal) {
    this.showEventsModal = showEventsModal;
    this.showBreweryModal = showBreweryModal;
  }

  hideIframe() {
    this.iframe.addClass("d-none");
  }

  handleIframeClose() {
    if (this.currentModal === "brewery-link") {
      this.hideIframe();
      this.showBreweryModal();
    } else if (this.currentModal === "event-link") {
      this.hideIframe();
      this.showEventsModal();
    }
  }
}
