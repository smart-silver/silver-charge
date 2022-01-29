let LIMIT = [1672700, 1486800, 1350800, 1244900, 1068500, 597600];
let CHARGE_TABLE = [
    [29560, 36950, 49530, 61600, 67870, 72780],
    [57370, 34210, 45880, 57070, 62870, 67420],
    [25260, 31580, 42350, 52690, 58080, 62280],
    [24110, 30140, 40910, 51250, 56620, 60840],
    [22960, 28700, 39450, 49790, 55180, 59400],
    [22960, 28700, 39450, 49790, 49790, 49790],
];
const PROPORTION = [0.15, 0.09, 0.06];
let VISIT_CHARGE_TABLE = [
    [15430, 22380, 30170, 38390, 44770, 50400, 56170, 61950]
];

let settings = {
    mealCharge: 2500,
    snackCharge: 500,
    snack: 2
}

const table = document.querySelector("#charge"),
    limitTable = document.querySelector("#limit"),
    visitTable = document.querySelector("#visit"),
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
    const loadedSettings = localStorage.getItem("settings_d");

    if (loadedSettings !== null) {
        const parsedSettings = JSON.parse(loadedSettings);
        settings.mealCharge = Number(parsedSettings.mealCharge);
        settings.snackCharge = Number(parsedSettings.snackCharge);
        settings.snack = Number(parsedSettings.snack);
    }

}

function saveSet() {
    localStorage.setItem("settings_d", JSON.stringify(settings));
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
            (Math.floor(Salary * PROPORTION[i] / 10) * 10)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
        row.cells[2].innerHTML =
            (Math.floor(noneSalary / 10) * 10)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
        row.cells[3].innerHTML =
            (Math.floor(noneSalary / 10) * 10 + Math.floor(Salary * PROPORTION[i] / 10) * 10)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    }

    // 한도
    let limitTimes;
    if (timeValue >= 3 && dateValue >= 15) {
        limitTimes = 1.2;
        document.querySelector("body > div.container > div.alert.alert-info").hidden = false;
    } else {
        limitTimes = 1;
        document.querySelector("body > div.container > div.alert.alert-info").hidden = true;
    }
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
        (LIMIT[levelValue] * limitTimes - (Salary))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

    // 방문
    const strs = ["60분 이상", "90분 이상"]
    const visitDays60 = Math.floor((LIMIT[levelValue] * limitTimes - (Salary)) / VISIT_CHARGE_TABLE[0][1]);
    const visitDays90 = Math.floor((LIMIT[levelValue] * limitTimes - (Salary)) / VISIT_CHARGE_TABLE[0][2]);
    visitTable.rows[0].cells[1].innerHTML = `${strs[0]} ${visitDays60}일(${(visitDays60 * VISIT_CHARGE_TABLE[0][1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원)`;
    visitTable.rows[1].cells[1].innerHTML = `${strs[1]} ${visitDays90}일(${(visitDays90 * VISIT_CHARGE_TABLE[0][2]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원)`;
    visitTable.rows[0].cells[2].innerHTML =
        (LIMIT[levelValue] * limitTimes - (Salary) - visitDays60 * VISIT_CHARGE_TABLE[0][1])
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    visitTable.rows[1].cells[2].innerHTML =
        (LIMIT[levelValue] * limitTimes - (Salary) - visitDays90 * VISIT_CHARGE_TABLE[0][2])
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    `${strs[1]} ${visitDays90}일(${(visitDays90 * VISIT_CHARGE_TABLE[0][2]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원)`;
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
