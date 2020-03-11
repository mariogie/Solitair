/*
 * Solitair
 * with Java-Script
 *
 * develloped by M. Giessler
 *
 * Version 1.0 (between May, 27th and June, 7th)
 *
 */

// declare Global variables
let buttonId, oldButton;
let click = 0;
let pinPos = [];
let noPin = [];
let up, down, right, left, checkedPin;
let upCache, downCache, rightCache, leftCache;
let pins = 32;

// watch on every CLICK
document.addEventListener("click", set);

drawBoard();

const $ =element=>document.querySelector(element);

// draw the Gameboard inside of the div with id "main_container"
function drawBoard() {
    let parentContainer = document.getElementById('main_container');
    let newTable = document.createElement('table');
    let newRow = document.createElement('tr');
    let mainFrame = document.createElement('div');
    mainFrame.id = "main_frame";
    parentContainer.appendChild(mainFrame);
    let headline = document.createElement('div');
    headline.id = "headline";
    headline.innerHTML = "Solitair";
    mainFrame.appendChild(headline);
    mainFrame.appendChild(newTable);
    let info = document.createElement('div');
    info.id = "display_info";
    mainFrame.appendChild(info);

    for (j = 0; j < 20; j = j + 10) { // nicht benötigte Pins entfernen
        for (i = 10; i < 12; i++)
        {
            let pin = i + j;

            noPin[pin] = 0;
            noPin[pin + 5] = 0;
            noPin[pin + 50] = 0;
            noPin[pin + 55] = 0;
        }
    }

/*
 * write all Positions for the Pins on Board in an Array
 * this Array is used to check the Moves during the Game
 */

    for (j = 0; j < 70; j = j + 10) {
        let newRow = document.createElement('tr');

        newTable.appendChild(newRow);

        for (i = 10; i < 17; i++)
        {
            let  pin = i + j;
            if (noPin[pin] !== 0) {

                pinPos[pin] = '1';

                let newCol = document.createElement("td");
                newRow.appendChild(newCol);
                let newButton = document.createElement("BUTTON");
                newButton.id = pin;
                newCol.appendChild(newButton);
            } else
            {
                let newCol = document.createElement("td");
                newRow.appendChild(newCol);
            }
        }
    }

// the Pin in the middle must be removed
    pinPos[43] = 0;
    document.getElementById('43').classList.add("hide");

    pinsLeft();
}

/*
 * this Function check all available Moves for the choosed Pin
 */

function checkRange(buttonId) {

    if (pinPos[buttonId] == 1 ? checkedPin = true : checkedPin = false)
        ;
    if (pinPos[buttonId - 10] == 1 && pinPos[buttonId - 20] == 0 ? up = true : up = false)
        ;
    if (pinPos[buttonId - 1] == 1 && pinPos[buttonId - 2] == 0 ? left = true : left = false)
        ;
    if (pinPos[buttonId + 10] == 1 && pinPos[buttonId + 20] == 0 ? down = true : down = false)
        ;
    if (pinPos[buttonId + 1] == 1 && pinPos[buttonId + 2] == 0 ? right = true : right = false)
        ;

    if (checkedPin === true) {
        if (up === true || down === true || left === true || right === true) {
            return true;
        } else {
            return false;
        }
        return false;
    }
}

// set the chosen Pins an watch on clicks
function set() {
    buttonId = Number(event.target.id);

    if (click == 0) {
        oldButton = Number(buttonId);
        if (checkRange(buttonId) == true) {
            event.target.classList.remove("hide");
            event.target.classList.remove("deselect");
            event.target.classList.add("select");
            click = 1;
            upCache = up;
            downCache = down;
            rightCache = right;
            leftCache = left;
        }

    } else if (click == 1 && oldButton !== buttonId) {
        let move = buttonId - oldButton;
        event.target.classList.remove("select");
        event.target.classList.remove("deselect");

        if (move === 20 && downCache == true)
        {
            document.getElementById(buttonId - 10).classList.add("hide");
            click = 0;
            event.target.classList.remove("hide");
            event.target.classList.add("deselect");
            document.getElementById(oldButton).classList.add("hide");
            pinPos[oldButton] = 0;
            pinPos[buttonId - 10] = 0;
            pinPos[buttonId] = 1;
            pins--;
        }

        if (move === -20 && upCache == true)
        {
            event.target.classList.remove("hide");
            event.target.classList.add("deselect");
            document.getElementById(oldButton - 10).classList.add("hide");
            click = 0;

            document.getElementById(oldButton).classList.add("hide");
            pinPos[oldButton] = 0;
            pinPos[buttonId + 10] = 0;
            pinPos[buttonId] = 1;
            pins--;
        }
        if (move === 2 && rightCache == true)
        {
            document.getElementById(buttonId - 1).classList.add("hide");
            click = 0;
            event.target.classList.remove("hide");
            event.target.classList.add("deselect");
            document.getElementById(oldButton).classList.add("hide");
            pinPos[oldButton] = 0;
            pinPos[buttonId - 1] = 0;
            pinPos[buttonId] = 1;
            pins--;
        }

        if (move === -2 && leftCache === true)
        {
            event.target.classList.remove("hide");
            event.target.classList.add("deselect");
            document.getElementById(oldButton - 1).classList.add("hide");
            click = 0;

            document.getElementById(oldButton).classList.add("hide");
            pinPos[oldButton] = 0;
            pinPos[buttonId + 1] = 0;
            pinPos[buttonId] = 1;
            pins--;

        }
    } else if (click == 1 && oldButton == buttonId) {
        event.target.classList.remove("select");
        event.target.classList.add("deselect");
        click = 0;
    }
    pinsLeft();
}

/*
 * How many Pins are left on Board?
 * and how many Moves are available at this time?
 */
function pinsLeft() {
    let movesLast = 0;
    for (j = 0; j < 70; j = j + 10) { // Positionsraster für die Pins erstellen
        for (i = 10; i < 17; i++)
        {
            let  pin = i + j;

            if (checkRange(pin) == true) {
                movesLast++;
            }
        }
    }
    let displayInfo = "";
    if (movesLast !== 0 ? displayInfo += "Es sind derzeit " + movesLast + " Züge möglich!" : displayInfo += "Keine ZÜGE mehr vorhanden")
        ;

    displayInfo += "<br>Du hast noch " + pins + " Spielsteine übrig.";

    document.getElementById("display_info").innerHTML = displayInfo;
}
