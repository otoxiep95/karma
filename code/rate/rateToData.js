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

//RUN ANIMATION FOR RATE BUTTON WHEN CLICK ON BADGES
badgeButtons.forEach(element => {
  element.addEventListener(
    "click",
    e => {
      clickedBadge(element);

      rateLink.classList.remove("blink");
      void rateLink.offsetWidth;
      rateLink.classList.add("blink");
    },
    false
  );
});

//SELECT BADGE
function clickedBadge(element) {
  selectedBadge = element.dataset.badge;
  badgeButtons.forEach(badgeButton => {
    badgeButton.classList.remove("badge--selected");
  });

  element.classList.add("badge--selected");
}

let rateLink = document.querySelector(".button-rate--rate");
// CLICK RATE BUTTON TO GO TO DRAG/RATE SCREEN
rateLink.addEventListener(
  "click",
  e => {
    e.preventDefault();
    if (selectedBadge != "") {
      openRatePage(e);
    } else {
      //If there is no badge selected dont go
      badgeButtons.forEach(badge => {
        if (badge.classList.contains("badge--voted")) {
          //dont blink
        } else {
          //warning blink
          badge.classList.remove("blink");
          void badge.offsetWidth;
          badge.classList.add("blink");
        }
      });
    }
  },
  false
);

function init() {
  backToBusinessLink.href =
    "../business.html?category=" + catId + "&key=" + urlKey;
  //Fetch badges from database
  database
    .ref(catId + "/" + urlKey + "/badges/ratable")
    .on("child_added", snapshot => {
      const key = snapshot.key;
      const data = snapshot.val();

      badges.push(data);
    });
  //fetch name of business
  database.ref(catId + "/" + urlKey).on("child_added", snapshot2 => {
    if (snapshot2.key === "name") {
      nameOfBusiness.forEach(name => {
        name.textContent = snapshot2.val();
      });
    }
  });
}

init();

//CLICK ON NEXT FROM DRAG/RATE SCREEN
document.querySelector(".button-rate--next").addEventListener("click", e => {
  userRates.forEach(element => {
    if (element.name === selectedBadge) {
      //Replace values on current user rate array
      element.rate = rateFinal;
      element.votes = 1;
      document.querySelector(".current-badge__rate--img").src =
        "../assets/badges/" + element.name + ".svg";
      document.querySelector(".current-badge__rate--msg").textContent =
        rangeKeyWord.textContent;
    }
  });
  let ratedBadge = selectedBadge
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase();

  document.querySelector(".selectedRate").textContent = ratedBadge;
  openRateAgain();
});

//CLICK ON NEXT FROM RATE AGAIN SCREEN
document
  .querySelector(".button-rate--next__2")
  .addEventListener("click", openMsgModal);

const submitButtons = document.querySelectorAll(".button__submit--rating");

//CLICK SUBMIT
submitButtons.forEach(submit => {
  submit.addEventListener("click", updateBadges);
});

//UPDATE THE BADGES ARRAY WITH THE USER RATE ARRAY
function updateBadges() {
  for (var i = 0; i < badges.length; i++) {
    let dataRate = badges[i].rate;
    let dataVotes = badges[i].votes;
    let userRate = userRates[i].rate;

    dataRate += userRate;
    dataVotes++;

    badges[i].rate = dataRate;
    badges[i].votes = dataVotes;
  }

  //show Thank tou screen
  document.querySelector(".thank--you--screen").classList.remove("none");
  sendTodata();
  setTimeout(goBackToBusiness, 2000);
}

function sendTodata() {
  database.ref(catId + "/" + urlKey + "/badges/ratable").set(badges);
}

function goBackToBusiness() {
  window.location = "../business.html?category=" + catId + "&key=" + urlKey;
}
