import "phaser";

interface VoltorbFlipTile {
    pointsValue: number
    isBomb: boolean
    isFlagged: boolean
    isFlipped: boolean
    flag: Phaser.GameObjects.Sprite
};

class VoltorbFlipTile extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, value: number) {
        super(scene, x, y, "tile");
        this.isFlagged = false;
        this.isFlipped = false;
        this.displayHeight = 100;
        this.displayWidth = 100;
        this.pointsValue = value;
        this.flag = null;
    };

    flip() {
        this.isFlipped = !this.isFlipped;
    };

    toggleFlag() {
        this.isFlagged = !this.isFlagged;
    };
};

export default VoltorbFlipTile;
