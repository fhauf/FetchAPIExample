const myDiv = document.getElementById("ship");
//const myButton = myDiv.querySelector("button");
const myButton = document.getElementById("oneShip");
const manyShipsButton = document.getElementById("multipleShips");
const highlightSienar = document.getElementById("highlight");
const refreshPage = document.getElementById("refresh");

myButton.addEventListener("click", getOneShip);
manyShipsButton.addEventListener("click", getManyShips);
highlightSienar.addEventListener("click", highlight);
refreshPage.addEventListener("click", refresh);

function refresh() {
    location.reload();
}

function getOneShip() {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    console.log(`URL to fetch from is https://swapi.dev/api/starships/${randomNum}/`);
    fetch(`https://swapi.dev/api/starships/${randomNum}/`)
        .then(data => data.json())
        .then(jsonData => {
            console.log(jsonData);
            populateShip(0, jsonData);
        })
        .catch(err => console.log(err.message));
}

// function getManyShips() {
//     fetch(`https://swapi.dev/api/starships/`)
//         .then(data => data.json())
//         .then(ships => fetch(ships.next))   // fetches the next page of ships
//         .then(moreShips => moreShips.json())    // Converts next page to json object
//         .then(d => console.log(d))
//         .catch(err => console.log(err.message));
// }
function getManyShips() {
    fetch(`https://swapi.dev/api/starships/`)
        .then(data => data.json())
        .then(ships => processShips(ships.results))  // function to handle array
        .catch(err => console.log(err.message));
}

function processShips(shipsArray) {
    for (const [index, prop] of shipsArray.entries()) {
        populateShip(index, prop);
    }
}

// function populateShip(shipObj) {
//     console.log(shipObj);
//     const newParagraph = document.createElement("p");
//     newParagraph.innerText = shipObj.name;
//     myDiv.appendChild(newParagraph);
// }
// function populateShip({name}) {
//     const newParagraph = document.createElement("p");
//     newParagraph.innerText = name;
//     myDiv.appendChild(newParagraph);
// }
// function populateShip(shipObj) {
//     const { name, crew, model, manufacturer, length, starship_class } = shipObj;
//     const myShipDiv = document.createElement("div");
//     const shipPara = `
//         <h1>${name}</h1>
//         <p>
//             The ${name} is manufactured by ${manufacturer}, its model number is ${model}, it has a crew of ${crew}, its length is ${length}, and its class is ${starship_class}
//         </p>
//     `
//     myShipDiv.innerHTML = shipPara;
//     myDiv.appendChild(myShipDiv);
// }
function populateShip(index, shipObj) {
    const { name, crew, model, manufacturer, length, starship_class } = shipObj;

    if (name === undefined) {
        const noShipDiv = `
        <div class="starship">
            <h1>API did not return a Ship!</h1>
        </div>
        `
        myDiv.insertAdjacentHTML("beforeend", noShipDiv);
    } else {

        let lengthString = parseInt(length).toLocaleString();
            
        const myShipDiv = `
            <div class="starship" data-shipID=${index} data-shipbuilder=${manufacturer}>
                <h1>${name}</h1>
                <p>
                    The ${name} is manufactured by ${manufacturer}, its model number is ${model}, it has a crew of ${crew}, its length is ${lengthString}, and its class is ${starship_class}
                </p>
            </div>
        `
        myDiv.insertAdjacentHTML("beforeend", myShipDiv);
    }
}

function highlight() {
    const allShipDivs = document.querySelectorAll(".starship")  // Get all elements with a class of starship
    for (const prop of allShipDivs) {
        if (prop.dataset.shipbuilder === "Sienar") {
            prop.classList.toggle("highlight");
        }
    }
}