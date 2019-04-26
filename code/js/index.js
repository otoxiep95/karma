"use strict";

let letsGo = document.querySelector(".launching__button-link");
let menuMain = document.querySelector(".menu-main");

window.addEventListener("DOMContentLoaded", init);

function init() {
  letsGo.addEventListener("click", openMainMenu);
}

function openMainMenu() {
  console.log("open menuMain");
  menuMain.style.display = "grid";
}
