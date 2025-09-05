
// constents for menu and drop down 
const body = document.querySelector("body"),
menu = body.querySelector(".menu-cross"),
navbar = body.querySelector(".navbar-ul"),
cross = body.querySelector(".cross"),
dropbtn = body.querySelector(".dropbtn"),
banerContainer = body.querySelector(".baner-container"),
banerWraper = body.querySelector(".baner-wraper")


document.getElementById("cross").style.display = "none";

let dropbtn_State = false
const mql = window.matchMedia('(max-width: 750px)');

// Menu bar for mobile 
menu.addEventListener("click", () => {
    navbar.classList.toggle("navbar-mob");
    if (navbar.classList.contains("navbar-mob")) {
        document.getElementById("navbar-ul").style.display = "flex";
        document.getElementById("menu").style.display = "none";
        document.getElementById("cross").style.display = "block";

    }
    else {
        document.getElementById("navbar-ul").style.display = "none";
        document.getElementById("menu").style.display = "block";
        document.getElementById("cross").style.display = "none";

    }
});


// Dropdown and Drop content
dropbtn.addEventListener("click", () => {
    if (dropbtn_State == true) {
        document.getElementById("dropdown-content").style.display = "none"
        if (mql.matches) {
            document.getElementById("navbar-ul").style.height = "310px";
        }
        dropbtn_State = false
    }
    else {
        document.getElementById("dropdown-content").style.display = "block"
        if (mql.matches) {
            document.getElementById("navbar-ul").style.height = "450px";

        }
        dropbtn_State = true
    }
});



// Banner slider home page

const slides = Array.from(banerWraper.children)


let index = 0;
let isMouseDown = false;
let startX = 0;
let currentX = 0;
let baseTranslate = 0;
let dragging = false;

function width(){
    // slide width + gap
    const slide = slides[0];
    const style = getComputedStyle(banerWraper);
    const gap = parseFloat(style.gap) || 0;
    return slide.getBoundingClientRect().width + gap;
}

function clamp(i){
    return Math.max(0,Math.min(i,slides.length-1));
}

function goTo(i){
    index = clamp(i);
    updateBaner();
}

function updateBaner(){
    banerWraper.style.transform = `translateX(${-index * width()}px)`;
    console.log(`translateX(${-index * width()}px)`);

}

function next(){
    index = (index + 1) % slides.length;
    updateBaner();
}
function prev(){
    index = (index - 1 + slides.length) % slides.length;
    updateBaner();
}

// Drag logic (mouse + touch + pointer)
function onDown(clientX){
    dragging = true
    banerContainer.classList.add("dragging");
    startX = clientX;
    baseTranslate = -index * width();
    banerWraper.style.transition = 'none';
    clearInterval(autoSlide);

}

function onMove(clientX){
    if (!dragging){
        return;
    }
    currentX = clientX;
    const delta = currentX - startX;
    banerWraper.style.transform = `translateX(${baseTranslate + delta}px)`;
}

function onUp(){
    if (!dragging) return;
    dragging = false;
    banerContainer.classList.remove('dragging');
    banerWraper.style.transform = '';
    banerWraper.style.animation = '';
    const delta = currentX - startX;
    const threshold = width() *0.2;
    console.log(banerWraper.style.transform)
    if (delta < -threshold){
        index++;
    }else if (delta > threshold) index--;
    index = clamp(index);
    updateBaner();
    restAutoSlide();
}



banerContainer.addEventListener("pointerdown", e =>{
    if (e.pointerType === 'mouse' || e.pointerType === 'touch' || e.pointerType === 'pen'){
        e.preventDefault();
        onDown(e.clientX);
        banerContainer.setPointerCapture(e.pointerId);
    }
});

banerContainer.addEventListener("pointermove",e=> onMove(e.clientX));
banerContainer.addEventListener("pointerleave",()=> dragging && onUp);
banerContainer.addEventListener("pointerup", onUp);
banerContainer.addEventListener("pointercancel", onUp);

banerContainer.addEventListener('touchstart',e => onDown(e.changedTouches[0].clientX),{passive:false});
banerContainer.addEventListener('touchmove',e => onMove(e.changedTouches[0].clientX),{passive:false});
banerContainer.addEventListener('touchend',onUp);


window.addEventListener("resize",updateBaner);

function startAutoSlide(){
    autoSlide = setInterval(()=>{next();},4000); // 25sec
}

function restAutoSlide(){
    clearInterval(autoSlide);
    startAutoSlide();
}

updateBaner();
startAutoSlide();


