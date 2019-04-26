"use strict";

let buttonFilter = document.querySelector(".button__filter");
let modalFilter = document.querySelector(".filter__modal");
let titleFilter = document.querySelector(".filter__modal h2");
let listFilter = document.querySelector(".filter__liste");
let isopen = false;

let bottomModal = document.querySelector(".menu-bottom__modal");
let mapButton = document.querySelector(".menu-bottom__link--map");

window.addEventListener("DOMContentLoaded", init);

function init() {
  buttonFilter.addEventListener("click", openCloseFilterModal);
  mapButton.addEventListener("click", openCloseMapModal);
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
    setTimeout(function() {
      titleFilter.style.opacity = "1";
      listFilter.style.display = "block";
    }, 1000);
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
    titleFilter.style.opacity = "0";
    listFilter.style.display = "none";
    isopen = false;
  }
}

function openCloseMapModal() {
  if (isopen == false) {
    bottomModal.style.height = "60vh";
    isopen = true;
  } else {
    bottomModal.style.height = "7vh";
    isopen = false;
  }
}
