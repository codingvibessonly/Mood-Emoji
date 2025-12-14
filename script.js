const moods=[
    {name:"happy", emoji:"😄", text:"Feeling Happy!", bg:"https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80"},
    {name:"sad", emoji:"😢", text:"Feeling Sad...", bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80"},
    {name:"love", emoji:"❤️", text:"Feeling Love!", bg:"https://images.unsplash.com/photo-1516910817561-1e8c4fd2dc8f?auto=format&fit=crop&w=1950&q=80"},
    {name:"angry", emoji:"😡", text:"Feeling Angry!", bg:"https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1950&q=80"},
    {name:"sleepy", emoji:"😴", text:"Feeling Sleepy...", bg:"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1950&q=80"},
    {name:"excited", emoji:"🤩", text:"Feeling Excited!", bg:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1950&q=80"},
    {name:"chill", emoji:"😎", text:"Feeling Chill!", bg:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80"},
    {name:"surprised", emoji:"😲", text:"Feeling Surprised!", bg:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1950&q=80"}
];

const bgLayers=[document.getElementById("bg1"), document.getElementById("bg2")];
let currentLayer=0;
const sidebar=document.getElementById("sidebar");
const toggleSidebar=document.getElementById("toggleSidebar");
const moodScreen=document.getElementById("moodScreen");
const bigEmoji=document.getElementById("bigEmoji");
const moodText=document.getElementById("moodText");
const particlesContainer=document.getElementById("particles");
const closeBtn=document.getElementById("closeBtn");
const container=document.getElementById("moodContainer");

// Background loop images
const initialBGs=[
    "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1499242241750-3c6e2b8c70d6?auto=format&fit=crop&w=1950&q=80"
];
let bgIndex=0;

// preload images
initialBGs.forEach(src=>{ const img=new Image(); img.src=src; });

// Load emoji cards
function loadCards(){
    moods.forEach(mood=>{
        const card=document.createElement("div");
        card.className="card";
        card.innerHTML=`<div class="card-inner"><div class="card-front"><span class="emoji">${mood.emoji}</span><h3>${mood.text}</h3></div><div class="card-back">Click to see animation!</div></div>`;
        card.onclick=()=>selectMood(mood.name);
        container.appendChild(card);
    });
}

// Animate background dual-layer
function animateBackgroundDual(){
    bgLayers[0].style.backgroundImage=`url('${initialBGs[0]}')`;
    bgLayers[0].classList.add("visible");
    bgIndex=1;

    setInterval(()=>{
        const nextLayer=(currentLayer+1)%2;
        bgLayers[nextLayer].style.backgroundImage=`url('${initialBGs[bgIndex]}')`;
        bgLayers[nextLayer].classList.add("visible");
        setTimeout(()=>{
            bgLayers[currentLayer].classList.remove("visible");
            currentLayer=nextLayer;
        },1500); // match CSS transition
        bgIndex=(bgIndex+1)%initialBGs.length;
    },4000);
}

// Select mood
function selectMood(type){
    const mood=moods.find(m=>m.name===type);
    sidebar.classList.add("hidden");
    toggleSidebar.textContent="☰"; // open icon

    particlesContainer.innerHTML="";
    for(let i=0;i<30;i++){
        const p=document.createElement("div");
        p.className="particle";
        p.style.left=Math.random()*100+"%";
        p.style.top=Math.random()*100+"%";
        p.style.background=mood.emoji;
        p.style.fontSize=(Math.random()*20+10)+"px";
        p.style.position="absolute";
        p.style.opacity=Math.random();
        p.style.animation=`particleMove ${Math.random()*3+2}s linear infinite alternate`;
        particlesContainer.appendChild(p);
    }

    moodScreen.classList.remove("hidden");
    bigEmoji.textContent=mood.emoji;
    moodText.textContent=mood.text;

    const nextLayer=(currentLayer+1)%2;
    bgLayers[nextLayer].style.backgroundImage=`url('${mood.bg}')`;
    bgLayers[nextLayer].classList.add("visible");
    setTimeout(()=>{
        bgLayers[currentLayer].classList.remove("visible");
        currentLayer=nextLayer;
    },1500);
}

// Close mood screen
closeBtn.onclick=function(){
    moodScreen.classList.add("hidden");
}

// Toggle sidebar
toggleSidebar.onclick=function(){
    if(sidebar.classList.contains("hidden")){
        sidebar.classList.remove("hidden");
        toggleSidebar.textContent="✖";
    } else {
        sidebar.classList.add("hidden");
        toggleSidebar.textContent="☰";
    }
}

// Init
window.onload=()=>{
    loadCards();
    animateBackgroundDual();
}
