"use strict";

let modalFilter = document.querySelector(".filter__modal--gallery");
let titleFilter = document.querySelector(".filter__modal--gallery h2");
let listFilter = document.querySelector(".filter__list");
let bottomModal = document.querySelector(".menu-bottom__modal");
let burgerModal = document.querySelector(".burger-menu");
let linksBurger = document.querySelectorAll(".burger-menu--link");
let mainMap = document.querySelector(".map__container .map");
//let letsGo = document.querySelector(".launching__button-link");
//let menuMain = document.querySelector(".menu-main");

let isopen = false;

// RATING VARIABKES
let rateIntro = document.querySelector(".rate__intro");
let ratePage = document.querySelector(".rate__page");
let filterMenu = document.querySelector(".filter__modal");
let bottomModalRate = document.querySelector(".menu-bottom__modal--rate");
let rateNextButton = document.querySelector(".rate-link--next");
let goBackRate = document.querySelector(".menu-bottom__link--rate");
let rangeThumb = document.querySelector(".range__thumb");

window.onload = initInteraction();

function initInteraction() {
  let buttonFilter = document.querySelector(".filter__button--filter");
  let mapButton = document.querySelector(".menu-bottom__link--map");
  let burgerButton = document.querySelector(".menu-bottom__link--burger");
  let crossBurger = document.querySelector(".burger-menu--link__close");
  let rateBadgeLink = document.querySelectorAll(".rate__badge--link");
  let returnLink = document.querySelector(".menu-bottom__link--return");
  let gallery = document.querySelector(".gallery");
  let businessPage = document.querySelector(".business");
  let rateLink = document.querySelectorAll(".rate-link");
  if (buttonFilter) {
    console.log("button filter clicked");

    buttonFilter.addEventListener("click", e => {
      openCloseFilterModal(e);
    });
  }
  if (burgerButton) {
    document.querySelector(".burger-menu--link--who").href =
      "index.html?interaction=about#about1";
    document.querySelector(".burger-menu--link--why").href =
      "index.html?interaction=about#about2";
    document.querySelector(".burger-menu--link--how").href =
      "index.html?interaction=about#about3";
    document.querySelector(".burger-menu--link--contact").href =
      "index.html?interaction=about#about4";
  }
  if ((mapButton, burgerButton, crossBurger)) {
    mapButton.addEventListener("click", openCloseMapModal);
    burgerButton.addEventListener("click", openBurgerMenu);
    crossBurger.addEventListener("click", closeBurgerMenu);
  }
  if (returnLink && gallery) {
    returnLink.href = "index.html?interaction=menu";
  }
  if (returnLink && businessPage) {
    returnLink.href = "gallery.html?category=" + catId;
  }

  //galleryItem.addEventListener("click", gotoSubpage);
}

function openCloseFilterModal(e) {
  e.preventDefault();
  if (isopen == false) {
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

let ratePageOpen = false;
let msgModalOpen = false;

function openRatePage(e) {
  e.preventDefault();

  bottomModalRate.style.height = "7vh";
  opacityNo(rateIntro);
  opacityNo(filterMenu);
  rateLink.style.display = "none";
  msgModalOpen = false;
  ratePageOpen = true;

  rangeThumb.style.backgroundImage =
    "url('../css/background-img/" + selectedBadge + ".svg')";

  setTimeout(function() {
    rateIntro.style.display = "none";
    filterMenu.style.display = "none";
    rateNextButton.style.display = "block";
  }, 1000);
}

function openMsgModal() {
  document.querySelector(".rate__conclusion").style.display = "block";
  rateNextButton.style.display = "none";
  document.querySelector(".button__submit--rating").style.display = "block";
  ratePageOpen = false;
  msgModalOpen = true;
}

/* GO BACKSSSS */
if (goBackRate) {
  goBackRate.addEventListener("click", goBack);
}

function goBack() {
  document.querySelector(".rate__conclusion").style.display = "none";
  rateNextButton.style.display = "none";
  document.querySelector(".button__submit--rating").style.display = "none";
  rateIntro.style.display = "block";
  rateIntro.style.opacity = "1";
  filterMenu.style.display = "block";
  filterMenu.style.opacity = "1";
  rateLink.style.display = "block";
  bottomModalRate.style.height = "35vh";
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
