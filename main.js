function hideShowText(elem) {
    console.log(document.getElementById(elem).style.cssText);
    if (document.getElementById(elem).style.cssText == "color: rgb(255, 255, 255);") {
        document.getElementById(elem).style.cssText = "color: rgb(102, 102, 102);";
    } else {
        document.getElementById(elem).style.cssText = "color: rgb(255, 255, 255);";
    }
}

var elems = [];
for (var i = 1; i < 10; i++) {
    elems.push("item" + i.toString());
    console.log("item" + i.toString());
    document.getElementById(elems[i - 1]).addEventListener("click", hideShowText.bind(this, elems[i-1]), false);
}