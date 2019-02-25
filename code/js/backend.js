"use strict";
// categories = 4;
let json_link =
  "https://portfolio-backend.mathildefrachon.com/wp-json/wp/v2/projects?_embed&per_page=20";
let urlParams = new URLSearchParams(window.location.search);

/* THIS IS AFTER CLICKING ON A PROJECT / SUBPAGE */
let cat = urlParams.get("category");
let activeFilter = cat;
if (cat) {
  console.log("array have a category : " + cat);
  json_link = json_link + "&categories=" + cat;
}

/* THIS JAVASCRIPT FETCH THE DATA AND CREATE AN ARRAY OF POSTS - FILTER THE ARRAY  */

// CREATE OBJECT PROJECT

const objProject = {
  name: "",
  subtitle: "",
  type: "",
  description: "",
  keywords: "",
  image: "",
  category: "",
  relatedpost: {
    title: "",
    url: ""
  },
  otherimages: [],
  id: null,
  wpid: null
};

let project = "";
const projectsArray = [];
let currentArray = [];

// FETCHING

window.addEventListener("DOMContentLoaded", init);
//ignoreHTTPSErrors: true;

function init() {
  // fetch JSON
  fetch(json_link)
    .then(e => e.json())
    .then(data => showData(data));
}

function showData(data) {
  // build the list
  data.forEach(dataProject => {
    // console.log(dataProject);
    project = Object.create(objProject);
    project.name = dataProject.title.rendered;
    // project.id = dataProject.id;
    project.wpid = dataProject.id;
    project.image =
      dataProject._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.full.source_url;

    project.subtitle = dataProject.acf.subtitle;
    project.type = dataProject.acf.type;
    project.description = dataProject.acf.description;
    project.keywords = dataProject.acf.keywords;
    project.otherimages = [];
    project.category = dataProject.categories;

    for (var key in dataProject.acf) {
      if (key.startsWith("other_images") && dataProject.acf[key]) {
        project.otherimages.push(dataProject.acf[key]);
      }
    }
    console.log(project.wpid);
    console.table(project.otherimages);
    project.otherimage = dataProject.acf.other_images.url; // DONT KNOW
    project.relatedpost.title = dataProject.acf.related_posts.title;

    projectsArray.push(project);
    console.log(projectsArray);
    project.id = projectsArray.indexOf(project);
    // console.log(project);
  });

  currentArray = projectsArray;

  // display the list
  displayArray(currentArray);
}

// SEE IF WE ARE ON THE SUBPAGE OR NOT TO DISPLAY THE LIST OR THE PROJECT
function displayArray(currentArray, filter, all) {
  let urlParams = new URLSearchParams(window.location.search);

  let urlIndex = urlParams.get("index");

  if (urlIndex === null) {
    displayList(currentArray);
    console.log("we are on gallery");
  } else {
    displayProject(currentArray);
    console.log("we are on subpage");
  }
}

// FILTER BY CATEGORIES
function filterByCat(filter) {
  currentArray = projectsArray.filter(byCat);

  function byCat(project) {
    if (project.category.toString() === filter.toString()) {
      return true;
    } else {
      return false;
    }
  }
  // console.log(currentArray + "is array after filtering");
  // localStorage.setItem("someVarKey", currentArray);
  // console.log(localStorage.getItem("someVarKey"));

  return currentArray;
}
