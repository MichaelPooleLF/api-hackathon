class TableTest {
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

  handleTableClick(data) {
    var dataId = event.target.getAttribute("id");
    var dataName = event.target.textContent;
    var dataType = event.target.className;
    this.populateModal(dataId, dataName, dataType);
  }

  toggleHandleClick(status) {
    if (status === "off") {
      this.display.off("click", this.handleTableClick);
    } else if (status === "on") {
      this.display.on("click", this.handleTableClick)
    }
  }

  updateTable(data, header, dataType) {
    console.log(data);
    console.log(header);
    this.display.empty();
    if (!data) {
      var $emptyTD = $("<td>", { text: "No Events Found", colspan: "3" })
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

    var $tableHeadRow = $("<tr>", {class: "white text-center"});
    var $thOne = $("<th>", { text: header[0] }, class: "");
    var $thTwo = $("<th>", { text: header[1] });
    var $thThree = $("<th>", { text: header[2] });
    this.display.append($tableHeadRow.append($thOne).append($thTwo).append($thThree));

    for (var i = 0; i < length; i++) {
      var $tr = $("<tr>", {id: data[i].id, class: dataType});
      var $tdOne = $("<td>", { text: data[i].tdOne });
      var $tdTwo = $("<td>", { text: data[i].tdTwo });
      var $tdThree = $("<td>");
      var $website = $("<a>", {text: data[i].tdThree.text, href: data[i].tdThree.url, target: "_blank"});
      $tdThree.append($website);
      this.display.append($tr.append($tdOne).append($tdTwo).append($tdThree));
    }
  }
}
