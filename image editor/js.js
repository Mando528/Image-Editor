var filePick = document.querySelector("#filePick");
var img = document.querySelector("#img");
var chooseImg = document.querySelector("#chooseImg");
var filter = document.querySelectorAll(".options .btns .btn");
var rotateFlip = document.querySelectorAll(".options .rotate_flip .btns .bttn");
var precentage = document.querySelector("#precentage");
var range = document.querySelector("#range");
var reset = document.querySelector("#reset");
var saveImg = document.querySelector("#saveImg");

let brightness = 100 , saturation = 100 , inversion = 0 , grayscale=0;
let rotate=0;
let flipHor = 1 , flipVer=1;



const applyFilter=() =>{
    if(rotate === 360 || rotate === -360  ){
        rotate=0;
    }
    if(rotate === 90 || rotate === 270 ||rotate === -90 || rotate === -270){
        img.style.width="305px";
    }
    else{
        img.style.width="100%";
    }

    img.style.transform=`rotate(${rotate}deg) scale(${flipHor} , ${flipVer})`;

    img.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)` 
}

chooseImg.addEventListener("click",()=>{
    filePick.click();
})

filePick.addEventListener("change",()=>{
    let file = filePick.files[0];
    if(!file){return;}
    img.src=URL.createObjectURL(file);
})

img.addEventListener("load",()=>{
    document.querySelector(".disable").classList.remove("disable");
})

filter.forEach(option =>{
    option.addEventListener("click",()=>{
            document.querySelector(".options .btns .active").classList.remove("active");
            option.classList.add("active");
            document.querySelector("#selectedBtn").innerHTML=option.textContent;
            if(option.id==="brightness"){
                range.max="200"
                range.value=brightness;
                precentage.innerHTML=brightness+"%";
            }
            else if(option.id==="saturation"){
                range.max="200"
                range.value=saturation;
                precentage.innerHTML=saturation+"%";
            }
            else if(option.id==="inversion"){
                range.max="100"
                range.value=inversion;
                precentage.innerHTML=inversion+"%";
            }
            else{
                range.max="100"
                range.value=grayscale;
                precentage.innerHTML=grayscale+"%";
            }
    })
})

range.addEventListener("input",()=>{
        precentage.innerHTML= range.value +"%";
        
        var selectedFilter = document.querySelector(".active");
        if(selectedFilter.id==="brightness"){
            brightness=range.value;
        }
        else if(selectedFilter.id==="saturation"){
            saturation=range.value;
        }
        else if(selectedFilter.id==="inversion"){
            inversion=range.value;
        }
        else{
            grayscale=range.value;
        }
        applyFilter();
})

rotateFlip.forEach(option =>{
    option.addEventListener("click",()=>{
        if(option.id==="rotLeft"){
            rotate-=90;
            
        }
        else if(option.id==="rotRight"){
            rotate+=90;
        }
        else if(option.id==="refVer"){
            if(flipVer===1){
                flipVer=-1;
            }
            else{
                flipVer=1;
            }
        }
        else{
            if(flipHor===1){
                flipHor=-1;
            }
            else{
                flipHor=1;
            }
        }
        applyFilter();
    })
})

reset.addEventListener("click",()=>{
    brightness=100 , saturation = 100 , inversion = 0 , grayscale=0;
    rotate=0 ,flipHor = 1 , flipVer=1;

    filter[0].click();
    applyFilter();
})

saveImg.addEventListener("click",()=>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width=img.naturalWidth;
    canvas.height=img.naturalHeight;

    ctx.translate(canvas.width/2,canvas.height/2);
    if(rotate!==0){
        ctx.rotate(rotate*Math.PI/180);
    }

    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.scale(flipHor,flipVer);
    ctx.drawImage(img,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);

    const link = document.createElement("a");
    link.download="image";
    link.href=canvas.toDataURL();
    link.click();
})

