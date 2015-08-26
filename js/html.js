renderCard = function(card) {
    var style = [];
    style.push("color:" + COLORS[card.color] + ";");
    style.push("font-family:" + FILLS[card.fill] + ";");
    style.push("font-size:36px;");
    style.push("text-align:center;");

    if (card.active)
        style.push("background:yellow;");

    var ch = SHAPES[card.shape];
    var str = "";
    for (var i = 0; i < card.num; i++)
        str += ch;

    var s = document.createTextNode(str);
    var c = document.createElement("div");
    c.setAttribute("style", style.join(""));
    c.appendChild(s);
    return c;
};

renderCards = function(cards) {
    var wrapper = document.createElement("div");
    var table   = document.createElement("table");
    table.setAttribute("border", "1px solid black");

    var len = cards.length;

    var row = document.createElement("tr");
    for (var i = 0; i < len; i++) {
        var cell = document.createElement("td");
        cell.appendChild(renderCard(cards[i]));
        cell.setAttribute("style", "width:100px");
        cell.setAttribute("onclick", "selectCard(" + i + ")");
        row.appendChild(cell);

        if (i % 3 == 2) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }

    wrapper.appendChild(table);

    var g = document.querySelector(".grid");

    while (g.firstChild)
        g.removeChild(g.firstChild);

    g.appendChild(wrapper);
};
