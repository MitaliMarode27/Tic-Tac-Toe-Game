let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg");
let msg = document.querySelector("#msg");
let draw = document.querySelector(".draw");
let tie = document.querySelector("#tie");

let turnO = true;
let count = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    count = 0;
    msgcontainer.classList.add("hide");
    draw.classList.add("hide");
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
    });
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const drawMatch = () => {
    msg.innerText = `Match is Tie, Play Again!`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let i of winPatterns) {
        let pos1val = boxes[i[0]].innerText;
        let pos2val = boxes[i[1]].innerText;
        let pos3val = boxes[i[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return;
            }
        }
    }
    if (count === 9) {
        drawMatch();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            count++;
            checkWinner();
        }
    });
});

newbtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);