"use strict";
let urlParams = new URLSearchParams(window.location.search);
let screenFlag = urlParams.get("interaction");
let messageFlag = urlParams.get("message");
const letsGo = document.querySelector(".launching__button-link");
const closeMenuModalButton = document.querySelector(".menu-modal__close");
const menuMain = document.querySelector(".menu-main");
const menuModal = document.querySelector(".menu-modal");
const launchingScreen = document.querySelector(".launching");
const aboutScreen = document.querySelector(".about-main");
const burguerAbout = document.querySelector(".burguer__about--mobile");
const contactScreen = document.querySelector(".contact-page");
const contactBusinessScreen = document.querySelector("#contact2");
const warningScreen = document.querySelector(".project-warning");
window.addEventListener("DOMContentLoaded", initIndex);

function initIndex() {
  letsGo.addEventListener("click", openMainMenu);
  closeMenuModalButton.addEventListener("click", closeMenuModal);
  if (messageFlag === "no") {
    clearWarning();
  }
  if (screenFlag === "menu") {
    openMainMenu();
    clearWarning();
  }
  if (screenFlag === "about") {
    clearWarning();
    openAbout();
  } else {
    if (screen.width < 600) {
      contactScreen.style.display = "none";
      contactBusinessScreen.style.display = "none";
    }
  }
  setTimeout(clearWarning, 3500);
}
function clearWarning() {
  warningScreen.classList.add("none");
}

function openMainMenu() {
  if (screen.width < 600) {
    console.log("open menuMain");
    menuMain.style.display = "grid";
  } else {
    menuModal.classList.remove("none");
  }
}
function closeMenuModal() {
  menuModal.classList.add("none");
}

function openAbout() {
  if (screen.width < 600) {
    launchingScreen.style.display = "none";
    document.querySelector(".menu-bottom").classList.remove("none");
    // burguerAbout.addEventListener("click", e => {
    //   openMainMenu();
    // });
  }
  contactScreen.style.display = "grid";
  aboutScreen.style.display = "grid";
}
