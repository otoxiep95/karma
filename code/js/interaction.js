"use strict";

let buttonFilter = document.querySelector(".button__filter");
let modalFilter = document.querySelector(".filter__modal");
let titleFilter = document.querySelector(".filter__modal h2");
let listFilter = document.querySelector(".filter__liste");
let isopen = false;

let bottomModal = document.querySelector(".menu-bottom__modal");
let mapButton = document.querySelector(".menu-bottom__link--map");
let burgerButton = document.querySelector(".menu-bottom__link--burger");
let burgerModal = document.querySelector(".burger-menu");
let crossBurger = document.querySelector(".burger-menu--link__close");
let linksBurger = document.querySelectorAll(".burger-menu--link");
let mainMap = document.querySelector(".map__container .map");

let letsGo = document.querySelector(".launching__button-link");
let menuMain = document.querySelector(".menu-main");

window.addEventListener("DOMContentLoaded", init);

function init() {
  buttonFilter.addEventListener("click", openCloseFilterModal);
  mapButton.addEventListener("click", openCloseMapModal);
  burgerButton.addEventListener("click", openBurgerMenu);
  crossBurger.addEventListener("click", closeBurgerMenu);
  letsGo.addEventListener("click", openMainMenu);
}

function openCloseFilterModal() {
  if (isopen == false) {
    console.log("openFilterModal");
    console.log(screen.width);
    // if on desktop
    if (screen.width > 600) {
      modalFilter.classList.add("morphing");
      modalFilter.classList.remove("morphingClose");
    } else {
      modalFilter.style.height = "30vh";
      modalFilter.style.top = "-30vh";
    }
    setTimeout(opacity, 1000, titleFilter);
    setTimeout(opacity, 1000, listFilter);
    isopen = true;
  } else if (isopen == true) {
    console.log("closeFilterModal");
    // if on desktop
    if (screen.width > 600) {
      modalFilter.classList.add("morphingClose");
      modalFilter.classList.remove("morphing");
    } else {
      modalFilter.style.height = "0vh";
      modalFilter.style.top = "0vh";
    }
    opacityNo(titleFilter);
    opacityNo(listFilter);
    //listFilter.style.display = "none";
    isopen = false;
  }
}

function openCloseMapModal() {
  if (isopen == false) {
    bottomModal.style.height = "60vh";
    isopen = true;
    opacity(mainMap);
  } else {
    opacityNo(mainMap);
    isopen = false;
    setTimeout(function() {
      bottomModal.style.height = "7vh";
    }, 1000);
  }
}

function openBurgerMenu() {
  console.log("open burger");
  burgerModal.style.width = "76vw";
  setTimeout(function() {
    linksBurger.forEach(function(link) {
      link.style.opacity = "1";
    });
  }, 1000);
}

function closeBurgerMenu() {
  linksBurger.forEach(function(link) {
    link.style.opacity = "0";
  });
  setTimeout(function() {
    burgerModal.style.width = "0vw";
  }, 1000);
}

function openMainMenu() {
  console.log("open menuMain");
  menuMain.style.display = "grid";
}

/* ---------------------- EFFECT FUNCTIONS ------------------- */

function none(element) {
  element.classList.toggle(none);
}
function opacity(content) {
  console.log("opacity");
  content.classList.remove("opacity");
}

function opacityNo(content) {
  console.log("No opacity");
  content.classList.add("opacity");
}
