"use strict";

let modalFilter = document.querySelector(".filter__modal--gallery");
let titleFilter = document.querySelector(".filter__modal--gallery h2");
let listFilter = document.querySelector(".filter__list");
let bottomModal = document.querySelector(".menu-bottom__modal");
let burgerModal = document.querySelector(".burger-menu");
let linksBurger = document.querySelectorAll(".burger-menu--link");
let mainMap = document.querySelector(".map__container .map");
const burgerShadow = document.querySelector(".burger-shadow");
let mapButton = document.querySelector(".menu-bottom__link--map");

let isopen = false;
let burgerMenuOpen = false;

// RATING VARIABLES
let rateIntro = document.querySelector(".rate__intro");
let ratePage = document.querySelector(".rate__page");
let filterMenu = document.querySelector(".filter__modal");
let bottomModalRate = document.querySelector(".menu-bottom__modal--rate");
let rateNextButton = document.querySelector(".button-rate--next");
let rateAgainButton = document.querySelector(".button-rate--again");
let rangeThumb = document.querySelector(".range__thumb");

window.onload = initInteraction();

function initInteraction() {
  let buttonFilter = document.querySelector(".filter__button--filter");
  let burgerButton = document.querySelector(".menu-bottom__link--burger");
  let crossBurger = document.querySelector(".burger-menu--link__close");
  let returnLink = document.querySelector(".menu-bottom__link--return");
  let gallery = document.querySelector(".gallery");
  let businessPage = document.querySelector(".business");

  if (linksBurger) {
    linksBurger.forEach(linkEl => {
      linkEl.addEventListener("click", closeBurgerMenu);
    });
  }

  if (buttonFilter) {
    buttonFilter.addEventListener("click", e => {
      openCloseFilterModal(e);
    });
  }

  if ((mapButton, burgerButton, crossBurger)) {
    mapButton.addEventListener("click", openCloseMapModal);

    burgerButton.addEventListener("click", e => {
      if (burgerMenuOpen) {
        closeBurgerMenu();
      } else {
        openBurgerMenu();
      }
    });

    crossBurger.addEventListener("click", closeBurgerMenu);
  }
  if (returnLink && gallery) {
    returnLink.href = "index.html?interaction=menu";
  }
  if (returnLink && businessPage) {
    returnLink.href = "gallery.html?category=" + catId;
  }
}
// OPEN AND CLOSING OF FILTER MODAL
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

    isopen = false;
  }
}
// OPEN AND CLOSING OF MAP MODAL MOBILE
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

//OPENING OF BURGER MENU
function openBurgerMenu() {
  burgerModal.style.width = "93vw";
  burgerMenuOpen = true;
  burgerShadow.classList.remove("none");
  setTimeout(function() {
    document.querySelector(".burger-menu--logo").style.opacity = "1";
    linksBurger.forEach(function(linkL) {
      linkL.style.opacity = "1";
    });
  }, 1000);
}
//CLOSING BURGER MENU
function closeBurgerMenu() {
  burgerMenuOpen = false;
  burgerShadow.classList.add("none");
  document.querySelector(".burger-menu--logo").style.opacity = "0";
  linksBurger.forEach(function(linkL) {
    linkL.style.opacity = "0";
  });

  setTimeout(function() {
    burgerModal.style.width = "0vw";
  }, 1000);
}

let ratePageOpen = false;
let rateAgainOpen = false;
let msgModalOpen = false;
//OPEN DRAG/RATE PAGE
function openRatePage(e) {
  e.preventDefault();

  bottomModalRate.style.height = "7vh";
  document.querySelector(".rate--title").style.display = "block";
  opacityNo(rateIntro);
  opacityNo(filterMenu);
  rateLink.style.display = "none";
  msgModalOpen = false;
  rateAgainOpen = false;
  ratePageOpen = true;

  rangeThumb.style.backgroundImage =
    "url('../css/background-img/" + selectedBadge + ".svg')";

  rateIntro.style.display = "none";
  document.querySelector(".rate__again").style.display = "none";
  filterMenu.style.display = "none";
  rateNextButton.style.display = "grid";
  rateAgainButton.style.display = "none";
}

//OPEN RATE AGAIN PAGE
function openRateAgain() {
  document.querySelector(".rate__again").style.display = "grid";
  document.querySelector(".button-rate--next__2").style.display = "grid";
  rateNextButton.style.display = "none";
  document.querySelector(".rate--title").style.display = "none";
  rateAgainButton.style.display = "grid";
  document.querySelectorAll(".button__submit--rating").forEach(button => {
    button.style.display = "none";
  });
  rateAgainOpen = true;
  ratePageOpen = false;
  msgModalOpen = false;
}

//OPEN MESSAGE RATE PAGE
function openMsgModal() {
  document.querySelector(".rate__conclusion").style.display = "grid";
  rateNextButton.style.display = "none";
  rateAgainButton.style.display = "none";
  document.querySelector(".button-rate--next__2").style.display = "none";
  document.querySelectorAll(".button__submit--rating").forEach(button => {
    button.style.display = "block";
  });
  ratePageOpen = false;
  rateAgainOpen = false;
  msgModalOpen = true;
}

if (rateAgainButton) {
  rateAgainButton.addEventListener("click", goBack);
}
//GO BACK TO SELECT BADGE PAGE
function goBack() {
  selectedBadge = "";
  document.querySelector(".rate__again").style.display = "none";
  document.querySelector(".button-rate--next__2").style.display = "none";
  document.querySelectorAll(".button__submit--rating").forEach(button => {
    button.style.display = "none";
  });
  document.querySelector(".badge--selected").classList.add("badge--voted");
  document.querySelectorAll(".badge--voted").forEach(elementBadge => {
    elementBadge.classList.remove("badge--selected");
  });

  rateIntro.style.display = "block";
  rateIntro.style.opacity = "1";
  filterMenu.style.display = "block";
  filterMenu.style.opacity = "1";
  rateLink.style.display = "grid";
  bottomModalRate.style.height = "65%";
  rateAgainButton.style.display = "none";
}

/* ---------------------- EFFECT FUNCTIONS ------------------- */

function none(element) {
  element.classList.toggle(none);
}
function opacity(content) {
  content.classList.remove("opacity");
}

function opacityNo(content) {
  content.classList.add("opacity");
}
