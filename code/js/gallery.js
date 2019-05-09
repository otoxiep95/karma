let urlParams = new URLSearchParams(window.location.search);
const database = firebase.database();
let catId = urlParams.get("category");
const gallery = document.querySelector(".gallery__container");
const filterList = document.querySelector(".filter__list");

let listOfBusinesses = [];
let listOfFilters = [];

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
    console.log(filters.ratable, filters.notRatable);
    let full_badges = filters.ratable.concat(filters.notRatable);
    console.log(full_badges);

    full_badges.forEach(filter => {
      averageRate = filter.rate / filter.votes;
      badge = filter.name;
      console.log(averageRate, filter.name);
      if (averageRate > 5) {
        console.log(averageRate, filter.name);
        this.filtersArray.push(badge);
        if (!listOfFilters.includes(badge)) {
          listOfFilters.push(badge);
        }
      }
    });
    console.log(listOfFilters);
  }
};

function init() {
  createObject();
}

function createObject() {
  database.ref(catId + "/").on("child_added", snapshot => {
    const key = snapshot.key;
    const data = snapshot.val();

    const business = Object.create(Business);
    business.key = key;
    business.name = data.name;
    business.type = data.type;
    business.shortDescription = data.shortDescription;
    business.image = business.image + data.image;
    business.location = data.location;
    business.badges = data.badges;
    business.filtersArray = [];
    business.createBadges(data.badges);

    pushBusinessToList(business);
  });
}

function pushBusinessToList(business) {
  listOfBusinesses.push(business);
  displayListBusiness(business);
}

function displayListBusiness(business) {
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
  //clone.querySelector("[data-price]")
  clone.querySelector("[data-distance]").textContent = business.distance;
  // MAKE OPACITIES IN PRICE ICONS
  let priceTag = business.price;
  switch (priceTag) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;

    default:
      break;
  }
  let badgesList = clone.querySelector("[data-badges_container]");
  business.filtersArray.forEach(filter => {
    // let li = document.createElement("li");
    // li.textContent = filter;
    // console.log(li);
    // badgesList.appendChild(li);
  });
  gallery.appendChild(clone);
}

init();
