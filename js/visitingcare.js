let LIMIT = [1885000, 1690000, 1417200, 1306200, 1121100, 624600];
let CHARGE_TABLE = [
    [16630, 24120, 32510, 41380, 48250, 54320, 60530, 66770]
];
const PROPORTION = [0.15, 0.09, 0.06];

function setPre(event) {
    conYear = "2022";
    LIMIT = [1672700, 1486800, 1350800, 1244900, 1068500, 597600];
    CHARGE_TABLE = [
        [15430, 22380, 30170, 38390, 44770, 50400, 56170, 61950]
    ];
}

function setPost(event) {
    conYear = "2023";
    LIMIT = [1885000, 1690000, 1417200, 1306200, 1121100, 624600];
    CHARGE_TABLE = [
        [16190, 23480, 31650, 40280, 46970, 52880, 58930, 65000]
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
// document.querySelector("#years > label:nth-child(1)").addEventListener("click", setPre);
// document.querySelector("#years > label:nth-child(2)").addEventListener("click", setPost);
init();
