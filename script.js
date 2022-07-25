//Generator Part
let countwin = 0;
let countloss = 0;
let size = 3;
let currid=1;
let width=screen.width;
let height=screen.height;
console.log(height);
console.log(width);
let size1;
let size2;
if(height>=(1.5*width )){
    size1=80;
    size2=78;
    size3=3;
}
else{
    size1=40;
    size2=39;
    size3=10;
}
document.getElementsByClassName("buttons").style.fontSize=size3+"vw";
document.getElementById("main").style.gridTemplateColumns = "repeat(" + size + "," + size1 / size + "vw)";
document.getElementById("main").style.gridTemplateRows = "repeat(" + size + "," + size1 / size + "vw)";
for (let i = 1; i <= size * size; i++) {
    document.getElementById("main").innerHTML += '<div class="block" id="' + i + '"></div>';
}
var checkmat;
let ans;
let arr;
const reset = () => {
    let blockid = 1;
    arr = [1];
    let arrcount = 0;
    ans = [];
    let check = 1;
    checkmat = new Array(size);
    

    for (var i = 0; i < checkmat.length; i++) {
        checkmat[i] = new Array(size).fill(0);
    }

    for (let i = 1; i <= size * size; i++) {
        document.getElementById(i.toString()).style.innerHTML="";
    }

    document.getElementById((1).toString()).innerText = "S";
    document.getElementById((size * size).toString()).innerText = "E";
    document.getElementById((1).toString()).style.fontSize = size2 / size + "vw";
    document.getElementById((size * size).toString()).style.fontSize = size2 / size + "vw";

    checkmat[(blockid - 1) % size][(blockid - 1) / size] = 1;


    const next = () => {
        const num = Math.floor(Math.random() * 4);
        if (num == 1) {
            blockid -= size;
            if (blockid <= 0) {
                blockid += (2 * size);
            }
        }
        else if (num == 2) {
            if (blockid % size == 0) {
                blockid -= 1;
            }
            else {
                blockid += 1;
            }
        }
        else if (num == 3) {
            blockid += size;
            if (blockid >= (size * size)) {
                blockid -= (2 * size);
            }
        }
        else {
            if (blockid % size == 1) {
                blockid += 1;
            }
            else {
                blockid -= 1;
            }
        }
    }
    for (let index = 1; index <= size * size; index++) {
        document.getElementById(index.toString()).style.border = "2px solid black";
    }

    while (1) {
        if ((blockid - size <= 0 || checkmat[(blockid - size - 1) % size][(blockid - size - 1) / size]) && (blockid + size >= (size * size) || checkmat[(blockid + size - 1) % size][(blockid + size - 1) / size]) && (blockid % size == 1 || checkmat[(blockid - 1 - 1) % size][(blockid - 1 - 1) / size]) && (blockid % size == 0 || checkmat[(blockid - 1 + 1) % size][(blockid - 1 + 1) / size])) {
            if (blockid - arr[arrcount - 1] == size) {
                document.getElementById(blockid.toString()).style.borderTop = "";
                document.getElementById(arr[arrcount - 1].toString()).style.borderBottom = "";
            }
            else if (arr[arrcount - 1] - blockid == size) {
                document.getElementById(blockid.toString()).style.borderBottom = "";
                document.getElementById(arr[arrcount - 1].toString()).style.borderTop = "";
            }
            else if (blockid - arr[arrcount - 1] == 1) {
                document.getElementById(blockid.toString()).style.borderLeft = "";
                document.getElementById(arr[arrcount - 1].toString()).style.borderRight = "";
            }
            else {
                document.getElementById(blockid.toString()).style.borderRight = "";
                document.getElementById(arr[arrcount - 1].toString()).style.borderLeft = "";
            }
            blockid = arr[arrcount - 1];
            arrcount--;
            arr.pop();
            if (blockid == 1) {
                break;
            }
            continue;
        }
        next();
        if (checkmat[(blockid - 1) % size][(blockid - 1) / size]) {
            blockid = arr[arrcount];
        }
        else {
            checkmat[(blockid - 1) % size][(blockid - 1) / size] = 1;
            arr.push(blockid);
            arrcount++;
            if ((blockid == size * size) && check) {
                check = 0;
                for (let ind = 0; ind <= arrcount; ind++) {
                    ans.push(arr[ind]);
                }
            }
        }

        if (arr.lenth == 0) {
            break;
        }
    }
    currid=1;
    document.getElementById(currid.toString()).classList.add("color");
}


