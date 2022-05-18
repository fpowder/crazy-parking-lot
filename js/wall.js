class Wall extends Phaser.Scene {
    constructor() {
        super('wall');
    }

    preload() {
        // this.load.image('tiles', 'assets/gridtiles.png');
    }

    create() {
        let wall = this.make.tilemap({
            data: [
                [19, 19, 19, 19, 19, 33, 33],
                [19, 0, 0, 0, 0, 0, 0],
                [19, 0, 0, 0, 0, 33, 33],
                [19, 0, 0, 0, 0, 0, 19],
                [19, 0, 0, 0, 0, 0, 19],
                [19, 0, 0, 0, 0, 0, 19],
                [19, 0, 0, 0, 0, 0, 19],
                [19, 0, 0, 0, 0, 0, 19],
                [19, 0, 0, 0, 0, 0, 19],
                [19, 0, 0, 0, 0, 47, 47],
                [19, 0, 0, 0, 0, 0, 0],
                [19, 19, 19, 19, 19, 47, 47]
            ],
            tileWidth: 32,
            tileHeight: 32,
            width: xGridCnt,
            height: yGridCnt
        });
    
        // wall.layer.name = 'wall';
    
        let wallTileset = wall.addTilesetImage('tiles', null, 32, 32);
        let wallLayer = wall.createLayer(0, wallTileset, 0, 0);
        
        wallLayer.type = 'wallLayer';
        wallLayer.setScale(spacer / 32);

    }

    // update() {

    // }
}