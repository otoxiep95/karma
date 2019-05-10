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

///////////////////////////////////////////////////////////////////
//////////////////====== RATING START ========= ///////////////////
///////////////////////////////////////////////////////////////////

// FIX VALUE - responsive
var w = window.innerHeight;
var containerHeight = document.querySelector(".range__thumb__container")
  .offsetHeight;
var marginBottomHeight = (w - containerHeight) / 2;

console.log("margin bottom is:" + marginBottomHeight);

var scaleLevels = containerHeight / 11;

var level0 = marginBottomHeight;
var level1 = level0 + scaleLevels;
var level2 = level1 + scaleLevels;
var level3 = level2 + scaleLevels;
var level4 = level3 + scaleLevels;
var level5 = level4 + scaleLevels;
var level6 = level5 + scaleLevels;
var level7 = level6 + scaleLevels;
var level8 = level7 + scaleLevels;
var level9 = level8 + scaleLevels;
var level10 = level9 + scaleLevels;
var level11 = level10 + scaleLevels;

function setTranslate(xPos, yPos, el) {
  // moving value of our rating rectangle
  var rect_rate_H = document.querySelector(".range__fill").offsetHeight;
  console.log("height of rating rect is:" + rect_rate_H);

  if (yPos > 0) {
    // yPos is positive
    // if you touch the bottom line
    if (yPos >= containerHeight / 2) {
      yPos = containerHeight / 2;
    }
  }

  if (yPos <= 0) {
    // yPos is negative
    // if you touch the top line
    if (yPos <= -(containerHeight / 2)) {
      yPos = (containerHeight / 2) * -1;
    }
  }

  // dragging thing + rectangle height changing
  el.style.transform = "translateY(" + yPos + "px)";
  var yPosPixel = yPos + "px";
  document.querySelector(".range__fill").style.height =
    "calc(50vh - " + yPosPixel + ")";

  console.log("yPos is:" + yPos);

  // return the rate
  switch (true) {
    case rect_rate_H < level1:
      console.log("RATE 0 !");
      break;
    case level1 <= rect_rate_H && rect_rate_H < level2:
      console.log("RATE 1 !");
      break;
    case level2 <= rect_rate_H && rect_rate_H < level3:
      console.log("RATE 2 !");
      break;
    case level3 <= rect_rate_H && rect_rate_H < level4:
      console.log("RATE 3 !");
      break;
    case level4 <= rect_rate_H && rect_rate_H < level5:
      console.log("RATE 4 !");
      break;
    case level5 <= rect_rate_H && rect_rate_H < level6:
      console.log("RATE 5 !");
      break;
    case level6 <= rect_rate_H && rect_rate_H < level7:
      console.log("RATE 6 !");
      break;
    case level7 <= rect_rate_H && rect_rate_H < level8:
      console.log("RATE 7 !");
      break;
    case level8 <= rect_rate_H && rect_rate_H < level9:
      console.log("RATE 8 !");
      break;
    case level9 <= rect_rate_H && rect_rate_H < level10:
      console.log("RATE 9 !");
      break;
    case level10 <= rect_rate_H && rect_rate_H < level11:
      console.log("RATE 10 !");
      break;
    default:
      break;
  }
}
