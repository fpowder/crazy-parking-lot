class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', 'assets/gridtiles.png');
    }

    create() {
        this.scene.start('wall');
        this.scene.start('parkingArea');
        this.scene.start('entranceExit');
    }

}   