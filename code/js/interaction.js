"use strict";

let modalFilter = document.querySelector(".filter__modal");
let titleFilter = document.querySelector(".filter__modal h2");
let listFilter = document.querySelector(".filter__list");
let isopen = false;
let bottomModal = document.querySelector(".menu-bottom__modal");
let burgerModal = document.querySelector(".burger-menu");
let linksBurger = document.querySelectorAll(".burger-menu--link");
let mainMap = document.querySelector(".map__container .map");
let letsGo = document.querySelector(".launching__button-link");
let menuMain = document.querySelector(".menu-main");

//let galleryItem = document.querySelector(".gallery__item");

window.onload = initInteraction();

function initInteraction() {
  let buttonFilter = document.querySelector(".button__filter");
  let mapButton = document.querySelector(".menu-bottom__link--map");
  let burgerButton = document.querySelector(".menu-bottom__link--burger");
  let crossBurger = document.querySelector(".burger-menu--link__close");
  let rateBadgeLink = document.querySelectorAll(".rate__badge--link");
  let returnLink = document.querySelector(".menu-bottom__link--return");
  let gallery = document.querySelector(".gallery");
  if (buttonFilter) {
    console.log("button filter clicked");
    buttonFilter.addEventListener("click", openCloseFilterModal);
  }
  if ((mapButton, burgerButton, crossBurger)) {
    mapButton.addEventListener("click", openCloseMapModal);
    burgerButton.addEventListener("click", openBurgerMenu);
    crossBurger.addEventListener("click", closeBurgerMenu);
  }
  if (returnLink && gallery) {
    returnLink.addEventListener("click", e => {
      returnMainMenu();
    });
  }
  if (rateBadgeLink) {
    rateBadgeLink.forEach(badge => {
      badge.addEventListener("click", e => {
        openRatePage(e);
      });
    });
  }

  //galleryItem.addEventListener("click", gotoSubpage);
}

function returnMainMenu() {
  console.log("gallery button return click");
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
    titleFilter.classList.remove("none");
    listFilter.classList.remove("none");
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
    titleFilter.classList.add("none");
    listFilter.classList.add("none");
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
  burgerModal.style.width = "83vw";
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

// function gotoSubpage(){

// }

function openRatePage(e) {
  e.preventDefault();
  console.log("open second step");
  let rateIntro = document.querySelector(".rate__intro");
  let ratePage = document.querySelector(".rate__page");
  let filterMenu = document.querySelector(".filter__modal");
  let rateButton = document.querySelector(".button__submit");
  opacityNo(rateIntro);
  opacityNo(filterMenu);

  //opacity(ratePage);

  setTimeout(function() {
    rateIntro.style.display = "none";
    filterMenu.style.display = "none";
    rateButton.style.display = "block";
    //ratePage.style.display = "inherit";
  }, 1000);
}

function openMsgModal() {
  let rateButton = document.querySelector(".button__submit");
  document.querySelector(".rate__conclusion").style.display = "block";
  rateButton.style.display = "none";
  document.querySelector(".button__submit--rating").style.display = "block";
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