reset();
//Solver Part

const checkwin = () => {
    let count = 0;
    for (let i = 0; i < ans.length; i++) {
        if (!document.getElementById(ans[i].toString()).classList.contains("color")) {
            return false;
        }
    }
    for (let i = 1; i <= size * size; i++) {
        if (document.getElementById(i.toString()).classList.contains("color")) {
            count++;
        }
    }
    if (count == ans.length) {
        return true;
    }
    else {
        return false;
    }
}

for (let i = 1; i <= size * size; i++) {
    document.getElementById(i.toString()).addEventListener('mouseover', () => {
        document.getElementById(i.toString()).classList.add("color");
    })
    document.getElementById(i.toString()).addEventListener('click', () => {
        document.getElementById(i.toString()).classList.remove("color");
    })
}

document.getElementById("check").addEventListener('click', () => {
    if (checkwin()) {
        countwin++;
        document.getElementById("win").innerText = "Win : " + countwin;
    }
    else {
        countloss++;
        size--;
        document.getElementById("loss").innerText = "Loss : " + countloss;
    }
    // for (let i = 1; i <= size * size; i++) {
    //     document.getElementById(i.toString()).classList.remove("color");
    // }
    size++;
    document.getElementById("main").innerHTML="";
    for (let i = 1; i <= size * size; i++) {
        document.getElementById("main").innerHTML += '<div class="block" id="' + i + '"></div>';
    }
    document.getElementById("main").style.gridTemplateColumns = "repeat(" + size + "," + 40 / size + "vw)";
    document.getElementById("main").style.gridTemplateRows = "repeat(" + size + "," + 40 / size + "vw)";
    for (let i = 1; i <= size * size; i++) {
        document.getElementById(i.toString()).addEventListener('mouseover', () => {
            document.getElementById(i.toString()).classList.add("color");
        })
        document.getElementById(i.toString()).addEventListener('click', () => {
            document.getElementById(i.toString()).classList.remove("color");
        })
    }
    reset();
})

const up=()=>{
    if(currid-size>0 && document.getElementById(currid.toString()).style.borderTop==""){
        if(document.getElementById((currid-size).toString()).classList.contains("color")){
            document.getElementById((currid).toString()).classList.remove("color");
            currid-=size;
        }
        else{
            currid-=size;
            document.getElementById((currid).toString()).classList.add("color");
        }
    }
}
const down=()=>{
    if(currid+size<=size*size && document.getElementById(currid.toString()).style.borderBottom==""){
        if(document.getElementById((currid+size).toString()).classList.contains("color")){
            document.getElementById((currid).toString()).classList.remove("color");
            currid+=size;
        }
        else{
            currid+=size;
            document.getElementById((currid).toString()).classList.add("color");
        }
    }
}
const left=()=>{
    if(currid%size!=1 && document.getElementById(currid.toString()).style.borderLeft==""){
        if(document.getElementById((currid-1).toString()).classList.contains("color")){
            document.getElementById((currid).toString()).classList.remove("color");
            currid-=1;
        }
        else{
            currid-=1;
            document.getElementById((currid).toString()).classList.add("color");
        }
    }
}
const right=()=>{
    if(currid%size!=0 && document.getElementById(currid.toString()).style.borderRight==""){
        if(document.getElementById((currid+1).toString()).classList.contains("color")){
            document.getElementById((currid).toString()).classList.remove("color");
            currid+=1;
        }
        else{
            currid+=1;
            document.getElementById((currid).toString()).classList.add("color");
        }
    }
}

window.addEventListener('keydown',(event)=>{
    let code=event.code;
    if(code=="ArrowRight"){
        right();
    }
    if(code=="ArrowLeft"){
        left();
    }
    if(code=="ArrowUp"){
        up();
    }
    if(code=="ArrowDown"){
        down();
    }
    if(code=="Enter"){
        document.getElementById("check").click();
    }
    if(code=="Backspace"){
        document.getElementById("reset").click();
    }
})

document.getElementById("left").addEventListener('click', () => {
    left();
})
document.getElementById("right").addEventListener('click', () => {
    right();
})
document.getElementById("up").addEventListener('click', () => {
    up();
})
document.getElementById("down").addEventListener('click', () => {
    down();
})

document.getElementById("reset").addEventListener('click', () => {
    for (let i = 1; i <= size * size; i++) {
        document.getElementById(i.toString()).classList.remove("color");
    }
    currid=1;
    document.getElementById(currid.toString()).classList.add("color");
})