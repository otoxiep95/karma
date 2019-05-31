//console.log(rateFinal);
let urlParams = new URLSearchParams(window.location.search);
let catId = urlParams.get("category");
let urlKey = urlParams.get("key");
const database = firebase.database();
const badgeButtons = document.querySelectorAll(".filter__link");
const backToBusinessLink = document.querySelector(".back-to-business__link");
const nameOfBusiness = document.querySelectorAll(".rate__business__name");

let selectedBadge = "";

const badges = [];
const userRates = [
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
];

badgeButtons.forEach(element => {
  element.addEventListener("click", e => {
    clickedBadge(element);
  });
});

function clickedBadge(element) {
  selectedBadge = element.dataset.badge;
  badgeButtons.forEach(badgeButton => {
    badgeButton.classList.remove("badge--selected");
  });
  console.log(selectedBadge);
  element.classList.add("badge--selected");
}

// click on rate
// after having a category go to rating
let rateLink = document.querySelector(".rate-link");

rateLink.addEventListener("click", e => {
  if (selectedBadge != "") {
    console.log("badge selected");
    openRatePage(e);
  }
});

function init() {
  console.log(rateFinal);
  backToBusinessLink.href =
    "../business.html?category=" + catId + "&key=" + urlKey;
  database
    .ref(catId + "/" + urlKey + "/badges/ratable")
    .on("child_added", snapshot => {
      const key = snapshot.key;
      const data = snapshot.val();
      // console.log(key);
      // console.log(data);
      badges.push(data);
      // console.log(badges);
    });
  database.ref(catId + "/" + urlKey).on("child_added", snapshot2 => {
    if (snapshot2.key === "name") {
      console.log(snapshot2.val());
      nameOfBusiness.forEach(name => {
        name.textContent = snapshot2.val();
      });
    }
  });
}

init();

document.querySelector(".rate-link--next").addEventListener("click", e => {
  console.log(rateFinal);
  userRates.forEach(element => {
    if (element.name === selectedBadge) {
      element.rate = rateFinal;
      element.votes = 1;
      document.querySelector(".current-badge__rate--img").src =
        "../assets/badges/" + element.name + ".svg";
      document.querySelector(".current-badge__rate--msg").textContent =
        rangeKeyWord.textContent;
    }
  });

  console.log(badges);
  console.log(userRates);
  openRateAgain();
  //openMsgModal();
});

document
  .querySelector(".rate-again-link--next")
  .addEventListener("click", openMsgModal);

const submitButtons = document.querySelectorAll(".button__submit--rating");

submitButtons.forEach(submit => {
  submit.addEventListener("click", updateBadges);
});

function updateBadges() {
  for (var i = 0; i < badges.length; i++) {
    let dataRate = badges[i].rate;
    let dataVotes = badges[i].votes;
    let userRate = userRates[i].rate;
    console.log(dataRate);
    console.log(userRate);
    dataRate += userRate;
    dataVotes++;

    badges[i].rate = dataRate;
    badges[i].votes = dataVotes;
  }
  console.log(badges);
  //show Thank tou screen
  document.querySelector(".thank--you--screen").classList.remove("none");
  //sendTodata();
}

function sendTodata() {
  database.ref("EAT/-Le8Q2uYZ8-stN4uXwRT/badges/ratable").set(badges);
}
