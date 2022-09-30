
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
const layer_x_width = 1920
const layer_y_height = 1080

const layer_sky = new Image();
layer_sky.src = 'Images/sky.png';
const layer_cloud = new Image();
layer_cloud.src = 'Images/clouds_1.png';
const layer_ground1 = new Image();
layer_ground1.src = 'Images/ground_1.png';
const layer_plant = new Image();
layer_plant.src = 'Images/plant.png';

let gameSpeed = 0;
let x = 0;
let x2 = CANVAS_WIDTH;

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.layer_width = 1920;
        this.layer_height = 1080;
        this.x2 = CANVAS_WIDTH;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed + this.speedModifier;
    }
    update(){
        this.speed = gameSpeed + this.speedModifier;
        if(this.x <= -CANVAS_WIDTH){
            this.x = CANVAS_WIDTH + this.x2 - this.speed;
        }
        if(this.x2 <= -CANVAS_WIDTH){
            this.x2 = CANVAS_WIDTH + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }
    draw(){
        ctx.drawImage(this.image,0,this.y,this.layer_width,this.layer_height,this.x,this.y,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.drawImage(this.image,0,this.y,this.layer_width,this.layer_height,this.x2,this.y,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

const layerSky = new Layer(layer_sky, 0);
const layerCloud = new Layer(layer_cloud, 1);
const layerGround = new Layer(layer_ground1, 2);
const layerPlant = new Layer(layer_plant, 2);

const backGroundObjects = [layerSky,layerCloud,layerGround,layerPlant];

function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    backGroundObjects.forEach(object=>{
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate)
}

animate();