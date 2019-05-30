let urlParams = new URLSearchParams(window.location.search);
const database = firebase.database();
let catId = urlParams.get("category");
let urlKey = urlParams.get("key");
const businessName = document.querySelector("[data-name]");
const businessType = document.querySelector("[data-type]");
const businessImage = document.querySelector("[data-image]");
const businessLongDesc = document.querySelector("[data-long_desc]");
const businessLocationMaps = document.querySelectorAll(".gmap_link");
const priceSecIcon = document.querySelector(".price .secPrice");
const priceThirdIcon = document.querySelector(".price .thirdPrice");
const contactAdress = document.querySelector(".contact__adress");
const phoneNumberText = document.querySelector(".contact__phone--text");
const facebookLinks = document.querySelectorAll(".facebook--link");
const facebookLinkText = document.querySelector(".contact__facebook--text");
const websiteLinks = document.querySelectorAll(".website--link");
const websiteLinkText = document.querySelector(".contact__website--text");

const rateButtons = document.querySelectorAll(".filter__button--rate a");
const mainMenuLinks = document.querySelectorAll(".menu-main__link");

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
    telephoneNumber: "",
    weblink: "",
    instaLink: "",
    adress: ""
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
  underlineCat();
  rateButtons.forEach(rateButton => {
    rateButton.href =
      "rate/index-rate.html?category=" + catId + "&key=" + urlKey;
  });
}
function underlineCat() {
  console.log("hello");
  console.log(mainMenuLinks);
  mainMenuLinks.forEach(menuLink => {
    catLink = menuLink.dataset.menu;
    console.log(catLink);
    if (catLink === catId) {
      menuLink.firstElementChild.classList.add("underline");
    }
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
  console.log(business.longDescription);
  businessLongDesc.innerText = business.longDescription;
  //console.log(business.contact.businessAdress);
  contactAdress.textContent = business.contact.adress;
  phoneNumberText.textContent = business.contact.telephoneNumber;
  websiteLinks.forEach(elLink => {
    elLink.href = business.contact.weblink;
  });
  //websiteLinkText.textContent = business.contact.weblink;
  facebookLinks.forEach(elLink => {
    elLink.href = business.contact.fblink;
  });
  //facebookLinkText.textContent = business.contact.fblink;
  document.querySelector("[data-distance]").textContent = business.distance;

  let priceTag = business.price;

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
