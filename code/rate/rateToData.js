//console.log(rateFinal);
const database = firebase.database();
let selectedBadge = "vegetarian";

const badges = [];
function init() {
  console.log(rateFinal);
  database
    .ref("EAT/-Le8Q2uYZ8-stN4uXwRT/badges/ratable")
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
  badges.forEach(element => {
    if (element.name === selectedBadge) {
      element.rate += rateFinal;
      element.votes++;
    }
  });
  console.log(badges);
});

function updateBadges() {
  database.ref("EAT/-Le8Q2uYZ8-stN4uXwRT/badges/ratable").set();
}
