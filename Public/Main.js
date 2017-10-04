//Initial setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

//Variables
const mouse = {
    x: null,
    y: null
};

const colors = [
    "#041AD4",
    "#4D60FF",
    "#0200A1"
];

//Event listeners
addEventListener("mousemove",function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize",function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

//Utility functions
function getRandomColor(){
    return colors[Math.floor(Math.random()*colors.length)];
}

function getRandomInteger(min,max){
    let range = max-min;
    return Math.floor(Math.random() * range) + min;
}

//Circle Object
function Object(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function(){
        this.draw();
    }

    this.draw = function(){
        ctx.fillStyle= this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
    }
}

//Implementation
let objects;

function init(){
    objects = [];
    for(let i=0; i<100; i++){
        let radius = getRandomInteger(5,50);
        let x = getRandomInteger(0 + radius, innerWidth - radius);
        let y = getRandomInteger(0 + radius, innerHeight - radius);
        objects[i] = new Object(x,y,radius,getRandomColor());
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    ctx.fillStyle = "black";
    ctx.fillText("Canvas Boilerplate", mouse.x,mouse.y);
    for(let i=0; i<100; i++){
        objects[i].update();
    }
}

init();
animate();