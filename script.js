//Generator Part

let blockid=1;
let size=10;
let arr=[1];
let arrcount=0;
let ans=[];
let check=1;
var checkmat = new Array(size);

for (var i = 0; i < checkmat.length; i++) {
  checkmat[i] = new Array(size).fill(0);
}

document.getElementById("main").style.gridTemplateColumns="repeat("+size+",10px)";
document.getElementById("main").style.gridTemplateRows="repeat("+size+",10px)";
for(let i=1;i<=size*size;i++){
    document.getElementById("main").innerHTML+='<div class="block" id="'+i+'"></div>';
}


checkmat[(blockid-1)%size][(blockid-1)/size]=1;


const next=()=>{
    const num=Math.floor(Math.random()*4);
    if(num==1){
        blockid-=size;
        if(blockid<=0){
            blockid+=(2*size);
        }
    }
    else if(num==2){
        if(blockid%size==0){
            blockid-=1;
        }
        else{
            blockid+=1;
        }
    }
    else if(num==3){
        blockid+=size;
        if(blockid>=(size*size)){
            blockid-=(2*size);
        }
    }
    else{
        if(blockid%size==1){
            blockid+=1;
        }
        else{
            blockid-=1;
        }
    }
}
for (let index = 1; index <= size*size; index++) {
    document.getElementById(index.toString()).style.border="2px solid black";
}

while(1){
    if((blockid-size<=0 || checkmat[(blockid-size-1)%size][(blockid-size-1)/size]) && (blockid+size>=(size*size) || checkmat[(blockid+size-1)%size][(blockid+size-1)/size]) && (blockid%size==1 || checkmat[(blockid-1-1)%size][(blockid-1-1)/size]) && (blockid%size==0 || checkmat[(blockid-1+1)%size][(blockid-1+1)/size])){
        if(blockid-arr[arrcount-1]==size){
            document.getElementById(blockid.toString()).style.borderTop="";
            document.getElementById(arr[arrcount-1].toString()).style.borderBottom="";
        }
        else if(arr[arrcount-1]-blockid==size){
            document.getElementById(blockid.toString()).style.borderBottom="";
            document.getElementById(arr[arrcount-1].toString()).style.borderTop="";
        }
        else if(blockid-arr[arrcount-1]==1){
            document.getElementById(blockid.toString()).style.borderLeft="";
            document.getElementById(arr[arrcount-1].toString()).style.borderRight="";
        }
        else{
            document.getElementById(blockid.toString()).style.borderRight="";
            document.getElementById(arr[arrcount-1].toString()).style.borderLeft="";
        }
        blockid=arr[arrcount-1];
        arrcount--;
        arr.pop();
        if(blockid==1){
            break;
        }
        continue;
    }
    next();
    if(checkmat[(blockid-1)%size][(blockid-1)/size]){
        blockid=arr[arrcount];
    }
    else{
        checkmat[(blockid-1)%size][(blockid-1)/size]=1;
        arr.push(blockid);
        arrcount++;
        if((blockid==size*size) && check){
            check=0;
            for(let ind=0;ind<=arrcount;ind++){
                ans.push(arr[ind]);
            }
        }
    }

    if(arr.lenth==0){
        break;
    }
}



//Solver Part

const checkwin= ()=>{
    let count=0;
    for(let i=0;i<ans.length;i++){
        if(document.getElementById(ans[i].toString()).style.backgroundColor!="red"){
            return false;
        }
    }
    for(let i=1;i<=size*size;i++){
        if(document.getElementById(i.toString()).style.backgroundColor=="red"){
            count++;
        }
    }
    if(count==ans.length){
        return true;
    }
    else{
        return false;
    }
}

for(let i=1;i<=size*size;i++){
    document.getElementById(i.toString()).addEventListener('mouseover',()=>{
        if(document.getElementById(i.toString()).style.backgroundColor=="red"){
            document.getElementById(i.toString()).style.backgroundColor=="white";
        }
        else{
            document.getElementById(i.toString()).style.backgroundColor="red";
        }
        if(checkwin()){
            console.log("Done");
        }
    })
}