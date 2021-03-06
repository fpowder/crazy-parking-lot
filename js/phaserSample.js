// 가로 세로 cell수
let xGridCnt = 7;
let yGridCnt = 12;

// let xGridCnt = 60;
// let yGridCnt = 168;

let aspectRatio = yGridCnt/xGridCnt;
let reverseAspectRatio = xGridCnt/yGridCnt;

let phrHeight = window.innerHeight * 0.919;
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

// 한 cell 변의 길이
let spacer = phrHeight / yGridCnt;

//자연수 좌표계[(0,0) (1,1)....]를 canvas의 좌표계에 mapping한다. [(0,0) (19.1919, 23.34)....]
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

class RexPinch extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    preload () {
        this.load.plugin('rexpinchplugin', 'lib/phaser/rexpinchplugin.min.js', true);
    }
    
    create (camera, scene) {
        
        // let camera = this.cameras.main;
        // let dragScale = this.plugins.get('rexpinchplugin').add(this);

        let dragScale = this.pluginManager.get('RexGesture').pluginManager;

        dragScale
            .on('drag1', function (dragScale) {
    
                console.log(dragScale);
    
                let drag1Vector = dragScale.drag1Vector;
                camera.scrollX -= drag1Vector.x / camera.zoom;
                camera.scrollY -= drag1Vector.y / camera.zoom;
            })
            .on('pinch', function (dragScale) {
    
                console.log(dragScale);

                let scaleFactor = dragScale.scaleFactor;
                camera.zoom *= scaleFactor;
            }, this);

    }

}

let config = {
    type: Phaser.AUTO,
    parent: 'parking-lot',
    width: phrWidth,
    height: phrHeight,
    pixelArt: true,
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    backgroundColor: '#b7dfed',
    canvasStyle: `left: ${cnvAdjWidth}px; top: ${cnvAdjHeight}px; position: absolute;`,
    plugins: {
        global: [
            { key: 'RexPinch', plugin: RexPinch, start: true, mapping: 'RexPinch' }
        ]
    },
    physics: {
        // default: 'arcade',
        // arcade: {
        //     gravity: { y: 0 }
        // }
        default: 'matter',
        matter: {
            gravity: { x: 0, y: 0 },
            debug: true
        }
    },
    // scene: {
    //     preload: preload,
    //     create: create
    // }
    scene: [ Preloader, Wall, ParkingArea, EntranceExit ]
};
let game = new Phaser.Game(config);