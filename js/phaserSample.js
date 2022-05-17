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
    pixelArt: true,
    backgroundColor: '#b7dfed',
    canvasStyle: `left: ${cnvAdjWidth}px; top: ${cnvAdjHeight}px; position: fixed;`,
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: { y: 0 }
    //     }
    // },
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);
let parkingLotMap = {
    key: 'map',
    type: 'map',
    infinite: false,
    orientation:"orthogonal",
    renderorder:"right-down",
    width: xGridCnt,
    height: yGridCnt,
    tileHeight: 32,
    tileWidth: 32,
    layers: [
        {
            data: [
                20, 20, 20, 20, 20, 20, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 1, 1, 1, 1, 1, 20,
                20, 20, 20, 20, 20, 20, 20
            ],
            id: 3,
            name: 'level1',
            height: yGridCnt,
            width: xGridCnt,
            opacity: 1,
            type: 'tilelayer',
            visible: true,
            x: 0,
            y: 0
        }
    ]
};
let tileset;

function preload () {
    //this.load.setBaseURL('http://localhost:3000');

    // this.load.image('sky', 'assets/skies/space3.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');

    // this.load.image('tiles', 'assets/drawtiles-spaced.png');
    // this.load.tilemapCSV('map', 'grid/tilemaps/csv/grid.csv');

    this.load.image('tiles', 'assets/gridtiles.png');    
    //this.load.tilemapCSV('map', 'grid/tilemaps/csv/grid.csv');


}



function create () {

    console.log(spacer);
    let map = this.make.tilemap(parkingLotMap);
    tileset = map.addTilesetImage('tiles', 'map', 32, 32, 0, 0);
    //let layer = map.createLayer(0, tileset, 0, 0);

    let layer = map.createLayer('level1', tileset);



   
}