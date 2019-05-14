"use strict";
let urlParams = new URLSearchParams(window.location.search);
let screenFlag = urlParams.get("interaction");
const letsGo = document.querySelector(".launching__button-link");
const menuMain = document.querySelector(".menu-main");
const launchingScreen = document.querySelector(".launching");
const aboutScreen = document.querySelector(".about-main");
window.addEventListener("DOMContentLoaded", initIndex);

function initIndex() {
  letsGo.addEventListener("click", openMainMenu);
  if (screenFlag === "menu") {
    openMainMenu();
  }
  if (screenFlag === "about") {
    openAbout();
  }
}

function openMainMenu() {
  console.log("open menuMain");
  menuMain.style.display = "grid";
}

function openAbout() {
  if (screen.width < 600) {
    launchingScreen.style.display = "none";
  }

  aboutScreen.style.display = "grid";
}
