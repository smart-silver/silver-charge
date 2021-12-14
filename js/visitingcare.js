let LIMIT = [1520700, 1351700, 1295400, 1189800, 1021300, 573900];
let CHARGE_TABLE = [
    [14750, 22640, 30370, 38340, 43570, 48170, 52400, 56320]
];
const PROPORTION = [0.15, 0.09, 0.06];

function setPre(event) {
    conYear = "2021";
    LIMIT = [1520700, 1351700, 1295400, 1189800, 1021300, 573900];
    CHARGE_TABLE = [
        [14750, 22640, 30370, 38340, 43570, 48170, 52400, 56320]
    ];
}

function setPost(event) {
    conYear = "2022";
    LIMIT = [1672700, 1486800, 1350800, 1244900, 1068500, 597600];
    CHARGE_TABLE = [
        [15430, 22380, 30170, 38390, 44770, 50400, 56170, 61950]
    ];
}

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
document.querySelector("#years > label:nth-child(1)").addEventListener("click", setPre);
document.querySelector("#years > label:nth-child(2)").addEventListener("click", setPost);
init();
