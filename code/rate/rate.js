var dragItem = document.querySelector(".range__thumb");
var container = document.querySelector("body");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === dragItem) {
    active = true;
    console.log("im draggin element");
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
  if (active) {
    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
  }
}
var w = window.innerHeight;

function setTranslate(xPos, yPos, el) {
  //   el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  el.style.transform = "translateY(" + yPos + "px)";
  var tamere = yPos + "px";
  document.querySelector(".range__fill").style.height =
    "calc(69vh - " + tamere + ")";

  var rectH = document.querySelector(".range__fill").offsetHeight;
  var rate = (rectH * 100) / w;
  console.log(rate);

  switch (true) {
    case rate <= 10:
      console.log("RATE 1 !");
      break;
    case 10 < rate && rate <= 20:
      console.log("RATE 2 !");
      break;
    case 20 < rate && rate <= 30:
      console.log("RATE 3 !");
      break;
    case 40 < rate && rate <= 50:
      console.log("RATE 4 !");
      break;
    case 50 < rate && rate <= 60:
      console.log("RATE 5 !");
      break;
    case 60 < rate && rate <= 70:
      console.log("RATE 6 !");
      break;
    case 70 < rate && rate <= 80:
      console.log("RATE 7 !");
      break;
    case 80 < rate && rate <= 90:
      console.log("RATE 8 !");
      break;
    case 90 < rate && rate < 100:
      console.log("RATE 9 !");
      break;
    case 100 == rate:
      console.log("RATE 10 !");
      break;
    default:
      break;
  }
}
