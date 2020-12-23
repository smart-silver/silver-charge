let LIMIT = [1498300, 1331800, 1276300, 1173200, 1007200, 566600];
let CHARGE_TABLE = [
  [14530, 22310, 29920, 37780, 42930, 47460, 51630, 55390]
];
const PROPORTION = [0.15, 0.09, 0.06];

const chargeTable = document.querySelector("#charge"),
  limitTable = document.querySelector("#limit"),
  form = document.querySelector("#inputForm"),
  level = document.querySelector("#level"),
  time = document.querySelector("#time"),
  date = document.querySelector("#date");

function set2020() {
  LIMIT = [1498300, 1331800, 1276300, 1173200, 1007200, 566600];
  CHARGE_TABLE = [
    [14530, 22310, 29920, 37780, 42930, 47460, 51630, 55390]
  ];
}

function set2021() {
  LIMIT = [1520700, 1351700, 1295400, 1189800, 1021300, 573900];
  CHARGE_TABLE = [
    [14750, 22640, 30370, 38340, 43570, 48170, 52400, 56320]
  ];
}

function calc() { 
  const levelValue = Number(level.value);
  const timeValue = Number(time.value);
  const dateValue = Number(date.value);

  const charge = CHARGE_TABLE[0][timeValue] * dateValue;

  for (let i = 0; i < PROPORTION.length; i++) {
    let row = chargeTable.rows[i];
    row.cells[1].innerHTML =
      (Math.floor((charge * PROPORTION[i]) / 10) * 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  }

  let row = limitTable.rows[0];
  row.cells[0].innerHTML = `${levelValue + 1}등급`;
  row.cells[1].innerHTML = 
  LIMIT[levelValue]
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  row.cells[2].innerHTML =
  charge
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  row.cells[3].innerHTML =
  (LIMIT[levelValue] - charge)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

}

function onSubmit(event) {
  event.preventDefault();
  calc();
}

function init() {
}

form.addEventListener("submit", onSubmit);
document.querySelector("#years > label:nth-child(1)").addEventListener("click", set2020);
document.querySelector("#years > label:nth-child(2)").addEventListener("click", set2021);

init();
