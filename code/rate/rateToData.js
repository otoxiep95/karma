//console.log(rateFinal);
let urlParams = new URLSearchParams(window.location.search);
let catId = urlParams.get("category");
let urlKey = urlParams.get("key");
const database = firebase.database();
const badgeButtons = document.querySelectorAll(".filter__link");
console.log(badgeButtons);
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
  element.addEventListener("click", clickedBadge);
});

function clickedBadge(event) {
  selectedBadge = this.dataset.badge;
  console.log(selectedBadge);
}

function init() {
  console.log(rateFinal);
  database
    .ref(catId + "/" + urlKey + "/badges/ratable")
    .on("child_added", snapshot => {
      const key = snapshot.key;
      const data = snapshot.val();
      console.log(key);
      console.log(data);
      badges.push(data);
      console.log(badges);
    });
}
init();

document.querySelector(".button__submit").addEventListener("click", e => {
  console.log(rateFinal);
  userRates.forEach(element => {
    if (element.name === selectedBadge) {
      element.rate = rateFinal;
      element.votes = 1;
    }
  });
  console.log(badges);
  console.log(userRates);
  openMsgModal();
});

document
  .querySelector(".button__submit--rating")
  .addEventListener("click", updateBadges);

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
  sendTodata();
}

function sendTodata() {
  database.ref("EAT/-Le8Q2uYZ8-stN4uXwRT/badges/ratable").set(badges);
}
