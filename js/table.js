class Table {
  constructor(title, display) {
    this.title = title;
    this.display = display;
    this.handleTableClick = this.handleTableClick.bind(this);
    this.display.on("click", this.handleTableClick);
    this.toggleHandleClick = this.toggleHandleClick.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }

  onClick(populateModal) {
    this.populateModal = populateModal;
  }

  handleTableClick(event) {
    var eventId = event.target.getAttribute("id");
    var eventName = event.target.textContent;
    this.populateModal(eventId, eventName);
  }

  toggleHandleClick(status) {
    if (status === "off") {
      this.display.off("click", this.handleTableClick);
    } else if (status === "on") {
      this.display.on("click", this.handleTableClick)
    }
  }

  updateTable(data) {
    this.display.empty();
    if (!data) {
      var $emptyTD = $("<td>", { text: "No Events Found" })
      var $emptyTR = $("<tr>");
      this.display.append($emptyTR.append($emptyTD));
      this.toggleHandleClick("off");
      return;
    }

    this.toggleHandleClick("on");

    var length = null;

    if (data.length > 3) {
      length = 3;
    } else {
      length = data.length;
    }

    var namesArray = [];

    for (var i = 0; data[i] && namesArray.length < length; i++) {
      var name = data[i].name;
      if (namesArray.indexOf(name) === -1) {
        namesArray.push(name);
        var $td = $("<td>", { text: name, id: data[i].id })
        var $tr = $("<tr>");
        this.display.append($tr.append($td));
      }
    }
  }
}
