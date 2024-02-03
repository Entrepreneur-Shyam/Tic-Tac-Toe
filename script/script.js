
import { winingCondition } from "./condition.js";


// Name input function
window.handleSubmit = (event) => {
    let input = event.target.previousElementSibling.value
    let parentDivClass = event.target.parentElement.className;
    if (parentDivClass.includes("player1")) {
        document.querySelector(".player-x h3").textContent = input;

    } else if (parentDivClass.includes("player2")) {
        document.querySelector(".player-o h3").textContent = input
    }
    event.target.previousElementSibling.value = ""
}

// 9 square box added

let board = document.querySelector(".board")
let boardArray = []
for (let i = 0; i <= 8; i++) {
    let boardBox = document.createElement("div");
    boardBox.classList.add('box');
    // boardArray.push(boardBox.outerHTML)
    boardArray.push(`<div class="box"></div>`)
}
board.insertAdjacentHTML("afterbegin", boardArray.join(""))



// Img alter action on click

let imgAlter;
let imgAlterCheck = true;
let signAlter;
let boxObject = {}

var element = document.querySelectorAll(".board .box")




element.forEach((el, i) => {
    el.addEventListener("click", () => {
        if (el.getElementsByTagName("img").length == 0) {

            if (imgAlterCheck) {
                imgAlter = 'X'
                signAlter = "X"
                imgAlterCheck = false

            } else {
                imgAlter = 'O'
                signAlter = "O"
                imgAlterCheck = true
            }

            let imgTag = `<img class="box-img" src="./assets/${imgAlter}.png">`
            el.insertAdjacentHTML("afterbegin", imgTag)
            el.style.transform = "none"
            boxObject[i] = signAlter
            console.log(boxObject)



            for (let i = 0; i <= 7; i++) {

                let winKeysArray = Object.keys(winingCondition[i]);
                let boxObjectKeysArray = Object.keys(boxObject);
                let conditionCheckX = winKeysArray.every(el => boxObjectKeysArray.includes(el) && boxObject[el] === "X")
                let conditionCheckY = winKeysArray.every(el => boxObjectKeysArray.includes(el) && boxObject[el] === "O")
                if (conditionCheckX || conditionCheckY) {
                    checkWinner("Game Over", conditionCheckX, conditionCheckY)
                } else if (Object.keys(boxObject).length === 9) {
                    checkWinner("Match Draw")
                }

            }


        }
    })
})


// Game over 

let gameOver = document.querySelector(".game-over")
let gameResult = document.querySelector(".game-over h2")
let winnerName = document.querySelector(".game-over p")
let restartButton = document.querySelector(".game-over button")


function checkWinner(result, optionX, optionY) {
    gameOver.style.transform = "scale(1)"
    
    if (window.matchMedia("(max-width: 600px) and (max-height: 2500px)").matches) {
        gameOver.style.top = "1%";
     } else {
        gameOver.style.top = "20%"
     }
    gameResult.textContent = `${result}`


    if (optionX) {
        winnerName.textContent = document.querySelector(".player-x h3").textContent + " Won"
        winnerName.style.color = "#1ea1f7"
    } else if (optionY) {
        winnerName.textContent = document.querySelector(".player-o h3").textContent + " Won"
        winnerName.style.color = "#f7bd1e"

    } else {
        winnerName.textContent = "Let's  Play Again"
        winnerName.style.color = "white"

    }

    restartButton.onclick = () => {
        boxObject = {}
        element.forEach(el => {
            if(el.getElementsByTagName("img").length===1){

                el.removeChild(el.getElementsByTagName("img")[0])
                gameOver.style.transform = "scale(0)"
                // imgAlterCheck = true
            }

        })

    }

}

