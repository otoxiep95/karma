let urlParams = new URLSearchParams(window.location.search);
const database = firebase.database();
let catId = urlParams.get("category");

// VARIABLES GALLERY
const gallery = document.querySelector(".gallery__container");
const filterList = document.querySelector(".filter__list");
const galleryCatTitle = document.querySelector(".category-display__text");

//VARIABLES LINKS
const filterListLinks = document.querySelectorAll(".filter__list img");
const mainMenuLinks = document.querySelectorAll(".menu-main__link");

// ARRAYS
let listOfBusinesses = [];
let listOfFilters = [];
let listOfColors = ["#b24a42", "#6b927a", "#e38655", "#e2685b", "#d0ad8e"];
//COLOR COUNTER
let i = 0;

// BUSINESS OBJECT
const Business = {
  key: "",
  name: "",
  type: "",
  shortDescription: "",
  longDescription: "",
  location: "",
  image: "assets/img/small/",
  price: "",
  distance: "",
  contact: {
    fblink: "",
    telephone: "",
    weblink: "",
    instaLink: "",
    businessAdress: ""
  },
  badges: {
    ratable: [
      {
        name: "vegetarian",
        rate: 0,
        votes: 0
      },
      {
        name: "vegan",
        rate: 0,
        votes: 0
      },
      {
        name: "localProducts",
        rate: 0,
        votes: 0
      },
      {
        name: "plasticFree",
        rate: 0,
        votes: 0
      },
      {
        name: "organic",
        rate: 0,
        votes: 0
      }
    ],
    notRatable: [
      {
        name: "zeroWaste",
        rate: 0,
        votes: 0
      },
      {
        name: "secondHand",
        rate: 0,
        votes: 0
      },
      {
        name: "recycled",
        rate: 0,
        votes: 0
      },
      {
        name: "ethical",
        rate: 0,
        votes: 0
      },
      {
        name: "cleanEnergy",
        rate: 0,
        votes: 0
      },
      {
        name: "energySaving",
        rate: 0,
        votes: 0
      },
      {
        name: "co2Emissions",
        rate: 0,
        votes: 0
      }
    ]
  },
  filtersArray: [],

  createBadges(filters) {
    let full_badges = filters.ratable.concat(filters.notRatable);

    full_badges.forEach(filter => {
      averageRate = filter.rate / filter.votes;
      badge = filter.name;

      if (averageRate > 5) {
        this.filtersArray.push(badge);
        if (!listOfFilters.includes(badge)) {
          listOfFilters.push(badge);
          let filterBadgeImg = document.createElement("img");
          let filterBadgeLink = document.createElement("a");
          filterBadgeLink.dataset.filter = badge;
          filterBadgeImg.src = "assets/badges/" + badge + ".svg";
          filterBadgeLink.addEventListener("click", clickedFilter);
          filterBadgeLink.appendChild(filterBadgeImg);
          filterList.appendChild(filterBadgeLink);
        }
      }
    });
  }
};

function init() {
  createObject();
  underlineCat();
  galleryCatTitle.textContent = catId;
}

// BUILD THE BUSINESS OBJECT
function createObject() {
  database.ref(catId + "/").on("child_added", snapshot => {
    const key = snapshot.key;
    const data = snapshot.val();
    console.log(key);
    console.log(data);
    const business = Object.create(Business);
    business.key = key;
    business.name = data.name;
    business.type = data.type;
    business.shortDescription = data.shortDescription;
    business.image = business.image + data.image;
    business.location = data.location;
    business.badges = data.badges;
    business.filtersArray = [];
    business.distance = data.distance;
    business.price = data.price;
    business.createBadges(data.badges);

    pushBusinessToList(business);
  });
}

// & PUSH IT TO THE ARRAY
function pushBusinessToList(business) {
  console.log("push");
  listOfBusinesses.push(business);
  displayListBusiness(business);
}

// DISPLAY IT TO THE GALLERY
function displayListBusiness(business) {
  document.querySelector(".logo-loader").style.display = "none";
  console.log("display");
  let clone = document
    .querySelector(".gallery__item__template")
    .content.cloneNode(true);

  clone.querySelector("[data-link_to_subpage]").href =
    "business.html?category=" + catId + "&key=" + business.key;
  clone.querySelector("[data-image]").style.backgroundImage =
    "url(" + business.image + ")";
  clone.querySelector("[data-name]").textContent = business.name;
  clone.querySelector("[data-type]").textContent = business.type;
  clone.querySelector("[data-short_desc]").textContent =
    business.shortDescription;
  clone.querySelector("[data-distance]").textContent = business.distance;
  if (screen.width < 600) {
    clone.querySelector(".gallery__item").style.backgroundColor = selectColor();
  } else {
    let textColor = selectColor();
    clone.querySelector("[data-name]").style.color = textColor;
    clone.querySelector("[data-type]").style.color = textColor;
    clone.querySelector("[data-short_desc]").style.color = textColor;
    clone.querySelector("[data-distance]").style.color = textColor;
    clone.querySelector(".price").style.color = textColor;
  }
  // Make opacity of price icon
  let priceTag = business.price;
  const priceSecIcon = clone.querySelector(".price .secPrice");
  const priceThirdIcon = clone.querySelector(".price .thirdPrice");

  switch (priceTag) {
    case "1":
      priceSecIcon.style.opacity = "0.4";
      priceThirdIcon.style.opacity = "0.4";
      break;
    case "2":
      priceThirdIcon.style.opacity = "0.4";
      break;
    case "3":
      break;

    default:
      break;
  }

  // Make the badges
  let badgesList = clone.querySelector("[data-badges_container]");
  business.filtersArray.forEach(filter => {
    let badgeImg = document.createElement("img");
    badgeImg.classList.add("badge__img");
    badgeImg.src = "assets/badges/" + filter + ".svg";
    badgesList.appendChild(badgeImg);
  });

  clone.firstElementChild.classList.add("showUpGallery");
  gallery.appendChild(clone);
}
//Color selection for background and font
function selectColor() {
  if (i > 4) {
    i = 0;
  }
  let color = listOfColors[i];
  i++;
  return color;
}

// FILTERED LIST
function clickedFilter(event) {
  const filter = this.dataset.filter; // references data-filter="____"
  event.preventDefault();

  // remove selection to all filters
  filterList.querySelectorAll("img").forEach(element => {
    element.classList.remove("selected");
  });
  // show filter selected
  event.target.classList.add("selected");

  // display the filtered array or all
  if (filter == "all") {
    displayFilteredList(listOfBusinesses);
  } else {
    const filteredBusinessList = filterBusinessList(filter);

    displayFilteredList(filteredBusinessList);
  }

  // close the filter modal
  setTimeout(openCloseFilterModal, 1000, event);
}

// DISPLAY IT TO THE GALLERY
function displayFilteredList(filteredList) {
  // clear the gallery
  gallery.innerHTML = "";

  // display the filtered list
  filteredList.forEach(business => {
    displayListBusiness(business);
  });
}

// SHOW THE ACTIVE CATEGORY IN MENU
function underlineCat() {
  mainMenuLinks.forEach(menuLink => {
    catLink = menuLink.dataset.menu;

    if (catLink === catId) {
      menuLink.firstElementChild.classList.add("underline");
    }
  });
}

// SORT THE BUSINESS ARRAY
function filterBusinessList(filter) {
  const filteredBusinessList = listOfBusinesses.filter(byFilter);

  function byFilter(business) {
    if (business.filtersArray.indexOf(filter) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  return filteredBusinessList;
}

init();
