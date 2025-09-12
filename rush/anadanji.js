var item = document.getElementById("discord");
item.addEventListener("mouseover", dc1, false);
item.addEventListener("mouseout", dc2, false);
var c2cp = true;

function hamburger() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function copy() {
  navigator.clipboard.writeText("danji2203");
  c2cp = false;
  item.innerHTML = "Copied";
  setTimeout(function () { c2cp = true; }, 5000);
}

function dc1() {
  if (c2cp == false) {
    return;
  }
  else if (c2cp == true) {
    item.innerHTML = "Click to copy";
  }
}

function dc2() {
  item.innerHTML = ": danji2203";
}