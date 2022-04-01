let CHARGE_TABLE = [
    74850, 69450, 64040, 64040, 64040, 64040,
];
const PROPORTION = [0.20, 0.12, 0.08];
let settings = {
    mealCharge: 2500,
    snackCharge: 500,
    snack: 2
}

const table = document.querySelector("#charge"),
    form = document.querySelector("#inputForm"),
    level = document.querySelector("#level"),
    date = document.querySelector("#date"),
    setButtom = document.querySelector("#setButton"),
    saveButtom = document.querySelector("#setSave"),
    inputMeal = document.querySelector("#inputMeal"),
    inputSnack = document.querySelector("#inputSnack"),
    snackTime = document.querySelector("#snackTime");

function set2020() {
    CHARGE_TABLE = [
        70990, 65870, 60740, 60740, 60740, 60740,
    ];
}

function set2021() {
    CHARGE_TABLE = [
        71900, 66710, 61520, 61520, 61520, 61520,
    ];
}

function loadSet() {
    const loadedSettings = localStorage.getItem("settings_s");

    if (loadedSettings !== null) {
        const parsedSettings = JSON.parse(loadedSettings);
        settings.mealCharge = Number(parsedSettings.mealCharge);
        settings.snackCharge = Number(parsedSettings.snackCharge);
        settings.snack = Number(parsedSettings.snack);
    }

}

function saveSet() {
    localStorage.setItem("settings_s", JSON.stringify(settings));
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
    let meal = 3;
    const dateValue = Number(date.value);

    const noneSalary = (settings.mealCharge * meal + settings.snackCharge * settings.snack) * dateValue;
    const Salary = CHARGE_TABLE[levelValue] * dateValue;

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
