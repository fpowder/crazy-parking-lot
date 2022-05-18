class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', 'assets/gridtiles.png');
        //this.load.scenePlugin('rexgesturesplugin', 'lib/phaser/rexgesturesplugin.min.js', 'rexGestures', 'rexGestures');
        this.load.plugin('rexpinchplugin', 'lib/phaser/rexgesturesplugin.min.js', true);
    }

    create() {
        this.scene.start('wall');
        this.scene.start('parkingArea');
        this.scene.start('entranceExit');

        var dragScale = this.scene.rexGestures.add.pinch();
        //var dragScale = this.plugins.get('rexpinchplugin').add(this);
        
        var camera = this.cameras.main;
        dragScale
            .on('drag1', function (dragScale) {
                var drag1Vector = dragScale.drag1Vector;
                camera.scrollX -= drag1Vector.x / camera.zoom;
                camera.scrollY -= drag1Vector.y / camera.zoom;
            })
            .on('pinch', function (dragScale) {
                var scaleFactor = dragScale.scaleFactor;
                camera.zoom *= scaleFactor;
            }, this)


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