import "phaser";
import VoltorbFlipTile from "./voltorb-tile";

class GridLink extends Phaser.GameObjects.Graphics {
    constructor(scene: Phaser.Scene, tile1: VoltorbFlipTile, tile2: VoltorbFlipTile) {
        super(scene);
        const tile1Center = tile1.getCenter();
        const tile2Center = tile2.getCenter();
        tile1.setTintFill(0x00FF00, 0x00FF00, 0x00FF00, 0x00FF00);
        this.x = tile1Center.x;
        this.fillStyle(0xFF0000);
        if (tile1.x === 200) {
            this.fillStyle(0x000000);
        }
        this.fillRect(this.x, this.y, 20, 70);
        return this.generateTexture("link");
    };
};

export default GridLink;
