// 가로 세로 cell수
let xGridCnt = 7;
let yGridCnt = 12;

// let xGridCnt = 60;
// let yGridCnt = 168;

let aspectRatio = yGridCnt/xGridCnt;
let reverseAspectRatio = xGridCnt/yGridCnt;

// let screenAspect = window.innerHeight / window.innerWidth;
// let reverseScreenAspect = window.innerWidth / window.innerHeight;

let phrHeight = window.innerHeight * 0.95;
let phrWidth = phrHeight * reverseAspectRatio;

if(phrWidth > window.innerWidth) {
    let reduceRatio = window.innerWidth / phrWidth;
    phrWidth = phrWidth * reduceRatio;
    phrHeight = phrHeight * reduceRatio; 
}

//div 요소 위치 조정용 변수
/*
    각 canvas 요소위에 html div요소를 mapping하여, mouse click event를 정의한다.
    div position 요소는 canvas요소의 좌측 margin 너비 만큼, 세로 margin만큼 더해져야 한다.
*/
let cnvAdjHeight = (window.innerHeight - phrHeight) / 2;
let cnvAdjWidth = (window.innerWidth - phrWidth) / 2;

// let divAdjHeight = (window.innerHeight - phrHeight) / 2;
// let divAdjWidth = 0;

// 한 cell 변의 길이
let spacer = phrHeight / yGridCnt;

//자연수 좌표계[(0,0) (1,1)....]를 canvas의 좌표계에 mapping한다. [(0,0) (5.55, 23.34)....]
let xCordinates = [];
let yCordinates = [];

//canvas에 그려전 각 cell의 중심 좌표
let xCenters = [];
let yCenters = [];

for(let x = 0; x <= xGridCnt; x++) {
    xCordinates.push(x * spacer);
    if(x !== xGridCnt) {
        xCenters.push(x * spacer + (spacer / 2));
    }
}

for(let y = 0; y <= yGridCnt; y++) {
    yCordinates.push(y * spacer);
    if(y !== yGridCnt) {
        yCenters.push(y * spacer + (spacer / 2));
    }
}

let config = {
    type: Phaser.AUTO,
    width: phrWidth,
    height: phrHeight,
    canvasStyle: `left: ${cnvAdjWidth}px; top: ${cnvAdjHeight}px; position: fixed;`,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

function preload () {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create () {
    this.add.image(phrWidth / 2, phrHeight / 2, 'sky');

    let particles = this.add.particles('red');

    let emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    let logo = this.physics.add.image(phrWidth / 2, phrHeight / 6, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}