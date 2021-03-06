var dragItem = document.querySelector(".range__thumb");
var container = document.querySelector("body");
let rateFinal = 0;
let rangeKeyWord = document.querySelector(".range__keyword");

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
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;

  document.querySelector(".button-rate--next").classList.remove("blink");
  void document.querySelector(".button-rate--next").offsetWidth;
  document.querySelector(".button-rate--next").classList.add("blink");
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
var pageHeight = document.querySelector(".rate__page").offsetHeight;
var containerHeight = document.querySelector(".range__thumb__container")
  .offsetHeight;
var marginBottomHeight = (pageHeight - containerHeight) / 2;

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

  if (yPos > 0) {
    // yPos is positive
    document.querySelectorAll(".rate__shape").forEach(rateShape => {
      rateShape.style.fill = "#b24a42";
    });
    document.querySelector(".range__thumb").style.borderColor = "#ef8e86";
    rangeKeyWord.style.color = "#b24a42";
    // if you touch the bottom line
    if (yPos >= containerHeight / 2) {
      yPos = containerHeight / 2;
    }
  }

  if (yPos <= 0) {
    // yPos is negative
    document.querySelectorAll(".rate__shape").forEach(rateShape => {
      rateShape.style.fill = "#4F6D59";
      rangeKeyWord.style.color = "#4F6D59";
    });
    document.querySelector(".range__thumb").style.borderColor = "#9aafa2";
    rangeKeyWord.style.color = "#4F6D59";
    // if you touch the top line
    if (yPos <= -(containerHeight / 2)) {
      yPos = (containerHeight / 2) * -1;
    }
  }

  // dragging thing + rectangle height changing
  el.style.transform = "translateY(" + yPos + "px)";
  var yPosPixel = yPos + "px";
  document.querySelector(".range__fill").style.height =
    pageHeight / 2 - yPos + "px";

  // return the rate
  switch (true) {
    case rect_rate_H < level1:
      rangeKeyWord.textContent = "Very disapointing !";
      rateFinal = 0;
      break;
    case level1 <= rect_rate_H && rect_rate_H < level2:
      rangeKeyWord.textContent = "Not as expected !";
      rateFinal = 1;
      break;
    case level2 <= rect_rate_H && rect_rate_H < level3:
      rateFinal = 2;
      break;
    case level3 <= rect_rate_H && rect_rate_H < level4:
      rateFinal = 3;
      rangeKeyWord.textContent = "Not as expected !";
      break;
    case level4 <= rect_rate_H && rect_rate_H < level5:
      rateFinal = 4;
      rangeKeyWord.textContent = "Could be better !";
      break;
    case level5 <= rect_rate_H && rect_rate_H < level6:
      rangeKeyWord.textContent = "Could be better !";
      rateFinal = 5;
      break;
    case level6 <= rect_rate_H && rect_rate_H < level7:
      rateFinal = 6;
      rangeKeyWord.textContent = "Nice experience !";
      break;
    case level7 <= rect_rate_H && rect_rate_H < level8:
      rateFinal = 7;
      rangeKeyWord.textContent = "Nice experience !";
      break;
    case level8 <= rect_rate_H && rect_rate_H < level9:
      rateFinal = 8;
      rangeKeyWord.textContent = "Very Satisfied !";
      break;
    case level9 <= rect_rate_H && rect_rate_H < level10:
      rateFinal = 9;
      rangeKeyWord.textContent = "Very Satisfied !";
      break;
    case level10 <= rect_rate_H && rect_rate_H < level11:
      rateFinal = 10;
      rangeKeyWord.textContent = "Perfect !";
      break;
    default:
      break;
  }
}
