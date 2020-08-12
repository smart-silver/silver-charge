const costTable = [
  [28020, 35030, 46960, 58410, 64350, 69000],
  [25940, 32430, 43500, 54110, 59610, 63930],
  [23950, 29940, 40150, 49960, 55070, 59050],
  [22860, 28570, 38790, 48590, 53680, 57690],
  [21770, 27210, 37410, 47210, 52320, 56310],
  [21770, 27210, 37410, 47210, 52320, 56310],
];
const proportion = [0.15, 0.09, 0.06];
const mealCost = 2500;
const snackCost = 500;

const form = document.querySelector("#inputForm"),
  level = document.querySelector("#level"),
  time = document.querySelector("#time"),
  date = document.querySelector("#date");

function onSubmit(event) {
  event.preventDefault();
  console.log("good");
}

function init() {}

form.addEventListener("submit", onSubmit);

init();
