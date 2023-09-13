export class LightBox{

    constructor(className, allowKeyAction = true){
        // Getting all images to be shown by LightBox
        this.currentImg = -1;
        this.images = document.getElementsByClassName(className);
        this.imgLength = this.images.length;


        // HTML code of LightBox
        this.html_code = '<div id="lightBox"><div id="closeContainer"><button id="closeTab"><div><div></div></div></button></div><div id="imageContainer"><button id="prevImgBtn"><div></div></button><img src="" alt=""><button id="nextImgBtn"><div></div></button></div><div id="bottomIndicator"></div></div>';


        // Attach the HTML code to Body
        this.container = document.createElement('div');
        this.#attachHtmlCode()

        this.lightBox = document.getElementById('lightBox');
        this.closeBtn = document.querySelector('#lightBox #closeContainer button');
        this.bottomIndicator = document.querySelector('#lightBox #bottomIndicator');
        this.preview = document.querySelector('#lightBox #imageContainer img');
        this.prev = document.querySelector('#lightBox #imageContainer #prevImgBtn');
        this.next = document.querySelector('#lightBox #imageContainer #nextImgBtn');
        this.bottomConts = [];

        // Attaching containers to bottom indicators
        this.#addBottomContainers();

        // Attaching EventListener to Close Button
        this.closeBtn.addEventListener('click',() => this.#closePrompt());

        // Attaching eventListeners to each images
        this.#addAction();

        // Enabling Navigation Features
        this.#navigation();

        // Allow Navigation through Keys
        if(allowKeyAction){
            this.#keyFeatures();
        }
        
        // Allowing Navigation through Image indicators
        this.#addIndicatorAction();

        console.log("LightBox plugin installed successfully")
    }

    // Function to attach HTML code of lightBox at the start of the body
    #attachHtmlCode(){
        // Add HTML code of LightBox to container
        this.container.innerHTML = this.html_code;

        // Adding container at the starting of body 
        let firstEle = document.body.firstElementChild;
        document.body.insertBefore(this.container,firstEle);

        // Hide The Container by default
        this.container.style.visibility = 'hidden';
    }

    // Function To add image position indicators at the bottom according to the number of images
    #addBottomContainers(){
        for(let i=0;i<this.imgLength;i++){
            let cont = document.createElement('div');
            bottomIndicator.appendChild(cont);
            this.bottomConts.push(cont);
        }
    }

    // Function that Animates LightBox Closing sequence
    #closePrompt(){
        this.lightBox.style.animation = 'lightBoxShrinkDown 0.4s';
        setTimeout(() => this.container.style.visibility = 'hidden', 350);
        this.#remIndStle();
    }

    // Function Resets The Image Indicator At the Bottom to inactive
    #remIndStle(){
        this.bottomConts[this.currentImg].style.width = '1vh';
        this.bottomConts[this.currentImg].style.height = '1vh';
        this.bottomConts[this.currentImg].style.backgroundColor = 'transparent';
    }

    // Function Adds click action to all lightBox images
    #addAction(){
        for(let i = 0; i<this.imgLength; i++){
            this.images[i].style.cursor = 'pointer';
            this.images[i].addEventListener('click',() => {
                this.container.style.visibility = 'visible';
                this.#changepreview(i);
                this.lightBox.style.animation = 'lightBoxPopUp 0.3s';
                this.#closeAnimate(true,"openCross1","openCross2",0.4,"normal");
                this.currentImg = i;
            });
        }
    }


    // Function that changes the display image of the LightBox as well as the ImageIndicator at the bottom
    #changepreview(i){
        this.preview.setAttribute('src',this.images[i].getAttribute("src"));
        this.bottomConts[i].style.width = '1.3vh';
        this.bottomConts[i].style.height = '1.3vh';
        this.bottomConts[i].style.backgroundColor = 'var(--button-color)';
    }


    // function that animates close button
    #closeAnimate(status,...args){
        if(status){
            this.closeBtn.firstElementChild.style.animation = `${args[0]} ${args[2]}s`;
            this.closeBtn.firstElementChild.firstElementChild.style.animation = `${args[1]} ${args[2]}s`;

            this.closeBtn.firstElementChild.style.animationDirection = args[3];
            this.closeBtn.firstElementChild.firstElementChild.style.animationDirection = args[3];

            setTimeout(() => this.#closeAnimate(false), args[2]*1000);
        }
        else{
            this.closeBtn.firstElementChild.style.animation = "none";
            this.closeBtn.firstElementChild.firstElementChild.style.animation = "none";
        }
    }

    // Function that applies click, mouseup and mousedown events to navigational buttons
    #navigation(){
        this.prev.addEventListener('click',() => this.#enableNavigation(-1));
        this.prev.addEventListener('mousedown',() => {
            this.prev.style.transform = 'scale(0.9)';
            this.prev.style.filter = 'none';
            this.prev.style.borderRightColor = 'var(--button-color)';
        });
        this.prev.addEventListener('mouseup',() => {
            this.prev.style.transform = 'scale(1)';
        });
        
        
        this.next.addEventListener('click',() => this.#enableNavigation(1));
        this.next.addEventListener('mousedown',() => {
            this.next.style.transform = 'scale(0.9) rotate(180deg)';
            this.next.style.borderRightColor = 'var(--button-color)';
        });
        this.next.addEventListener('mouseup',() => {
            this.next.style.transform = 'scale(1) rotate(180deg)';
        });
        
        // Hide Navigational buttons if only 1 image is present
        if(this.imgLength == 1){
            this.prev.style.visibility = 'hidden';
            this.next.style.visibility = 'hidden';
        }
    }


    // Function that determines the direction of navigation
    #enableNavigation(status){
        let newImg = this.#getNewImgInd(status);
        let dir = status>0?"normal":"reverse";
        this.#changeImage(newImg,dir);
    }

    // Function that returns the index of to be displayed image
    #getNewImgInd(status){
        let ind = this.currentImg;
        status>0 ? ind ++ : ind --;

        if(ind<0){
            ind = this.imgLength-1;
        }else if(ind>=this.imgLength){
            ind = 0;
        }

        return ind;
    }


    // Function that changes the display image in lightBox
    #changeImage(newImg,dir){
        this.#changepreview(newImg);
        this.#remIndStle();
        this.currentImg = newImg;
        this.#closeAnimate(true,"openCross1","openCross2",0.4,dir);
    }


    // Function Allowing Navigation through Keyboard
    #keyFeatures(){
        window.addEventListener('keydown',(key) => {
            if(key.key =='Escape'){
                this.#closePrompt();
            }else if(key.key =='ArrowLeft'){
                this.#enableNavigation(-1);
            }else if(key.key =='ArrowRight'){
                this.#enableNavigation(1);
            }
        });
    }


    // Function Enablinhg Navigation through Bottom indicators
    #addIndicatorAction(){
        for(let i=0;i<this.imgLength;i++){
            this.bottomConts[i].addEventListener('click',() => {
                if(this.currentImg!=i){
                    let dir = this.currentImg<i?"normal":"reverse";
                    this.#changeImage(i,dir);
                }
            });
        }
    }
}