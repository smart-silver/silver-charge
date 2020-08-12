const CHARGE_TABLE = [
  [28020, 35030, 46960, 58410, 64350, 69000],
  [25940, 32430, 43500, 54110, 59610, 63930],
  [23950, 29940, 40150, 49960, 55070, 59050],
  [22860, 28570, 38790, 48590, 53680, 57690],
  [21770, 27210, 37410, 47210, 52320, 56310],
  [21770, 27210, 37410, 47210, 52320, 56310],
];
const PROPORTION = [0.15, 0.09, 0.06];
let mealCharge = 2500,
  snackCharge = 500,
  snack = 2;

const table = document.querySelector("#charge"),
  form = document.querySelector("#inputForm"),
  level = document.querySelector("#level"),
  time = document.querySelector("#time"),
  lunch = document.querySelector("#lunch"),
  dinner = document.querySelector("#dinner"),
  date = document.querySelector("#date"),
  setButtom = document.querySelector("#setButton"),
  saveButtom = document.querySelector("#setSave"),
  inputMeal = document.querySelector("#inputMeal"),
  inputSnack = document.querySelector("#inputSnack"),
  snackTime = document.querySelector("#snackTime");

function save(event) {
  mealCharge = inputMeal.value;
  snackCharge = inputSnack.value;
  snack = snackTime.value;
}

function setClick(event) {
  inputMeal.value = mealCharge;
  inputSnack.value = snackCharge;
  snackTime.value = snack;
}

function calc() {
  const levelValue = Number(level.value);
  const timeValue = Number(time.value);
  let meal = 0;
  if (lunch.checked) meal++;
  if (dinner.checked) meal++;
  const dateValue = Number(date.value);

  const noneSalary = (mealCharge * meal + snackCharge * snack) * dateValue;
  const Salary = CHARGE_TABLE[levelValue][timeValue] * dateValue;

  for (let i = 0; i < PROPORTION.length; i++) {
    let row = table.rows[i];
    row.cells[1].innerHTML =
      Math.floor(noneSalary)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    row.cells[2].innerHTML =
      Math.floor(Salary * PROPORTION[i])
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    row.cells[3].innerHTML =
      Math.floor(noneSalary + Salary * PROPORTION[i])
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  }
}

function onSubmit(event) {
  event.preventDefault();
  calc();
}

function init() {}

form.addEventListener("submit", onSubmit);
setButtom.addEventListener("click", setClick);
saveButtom.addEventListener("click", save);

init();
