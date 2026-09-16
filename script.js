/* =========================
   MEMORY TAPE
========================= */

const tapeOne=document.getElementById("tapeOne");
const tapeTwo=document.getElementById("tapeTwo");
const photos=[];

for(let i=1;i<=22;i++){
photos.push(
`./photo${i}.jpg`
);
}

function createMemoryImage(src,index){

const img=document.createElement("img");

img.className="memory-photo";

img.src=src;

img.alt=`Memory ${index}`;


img.onerror=()=>{

img.src="data:image/svg+xml;charset=UTF-8,"+
encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">

<rect
width="100%"
height="100%"
fill="#f7edf2"/>

<text
x="50%"
y="48%"
text-anchor="middle"
font-family="sans-serif"
font-size="28"
fill="#8d7180">

PHOTO ${String(index).padStart(2,"0")}

</text>

<text
x="50%"
y="56%"
text-anchor="middle"
font-family="sans-serif"
font-size="18"
fill="#8d7180">

replace me ♡

</text>

</svg>
`);
};


img.onclick=()=>{
openModal(src,index);
};


return img;

}


/* =========================
   CREATE BOTH TAPE ROWS
========================= */

photos.forEach((src,index)=>{

tapeOne.appendChild(
createMemoryImage(src,index+1)
);

});


photos.slice().reverse().forEach((src,index)=>{

tapeTwo.appendChild(
createMemoryImage(src,30-index)
);

});


/* =========================
   OPENING CAKE
========================= */

function startBirthday(){

document
.getElementById("cakeIntro")
.classList.add("hide");

document.body.style.overflow="";


setTimeout(()=>{

const intro=document.getElementById("cakeIntro");

if(intro){
intro.remove();
}

},900);

}


window.addEventListener("load",()=>{

document.body.style.overflow="hidden";


setTimeout(()=>{

const btn=document.getElementById("introBtn");

if(btn){
btn.focus();
}

},5200);

});


/* =========================
   OPEN SURPRISE
========================= */

function openSurprise(){

document
.getElementById("content")
.classList.remove("hidden");


document
.getElementById("home")
.style.minHeight="72vh";


confetti();


setTimeout(()=>{

document
.getElementById("content")
.scrollIntoView({
behavior:"smooth"
});

},250);

}


/* =========================
   IMAGE MODAL
========================= */

function openModal(src,index){

document
.getElementById("modalImg")
.src=src;


document
.getElementById("modalCaption")
.textContent=
`Memory #${String(index).padStart(2,"0")} ♡`;


document
.getElementById("modal")
.classList.remove("hidden");


document.body.style.overflow="hidden";

}


function closeModal(e){

if(
!e ||
e.target.id==="modal" ||
e.target.classList.contains("close")
){

document
.getElementById("modal")
.classList.add("hidden");

document.body.style.overflow="";

}

}


/* =========================
   CAKE CHALLENGE
========================= */

const cakeBoard=
document.getElementById("cakeBoard");

const pieceOptions=
document.querySelectorAll(".piece-option");


let pieceCount=0;

let activePiece=null;

let offsetX=0;

let offsetY=0;


/* =========================
   PALETTE DRAG
========================= */

pieceOptions.forEach(option=>{

option.addEventListener(
"pointerdown",
startPaletteDrag
);

});


function startPaletteDrag(e){

if(
e.target.classList.contains("piece-color")
){
return;
}


const option=e.currentTarget;

const type=option.dataset.piece;

const color=
option.querySelector(".piece-color").value;


createPiece(type,color,e);

}


/* =========================
   CREATE PIECE
========================= */

function createPiece(type,color,e){

const piece=
document.createElement("div");


piece.className=
`placed-piece placed-${type}`;


piece.dataset.type=type;


piece.style.background=color;


piece.style.left="50%";

piece.style.top="50%";


piece.style.transform=
"translate(-50%,-50%)";


cakeBoard.appendChild(piece);


cakeBoard.classList.add(
"has-pieces"
);


pieceCount++;


makePieceDraggable(
piece,
e
);

}


/* =========================
   DRAG PIECE
========================= */

function makePieceDraggable(piece,e){

activePiece=piece;


const boardRect=
cakeBoard.getBoundingClientRect();


const pieceRect=
piece.getBoundingClientRect();


offsetX=
e.clientX-pieceRect.left;


offsetY=
e.clientY-pieceRect.top;


piece.style.transform="none";


piece.setPointerCapture(
e.pointerId
);


piece.classList.add(
"selected"
);


movePiece(e);


piece.addEventListener(
"pointermove",
movePiece
);


piece.addEventListener(
"pointerup",
stopPiece,
{once:true}
);


piece.addEventListener(
"pointercancel",
stopPiece,
{once:true}
);

}


/* =========================
   MOVE PIECE
========================= */

function movePiece(e){

if(!activePiece){
return;
}


const boardRect=
cakeBoard.getBoundingClientRect();


let x=
e.clientX-boardRect.left-offsetX;


let y=
e.clientY-boardRect.top-offsetY;


const maxX=
cakeBoard.clientWidth-
activePiece.offsetWidth;


const maxY=
cakeBoard.clientHeight-
activePiece.offsetHeight;


x=Math.max(
0,
Math.min(x,maxX)
);


y=Math.max(
0,
Math.min(y,maxY)
);


activePiece.style.left=
x+"px";


activePiece.style.top=
y+"px";

}


/* =========================
   STOP DRAG
========================= */

function stopPiece(){

if(!activePiece){
return;
}


activePiece.classList.remove(
"selected"
);


activePiece.removeEventListener(
"pointermove",
movePiece
);


activePiece=null;

}


/* =========================
   CLEAR CAKE
========================= */

function clearCake(){

cakeBoard
.querySelectorAll(".placed-piece")
.forEach(piece=>{
piece.remove();
});


cakeBoard.classList.remove(
"has-pieces"
);


document
.getElementById("cakeMessage")
.classList.add("hidden");


pieceCount=0;

}


/* =========================
   FINISH CAKE
========================= */

function finishCake(){

if(pieceCount===0){

alert(
"Grab at least one cake piece first! 🎂"
);

return;

}


document
.getElementById("cakeMessage")
.classList.remove("hidden");


confetti();


setTimeout(()=>{

document
.getElementById("cakeMessage")
.scrollIntoView({
behavior:"smooth",
block:"center"
});

},150);

}


/* =========================
   CONFETTI
========================= */

function confetti(){

const box=
document.getElementById("confetti");


for(let i=0;i<90;i++){

const x=
document.createElement("span");


x.className="piece";


x.style.left=
Math.random()*100+"%";


x.style.top="-20px";


x.style.background=[

"#ff5d98",
"#ffd85c",
"#9b8cff",
"#68d7c5",
"#29202d"

][
Math.floor(Math.random()*5)
];


x.style.transform=
`rotate(${Math.random()*360}deg)`;


x.style.animationDelay=
Math.random()*0.8+"s";


box.appendChild(x);


setTimeout(()=>{

x.remove();

},3500);

}

}


/* =========================
   ESC CLOSE MODAL
========================= */

document.addEventListener(
"keydown",
e=>{

if(e.key==="Escape"){

closeModal({
target:document.getElementById("modal")
});

}

}
);