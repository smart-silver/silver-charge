const CHARGE_TABLE = [
  [14530, 22310, 29920, 37780, 42930, 47460, 51630, 55390]
];
const PROPORTION = [0.15, 0.09, 0.06];
const LIMIT = [1498300, 1331800, 1276300, 1173200, 1007200, 566600];

const chargeTable = document.querySelector("#charge"),
  limitTable = document.querySelector("#limit"),
  form = document.querySelector("#inputForm"),
  level = document.querySelector("#level"),
  time = document.querySelector("#time"),
  date = document.querySelector("#date");

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

init();
