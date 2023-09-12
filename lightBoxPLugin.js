"use strict";


// Default Function that runs Init function
export default function(className){
    activatePlugin(className);
    console.log("plugin installed successfully");
}


// Function attaching html code

let html_code = '<div id="lightBox"><div id="closeContainer"><button id="closeTab"><div><div></div></div></button></div><div id="imageContainer"><button id="prevImgBtn"><div></div></button><img src="" alt=""><button id="nextImgBtn"><div></div></button></div><div id="bottomIndicator"></div></div>';

function attachHtmlCode(){
    // Create a div element
    let container = document.createElement('div');
    container.style.visibility = 'hidden';

    // Adding container at the starting of body 
    let firstEle = document.body.firstElementChild;
    document.body.insertBefore(container,firstEle);

    // Add Html code to container
    container.innerHTML = html_code;

    return container
}




// Attaching containers to bottom indicators

function addBottomContainers(num){
    let bottomIndicator = document.querySelector('#lightBox #bottomIndicator');
    let arr = [];
    for(let i=0;i<num;i++){
        let cont = document.createElement('div');
        bottomIndicator.appendChild(cont);
        arr.push(cont);
    }

    return arr;
}


// Change preview attribute and add Indicator style

function changepreview(image,indicator){
    preview.setAttribute('src',image.getAttribute("src"));
    indicator.style.width = '1.3vh';
    indicator.style.height = '1.3vh';
    indicator.style.backgroundColor = 'var(--button-color)';
}



// remove Indicator style

function remIndStle(){
    bottomConts[currentImg].style.width = '1vh';
    bottomConts[currentImg].style.height = '1vh';
    bottomConts[currentImg].style.backgroundColor = 'transparent';
}


// close Btn Animation applier
function closeAnimate(status,...args){
    if(status){
        closeBtn.firstElementChild.style.animation = `${args[0]} ${args[2]}s`;
        closeBtn.firstElementChild.firstElementChild.style.animation = `${args[1]} ${args[2]}s`;

        closeBtn.firstElementChild.style.animationDirection = args[3];
        closeBtn.firstElementChild.firstElementChild.style.animationDirection = args[3];

        setTimeout(() => closeAnimate(false), args[2]*1000);
    }
    else{
        closeBtn.firstElementChild.style.animation = "none";
        closeBtn.firstElementChild.firstElementChild.style.animation = "none";
    }
}



// Attaching eventListeners to each images

let currentImg = -1;

function addAction(){
    for(let i = 0; i<imgLength; i++){
        images[i].style.cursor = 'pointer';
        images[i].addEventListener('click',function(){
            container.style.visibility = 'visible';
            changepreview(this,bottomConts[i]);
            lightBox.style.animation = 'lightBoxPopUp 0.4s';
            closeAnimate(true,"openCross1","openCross2",0.4,"normal");
            currentImg = i;
        });
    }

    return preview;
}


// Close Light-Box
function closePrompt(){
    lightBox.style.animation = 'lightBoxShrinkDown 0.4s';
    setTimeout(() => container.style.visibility = 'hidden', 350);
    remIndStle();
}



// KeyFeatures
function keyFeatures(key){
    if(key.key =='Escape'){
        closePrompt();
    }else if(key.key =='ArrowLeft'){
        enableNavigation(-1);
    }else if(key.key =='ArrowRight'){
        enableNavigation(1);
    }
}


// Get Next Image after navigation

function getNewImgInd(status){
    let ind = currentImg;
    status>0 ? ind ++ : ind --;

    if(ind<0){
        ind = imgLength-1;
    }else if(ind>=imgLength){
        ind = 0;
    }

    return ind;
}


// Change Image
function changeImage(newImg,dir){
    changepreview(images[newImg],bottomConts[newImg]);
    remIndStle();
    currentImg = newImg;
    closeAnimate(true,"openCross1","openCross2",0.4,dir);
}



// Nav function

function enableNavigation(status){
    let newImg = getNewImgInd(status);
    let dir = status>0?"normal":"reverse";
    changeImage(newImg,dir);
}


// Navigation
function navigation(){
    let prev = document.querySelector('#lightBox #imageContainer #prevImgBtn');
    let next = document.querySelector('#lightBox #imageContainer #nextImgBtn');

    
    prev.addEventListener('click',() => enableNavigation(-1));
    prev.addEventListener('mousedown',function(){
        this.style.transform = 'scale(0.9)';
        this.style.filter = 'none';
        this.style.borderRightColor = 'var(--button-color)';
    });
    prev.addEventListener('mouseup',function(){
        this.style.transform = 'scale(1)';
    });
    
    
    next.addEventListener('click',() => enableNavigation(1));
    next.addEventListener('mousedown',function(){
        this.style.transform = 'scale(0.9) rotate(180deg)';
        this.style.borderRightColor = 'var(--button-color)';
    });
    next.addEventListener('mouseup',function(){
        this.style.transform = 'scale(1) rotate(180deg)';
    });
    
    if(imgLength == 1){
        prev.style.visibility = 'hidden';
        next.style.visibility = 'hidden';
    }
}

// Navigation through Bottom indicators
function addIndicatorAction(length){
    for(let i=0;i<length;i++){
        bottomConts[i].addEventListener('click',function(){
            if(currentImg!=i){
                let dir = currentImg<i?"normal":"reverse";
                changeImage(i,dir);
            }
        });
    }
}


// Init Function

let imgLength, images, container, lightBox, closeBtn, preview, bottomConts, bottomIndicator;

function activatePlugin(className){

    // Attach HTMl Code
    container = attachHtmlCode();

    // Get all images with given className
    images = document.getElementsByClassName(className);
    imgLength = images.length;

    // Attaching containers to bottom indicators
    bottomConts = addBottomContainers(imgLength)

    // Close Button Function
    lightBox = document.getElementById('lightBox');
    closeBtn = document.querySelector('#lightBox #closeContainer button');
    closeBtn.addEventListener('click',closePrompt);

    // Attaching eventListeners to each images
    preview = document.querySelector('#lightBox #imageContainer img');
    addAction();

    // Navigate
    navigation();

    // KeyFeatures
    window.addEventListener('keydown',keyFeatures);

    // Navigation through Bottom indicators
    addIndicatorAction(imgLength);
}