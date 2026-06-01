let boxes = document.querySelectorAll(".boxes");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#new-game");
let msg = document.querySelector("#msg");
let msgBox = document.querySelector(".msg-box");

let correctPatterns = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]]

let turn = true;
let count = 0;
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
    if(turn){
        box.innerText = "X";
        turn = false;
    }else{
        box.innerText = "O";
        turn = true;
    }
    box.disabled = true;
    count++;
    let isWinner = check();
    if(count === 9 && !isWinner){
        draw();
    }
    
})
});

let check = ()=>{
    for(let pattern of correctPatterns){
        let box1val = boxes[pattern[0]].innerText;
        let box2val = boxes[pattern[1]].innerText;
        let box3val = boxes[pattern[2]].innerText;
        if(box1val  !=="" && box2val !== "" && box3val != ""){
            if(box1val === box2val && box2val === box3val){
                showWinner(box1val);
                return true;
            }
        }
    }
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, the Winner is "${winner}"`;
    disableBoxes();
    msgBox.classList.remove("hide");
}

const draw = ()=>{
    msg.innerText = `Great Fight! It's a Tie!`;
    disableBoxes();
    msgBox.classList.remove("hide");
}

const reset = ()=>{
    count = 0;
    turn = true;
    msgBox.classList.add("hide");
    enableBoxes();
}

resetBtn.addEventListener("click", reset);
newGame.addEventListener("click", reset);