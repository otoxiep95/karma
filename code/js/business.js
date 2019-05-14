let urlParams = new URLSearchParams(window.location.search);
const database = firebase.database();
let catId = urlParams.get("category");
let urlKey = urlParams.get("key");
const businessName = document.querySelector("[data-name]");
const businessType = document.querySelector("[data-type]");
const businessImage = document.querySelector("[data-image]");
const businessLongDesc = document.querySelector("[data-long_desc]");
const businessLocationMaps = document.querySelectorAll(".gmap_link");

const rateButtons = document.querySelectorAll(".filter__button--rate a");

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

      console.log(averageRate, filter.name);
      if (averageRate > 5) {
        console.log(averageRate, filter.name);
        this.filtersArray.push(filter.name);
      }
    });
  }
};

function init() {
  buildBusiness();
  rateButtons.forEach(rateButton => {
    rateButton.href =
      "rate/index-rate.html?category=" + catId + "&key=" + urlKey;
  });
}

function buildBusiness() {
  database.ref(catId + "/").on("child_added", snapshot => {
    const key = snapshot.key;
    const data = snapshot.val();
    console.log(key);
    console.log(data);
    if (urlKey == key) {
      const business = Object.create(Business);
      business.key = key;
      business.name = data.name;
      business.type = data.type;
      business.shortDescription = data.shortDescription;
      business.longDescription = data.longDescription;
      business.location = data.location;
      business.image = business.image + data.image;
      business.contact = data.contact;
      business.price = data.price;
      business.distance = data.distance;
      business.badges = data.badges;
      business.filtersArray = [];

      business.createBadges(data.badges);
      showBusiness(business);
    }
  });
}

function showBusiness(business) {
  businessName.textContent = business.name;
  businessType.textContent = business.type;
  businessImage.style.backgroundImage = "url(" + business.image + ")";
  businessLongDesc.textContent = business.longDescription;

  document.querySelector("[data-distance]").textContent = business.distance;

  let priceTag = business.price;
  const priceSecIcon = document.querySelector(".price .secPrice");
  const priceThirdIcon = document.querySelector(".price .thirdPrice");

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

  let badgesList = document.querySelector("[data-badges_container]");
  business.filtersArray.forEach(filter => {
    console.log(filter);
    let badgeImg = document.createElement("img");
    badgeImg.classList.add("badge__img");
    badgeImg.src = "assets/badges/" + filter + ".svg";
    badgesList.appendChild(badgeImg);
  });

  businessLocationMaps.forEach(gmap => {
    gmap.src = business.location;
  });
}

init();
