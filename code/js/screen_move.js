"use strict";
import { urlParams } from "./index-ex.js";
// ANIMATION BETWEEN ABOUT AND PROJECT PAGE
// THIS PAGE IS A MESS

const screenWelcome = document.querySelector(".screen__welcome");
const screenAbout = document.querySelector(".screen__about");
const screenProject = document.querySelector(".screen__gallery");

const aboutButton = document.querySelector("#a-about");
const projectButton = document.querySelector("#a-projects");

// const imgArray = document.querySelectorAll(".imgwrapper");

const right = "right";
const left = "left";

window.addEventListener("DOMContentLoaded", initScreen);

//let urlParams = new URLSearchParams(window.location.search);

function initScreen() {
  let fromSubpage = urlParams.get("fromSubpage");

  aboutButton.addEventListener("click", function() {
    checkScreen(right);
  });
  projectButton.addEventListener("click", function() {
    checkScreen(left);
  });
  console.log(fromSubpage);
  if (fromSubpage) {
    screenProject.classList.remove("none");
    screenProject.classList.add("here");
    screenWelcome.classList.remove("here");
    screenWelcome.classList.add("none");
    screenProject.style.left = "0";
    // here(screenProject);
    // notHere(screenWelcome);
    // none(screenWelcome);
    // screenProject.style.left = "0";
    const filter_link = document.querySelector("#a-filters");
    filter_link.classList.remove("none");
  }
}

function here(screen) {
  screen.classList.remove("none");
  screen.classList.add("here");
}

function notHere(screen) {
  screen.classList.remove("here");
}

function none(screen1, screen2) {
  console.log("deleting rest of screens");
  screen1.classList.add("none");
  screen2.classList.add("none");
  console.log(screen1);
}

function clear(screen1, screen2) {
  screen1.classList.remove("moveleft");
  screen1.classList.remove("moverightWelcome");
  screen2.classList.remove("moveleft");
  screen2.classList.remove("moverightWelcome");
  screen1.classList.remove("moveleftWelcome");
  screen2.classList.remove("moveleftWelcome");
  screen1.classList.remove("moveright");
  screen2.classList.remove("moveright");
}

/* SCREEN ANIMATION */

function checkScreen(e) {
  // IF WE CLICK ON ABOUT
  if (e === "right") {
    console.log("click right");
    screenAbout.classList.remove("none");

    // FROM WELCOME
    if (screenWelcome.classList.contains("here")) {
      console.log("was on welcome");
      notHere(screenWelcome);
      screenWelcome.classList.add("moveleftWelcome");
      screenAbout.classList.add("moveleftWelcome");
    }
    // FROM PROJECTS
    else if (screenProject.classList.contains("here")) {
      console.log("was on projects");
      notHere(screenProject);
      clear(screenAbout, screenProject);
      screenProject.style.left = "0";
      screenProject.classList.add("moveleft");
      screenAbout.style.left = "100vw";
      screenAbout.classList.add("moveleft");
    }

    here(screenAbout);
    console.log("in about");

    screenAbout.addEventListener("animationend", function() {
      if (screenAbout.classList.contains("here")) {
        none(screenWelcome, screenProject);
        document.querySelector("#a-filters").classList.add("none");
      }
    });
  }
  // IF WE CLICK ON PROJECT
  else if (e === "left") {
    console.log("clicked left");
    screenProject.classList.remove("none");

    // FROM WELCOME
    if (screenWelcome.classList.contains("here")) {
      console.log("was on welcome");
      screenProject.classList.add("moverightWelcome");
      screenWelcome.classList.add("moverightWelcome");

      notHere(screenWelcome);
    }
    // FROM ABOUT
    else if (screenAbout.classList.contains("here")) {
      console.log("was on about");

      screenProject.style.left = "-100vw";
      screenAbout.style.left = "0";
      clear(screenProject, screenAbout);
      screenProject.classList.add("moveright");
      screenAbout.classList.add("moveright");

      notHere(screenAbout);
    }

    here(screenProject);
    console.log("project here");
    screenProject.addEventListener("animationend", function() {
      if (screenProject.classList.contains("here")) {
        none(screenWelcome, screenAbout);
        document.querySelector("#a-filters").classList.remove("none");
      }
    });
  }
}
