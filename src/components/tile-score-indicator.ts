import "phaser";

class TileScoreIndicator extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, score: number) {
        super(scene, x, y, "");
    }
}
