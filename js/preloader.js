class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', 'assets/gridtiles.png');
        // this.load.scenePlugin('rexgesturesplugin', 'lib/phaser/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
        // this.load.plugin('rexpinchplugin', 'lib/phaser/rexgesturesplugin.min.js', true);
        
    }

    create() {
        this.scene.start('wall');
        this.scene.start('parkingArea');
        this.scene.start('entranceExit');
        
        let camera = this.cameras.main;
        this.rexGesture.create(camera, this);

        // let print = this.add.text(0, 0, '')
        // let pinch = this.rexGestures.add.pinch();
        // pinch
        //     .on('drag1', function (pinch) {
        //         var drag1Vector = pinch.drag1Vector;
        //         circle.x += drag1Vector.x;
        //         circle.y += drag1Vector.y;
        //     })
        //     .on('pinch', function (pinch) {
        //         var scaleFactor = pinch.scaleFactor;
        //         circle.scaleX *= scaleFactor;
        //         circle.scaleY *= scaleFactor;
        //         print.text = circle.scaleX;
        //     }, this)
        //     .on('drag1start', function (pinch) {
        //         print.text = 'drag1start';
        //     }, this)
        //     .on('drag1end', function (pinch) {
        //         print.text = 'drag1end';
        //     }, this)
        //     .on('pinchstart', function (pinch) {
        //         print.text = 'pinchstart';
        //     }, this)
        //     .on('pinchend', function (pinch) {
        //         print.text = 'pinchend';
        //     }, this)
    }

}   