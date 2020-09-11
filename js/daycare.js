const CHARGE_TABLE = [
  [28020, 35030, 46960, 58410, 64350, 69000],
  [25940, 32430, 43500, 54110, 59610, 63930],
  [23950, 29940, 40150, 49960, 55070, 59050],
  [22860, 28570, 38790, 48590, 53680, 57690],
  [21770, 27210, 37410, 47210, 52320, 56310],
  [21770, 27210, 37410, 47210, 52320, 56310],
];
const PROPORTION = [0.15, 0.09, 0.06];
const LIMIT = [1498300, 1331800, 1276300, 1173200, 1007200, 566600];
let settings = {
  mealCharge: 2500,
  snackCharge: 500,
  snack: 2
}

const table = document.querySelector("#charge"),
  limitTable = document.querySelector("#limit"),
  form = document.querySelector("#inputForm"),
  level = document.querySelector("#level"),
  time = document.querySelector("#time"),
  breakfast = document.querySelector("#breakfast"),
  lunch = document.querySelector("#lunch"),
  dinner = document.querySelector("#dinner"),
  date = document.querySelector("#date"),
  setButtom = document.querySelector("#setButton"),
  saveButtom = document.querySelector("#setSave"),
  inputMeal = document.querySelector("#inputMeal"),
  inputSnack = document.querySelector("#inputSnack"),
  snackTime = document.querySelector("#snackTime");

  function loadSet() {
    const loadedSettings = localStorage.getItem("settings");

    if (loadedSettings !== null) {
      const parsedSettings = JSON.parse(loadedSettings);
      settings.mealCharge = Number(parsedSettings.mealCharge);
      settings.snackCharge = Number(parsedSettings.snackCharge);
      settings.snack = Number(parsedSettings.snack);
    }

  }

function saveSet() {
  localStorage.setItem("settings", JSON.stringify(settings));
}

function set(event) {
  settings.mealCharge = Number(inputMeal.value);
  settings.snackCharge = Number(inputSnack.value);
  settings.snack = Number(snackTime.value);
  saveSet();
}

function setClick(event) {
  inputMeal.value = Number(settings.mealCharge);
  inputSnack.value = Number(settings.snackCharge);
  snackTime.value = Number(settings.snack);
}

function calc() {
  const levelValue = Number(level.value);
  const timeValue = Number(time.value);
  let meal = 0;
  if (breakfast.checked) meal++;
  if (lunch.checked) meal++;
  if (dinner.checked) meal++;
  const dateValue = Number(date.value);

  const noneSalary = (settings.mealCharge * meal + settings.snackCharge * settings.snack) * dateValue;
  const Salary = CHARGE_TABLE[levelValue][timeValue] * dateValue;

  // 본인부담금
  for (let i = 0; i < PROPORTION.length; i++) {
    let row = table.rows[i];
    row.cells[1].innerHTML =
      (Math.floor(noneSalary / 10) * 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    row.cells[2].innerHTML =
      (Math.floor(Salary * PROPORTION[i] / 10) * 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    row.cells[3].innerHTML =
      (Math.floor(noneSalary / 10) * 10 + Math.floor(Salary * PROPORTION[i] / 10) * 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  }

  // 한도
  let limitTimes = 1;
  if (timeValue >= 3 && dateValue >= 20) limitTimes = 1.5;
  console.log(`${timeValue}, ${dateValue}, ${limitTimes}`);
  let row = limitTable.rows[0];
  row.cells[0].innerHTML = `${levelValue + 1}등급`;
  row.cells[1].innerHTML = 
  (LIMIT[levelValue] * limitTimes)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  row.cells[2].innerHTML =
  (Salary)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  row.cells[3].innerHTML =
  (LIMIT[levelValue] - (Salary))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
}

function onSubmit(event) {
  event.preventDefault();
  calc();
}

function init() {
  loadSet();
}

form.addEventListener("submit", onSubmit);
setButtom.addEventListener("click", setClick);
saveButtom.addEventListener("click", set);

init();
