let blockid=1;
let size=20;
let arr=[1];
let arrcount=0;

document.getElementById("main").style.gridTemplateColumns="repeat("+size+",30px)";
document.getElementById("main").style.gridTemplateRows="repeat("+size+",30px)";
for(let i=1;i<=size*size;i++){
    document.getElementById("main").innerHTML+='<div class="block" id="'+i+'">'+i+'</div>';
}


document.getElementById((blockid).toString()).style.backgroundColor='red'


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
    if((blockid-size<=0 || document.getElementById((blockid-size).toString()).style.backgroundColor=='red') && (blockid+size>=(size*size) || document.getElementById((blockid+size).toString()).style.backgroundColor=='red') && (blockid%size==1 || document.getElementById((blockid-1).toString()).style.backgroundColor=='red') && (blockid%size==0 || document.getElementById((blockid+1).toString()).style.backgroundColor=='red')){
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
    if(document.getElementById(blockid.toString()).style.backgroundColor=='red'){
        blockid=arr[arrcount];
    }
    else{
        document.getElementById(blockid.toString()).style.backgroundColor='red';
        arr.push(blockid);
        arrcount++;
    }

    if(arr.lenth==0){
        break;
    }
}