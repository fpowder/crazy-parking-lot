class ParkingArea extends Phaser.Scene {
    constructor() {
        // super('parkingArea');
        super({
            key: 'parkingArea'
        });
    }

    preload() {

    }

    create() {
        let parkingArea = this.make.tilemap({
            data: [
                [, , , , , , ],
                [, , , , , , ],
                [, , , , , , ],
                [, , , 57, 57, 57, ],
                [, , , 57, 57, 57, ],
                [, , , 57, 57, 57, ],
                [, , , 57, 57, 57, ],
                [, , , 57, 57, 57, ],
                [, , , 57, 57, 57, ],
                [, , , , , , ],
                [, , , , , , ],
                [, , , , , , ]
            ],
            tileWidth: 32,
            tileHeight: 32,
            width: xGridCnt,
            height: yGridCnt
        });

        let paTileset = parkingArea.addTilesetImage('tiles', null, 32, 32);
        let paLayer = parkingArea.createLayer(0, paTileset, 0, 0);

        paLayer.type = 'paLayer';
        paLayer.setScale(spacer / 32);
    }
}